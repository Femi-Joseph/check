const express=require('express')
const router=express.Router()
const {signupUser,loginUser}=require('../controller/usercontroller.js')
const {createPost,getAllPosts,getPost,updatePost,deletePost}=require('../controller/post-controller.js')
//const { uploadImage, getImage } =require('../controller/image-controller.js');

console.log("inside route")
router.post('/signup',signupUser);

router.post('/login',loginUser);
router.post('/create',createPost);
router.get('/posts',getAllPosts);
router.get('/post/:id', getPost);
router.put('/update/:id',updatePost);
router.delete('/delete/:id',deletePost);
/*router.post('/file/upload',uploadImage);
router.get('/file/:filename', getImage);*/


module.exports=router