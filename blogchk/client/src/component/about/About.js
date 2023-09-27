import React, { Component } from 'react'
import { Box, styled, Typography, Link } from '@mui/material';
import Banner from '../Banner/Banner';

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

const About = () => {
  return (
    <Box>
    <Banner/>
    <Wrapper>
    <Text variant="h1">About this project

    </Text>
      
    </Wrapper>
    </Box>
  )
}

export default About
