
import { styled, Box, Typography,Button } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import { Link} from 'react-router-dom';
import axios from 'axios';


const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000, 
    headers: {
        "content-type": "application/json"
    }
});


const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    align-items: left;
    flex-direction: column;
    height: 350px;
    & > img, & > p {
        padding: 0 5px 5px 5px;
    }
`;

const Image = styled('img')({
    width: '100%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
    height: 150
});

const Text = styled(Typography)`
    color: #878787
    font-size: 12px;
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600
`;

const Details = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
`;
const Btn = styled(Button)({
    margin: 10})


const Post = ({ post}) => {
    const navigate=useNavigate()
    console.log("props key=",post._id)
    const url = post.picture ? post.picture: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';
    
   /* const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    } */
    const deletePost=async(id)=>{
        console.log("I am in deleted post function")
        const response=await axiosInstance.delete(`/delete/${id}`)
        if(response.status===200){
          
         console.log("Deleted post")
         navigate("/")
        }
        navigate("/")
      
      }
      const navigateUpdate=(id)=>{
        navigate(`/update/${id}`)

      }
    return (
        <Container>
            <Image src={url} alt="post" />
            <Text>{post.categories}</Text>
            {/*<Heading>{addEllipsis(post.title, 20)}</Heading>*/}
            <Heading>{post.title}</Heading>
            <Text>Author: {post.username}</Text>
            <Details>{post.description}</Details>
            <Link style={{textDecoration: 'none', color: 'inherit'}} to={`update/${post._id}`} state={`${post._id}`} >
            <Btn variant="contained" color="success" onClick={()=>{navigateUpdate(post._id)
                console.log('upodate button clicked')
                }} >Update</Btn>           
                            
                           </Link>
                        

            <Box><Btn variant="contained" onClick={()=>deletePost(post._id)}>Delete</Btn></Box>
        </Container>
    )
}

export default Post;