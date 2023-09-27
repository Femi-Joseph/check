import React, { useState,useEffect } from 'react'
import { Box, styled, Typography, TextField,Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Banner from '../Banner/Banner';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
//import { uploadImage } from '../../../../server/controller/image-controller';
const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000, 
    headers: {
        "content-type": "application/json"
    }
});


const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;
const postInitial={
  title:'',
  description:'',
  picture:'',
  username:'',
  categories:'',
  createdDate:'',



}
const Component = styled(Box)`
    width: 700px;
    margin: auto;
    margin-top:100px;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;


const AddPost = () => {
  const navigate=useNavigate()
  const [post,setPost]=useState(postInitial)
  const [file, setFile] = useState('');
  const onInputChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
    
}
/*useEffect(() => {
  const getImage = async () => { 
      if(file) {
          const data = new FormData();
          data.append("name", file.name);
          data.append("file", file);
          console.log("inside get Image")
          
          const response = await axiosInstance.post('/file/upload',file)
          //uploadFile(data);
          //setPost({ ...post, [e.target.name]: e.target.value });
          //post.picture = response.data;
      }
  }
  getImage();
 /* post.categories = location.search?.split('=')[1] || 'All';
  post.username = account.username;
}, [file])*/

  const createPost=async()=>{
    const response=await axiosInstance.post("/create",post)
    if(response.status===200){
      
      navigate("/")
    }

  }
  function convertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64)
    setPost({ ...post,picture: base64 })
  }
  return (
    
    

    <Component>
    
    <Wrapper>
    <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Title</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            /*startAdornment={<InputAdornment position="start">$</InputAdornment>}*/
            label="Title"
            name='title'
            onChange={(e) => onInputChange(e)}
            
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Description</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            /*startAdornment={<InputAdornment position="start">$</InputAdornment>}*/
            label="Description"
            name='description'
            onChange={(e) => onInputChange(e)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Photo</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            type="file"
            /*startAdornment={<InputAdornment position="start">$</InputAdornment>}*/
            label="Image"
            accept='.jpeg, .png, .jpg'
            name="picture"
            
            onChange={(e) => handleFileUpload(e)}
           // onChange={(e) => onInputChange(e)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} >
          <InputLabel htmlFor="outlined-adornment-amount">Category</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            
            /*startAdornment={<InputAdornment position="start">$</InputAdornment>}*/
            label="Category"
            name="categories"
            onChange={(e) => onInputChange(e)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} >
          <InputLabel htmlFor="outlined-adornment-amount">UserName</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            
            /*startAdornment={<InputAdornment position="start">$</InputAdornment>}*/
            label="UserName"
            name="username"
            onChange={(e) => onInputChange(e)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} >
          <InputLabel htmlFor="outlined-adornment-amount">Created Date</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            
            /*startAdornment={<InputAdornment position="start">$</InputAdornment>}*/
            label="Created Date"
            name="createdDate"
            type="date"
            onChange={(e) => onInputChange(e)}
          />
        </FormControl>
        
        
        <Button variant="contained" onClick={()=>createPost()}>Add Post</Button>
        
    
    </Wrapper>
    </Component>
    
  )
}

export default AddPost
