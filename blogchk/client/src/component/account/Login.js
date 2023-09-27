import React,{useState} from 'react'
import {useNavigate}from 'react-router-dom'
import Box from '@mui/material/Box';
import { TextField,styled,Button,Typography } from '@mui/material';
import axios from 'axios';
const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000, 
    headers: {
        "content-type": "application/json"
    }
});

const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;
const Image = styled('img')({
  width: 100,
  display: 'flex',
  margin: 'auto',
  padding: '50px 0 0'
});
const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;
const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;
const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;
const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;
const signupInitialValues = {
  name: '',
  username: '',
  password: '',
};
const loginInitialValues = {
  username: '',
  password: ''
};



const Login = (props) => {
  const isUserAuthenticated=props.isUserAuthenticated
  
  const [account, toggleAccount] = useState('login');
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);
  const navigate=useNavigate()
  const toggleSignup = () => {
    account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
  }
  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
    console.log(signup)
}
const onValueChange = (e) => {
  setLogin({ ...login, [e.target.name]: e.target.value });
  console.log(login)
}
const signupUser = async() => {
  console.log("inside signup")
  console.log({...signup})
  const response=await axiosInstance.post("/signup",signup)
  console.log("response=",response)
  if(response.status===200){
    toggleAccount('login')

  }

  

  
}
const loginUser = async() => {
  console.log({...login})
  
let response=await axiosInstance.post("/login",login);
if(response.status===200){
  isUserAuthenticated(true)
  console.log(response.data.username)
  navigate('/')
}
  
  
  
  
}
  return (
  
    <Component>
    <Image
     src={imageURL} alt="pic"></Image>
     {account === 'login' ?
     <Wrapper>
     <TextField variant="standard"  onChange={(e) =>{ console.log("try")
      onValueChange(e)}} name='username' label='Enter Username' />
      <TextField variant="standard"  onChange={(e) => onValueChange(e)} name='password' label='Enter Password' />

        <LoginButton variant="contained" onClick={() => loginUser()}  >Login</LoginButton>
        <Text style={{ textAlign: 'center' }}>OR</Text>
        <SignupButton onClick={() => toggleSignup()} style={{ marginBottom: 50 }}>Create an account</SignupButton>
        
      </Wrapper>:
      <Wrapper>
      <TextField variant="standard" onChange={(e) => onInputChange(e)} name='name' label='Enter Name' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='username' label='Enter Username' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />
        <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
        <Text style={{ textAlign: 'center' }}>OR</Text>
        <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
      
      </Wrapper>}
    </Component>
  )
}

export default Login
