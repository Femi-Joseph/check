import {Route,Routes,Navigate,Outlet} from 'react-router-dom'
//import {useNavigate}from 'react-router-dom'
import { useState } from 'react';
import './App.css';
import Home from './component/Home/Home';
import Login from './component/account/Login';
import Header from './component/Header/Header';
import About from './component/about/About';
import Contact from './component/contact/Contact';
import AddPost from './component/post/AddPost';
import UpdatePost from './component/post/UpdatePost';


/*const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const navigate=useNavigate()

  //const token = sessionStorage.getItem('accessToken');
  if(isAuthenticated){
    navigate(
      <Header/>)
      
     }else {navigate('/account')}
};*/
const PrivateRoute = ({ isAuthenticated, ...props }) => {
  //const token = sessionStorage.getItem('accessToken');
  return isAuthenticated? //&& token ? 
    <>
      <Header />
      <Outlet />
    </> : <Navigate replace to='/account' />
};



function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  
  
  return (
    <div className="App">
     
     <Routes>
     <Route path='/account' element={<Login isUserAuthenticated={isUserAuthenticated} />} />
     <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/' element={<Home />} />
            </Route>
            <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/about' element={<About />} />
            </Route>
            <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/contact' element={<Contact />} />
            </Route>
            <Route path='/addpost' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/addpost' element={<AddPost />} />
            </Route>
            <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/update/:id' element={<UpdatePost />} />
            </Route>
            <Route path='/delete/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/delete/:id' element={<UpdatePost />} />
            </Route>
            <Route path='/update' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/update' element={<UpdatePost />} />
            </Route>
            
            
     </Routes>
     

    </div>
  );
}

export default App;
