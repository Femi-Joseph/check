import React, { useEffect, useState } from 'react';
import { Box, Button, styled } from '@mui/material';
import Banner from '../Banner/Banner';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

import Post from '../post/Post';

import axios from 'axios';

const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'content-type': 'application/json',
  },
});

const Btn = styled(Button)`
  margin: 30px;
  width: 200px;
  height: 30px;
  color: white;
  position: absolute;
  left: 0;
  top: 320px;
`;

const Home = () => {
  const navigate = useNavigate();
  const [posts, getPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let response = await axiosInstance.get('/posts');
      console.log(response);
      getPosts(response.data);
    };
    fetchData();
  }, []);

  return (
    <Box>
      <Banner />
      <Btn variant="contained" onClick={() => navigate('/addpost')}>
        Add Blog
      </Btn>
      <Grid container item xs={12} ml={20} mt={10} sm={10} lg={10}>
        {posts.length ? (
          posts.map((post, id) => {
            console.log('id=', post._id);
            return (
              <Grid item lg={3} sm={4} xs={12}>
                <Post post={post} key={post._id} />
              </Grid>
            );
          })
        ) : (
          <Box style={{ color: '878787', margin: '30px 80px', fontSize: 18 }}>
            No data is available
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default Home;
