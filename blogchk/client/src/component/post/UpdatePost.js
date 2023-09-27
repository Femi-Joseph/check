import React, { useState,useEffect } from 'react'
import { Box, styled, Typography, TextField,Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Banner from '../Banner/Banner';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
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


const UpdatePost = () => {
  
  const location = useLocation();  
  const navigate=useNavigate()
  console.log("id = update",`${location.state}`)
  const [post, getPost] = useState([]);
    useEffect(() => {
      const fetchData = async () => { 
          let response = await axiosInstance.get(`/post/${location.state}`);
          console.log(response)
          getPost(response.data);
      }
      fetchData();
  },[]);
  console.log("post to be updated",post)
  const onInputChange = (e) => {
    getPost({ ...post, [e.target.name]: e.target.value });
    
}
const updatePost=async(id)=>{
  const response=await axiosInstance.put(`/update/${location.state}`,post)
  if(response.status===200){
    
   console.log("database updated")
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
  getPost({ ...post,picture: base64 })
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
            value={post.title}
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
            value={post.description}
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
            name="picture"
            accept='.jpeg, .png, .jpg'
            onChange={(e) => handleFileUpload(e)}
            
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} >
          <InputLabel htmlFor="outlined-adornment-amount">Category</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            
            /*startAdornment={<InputAdornment position="start">$</InputAdornment>}*/
            label="Category"
            name="categories"
            value={post.categories}
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
            value={post.username}
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
            value={post.createdDate}
            onChange={(e) => onInputChange(e)}
          />
        </FormControl>
        
        
        <Button variant="contained" onClick={()=>updatePost(`${location.state}`)} >Update Post</Button>
        
    
    </Wrapper>
   
    
    
   
   
    </Component>
    
  )
}

export default UpdatePost
