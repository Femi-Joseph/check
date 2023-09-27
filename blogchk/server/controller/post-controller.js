
//import Post from '../model/post.js';
const Post=require('../model/post.js')


const createPost = async (request, response) => {
    try {
        const post1=request.body
        console.log(post1)
        const post = await new Post(post1)         

        
        post.save();

        response.status(200).json('Post saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}
const getAllPosts = async (request, response) => {
    try{
    let posts=await Post.find({})
    response.status(200).json(posts);
}
catch (error) {
    response.status(500).json(error)
}
    /*let username = request.query.username;
    let category = request.query.category;
    let posts;
    try {
        if(username) 
            posts = await Post.find({ username: username });
        else if (category) 
            posts = await Post.find({ categories: category });
        else 
            posts = await Post.find({});
            
        response.status(200).json(posts);
    } catch (error) {
        response.status(500).json(error)
    }*/
}
/*export const updatePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            response.status(404).json({ msg: 'Post not found' })
        }
        
        await Post.findByIdAndUpdate( request.params.id, { $set: request.body })

        response.status(200).json('post updated successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

export const deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        
        await post.delete()

        response.status(200).json('post deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}

export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error)
    }
}

export const getAllPosts = async (request, response) => {
    let username = request.query.username;
    let category = request.query.category;
    let posts;
    try {
        if(username) 
            posts = await Post.find({ username: username });
        else if (category) 
            posts = await Post.find({ categories: category });
        else 
            posts = await Post.find({});
            
        response.status(200).json(posts);
    } catch (error) {
        response.status(500).json(error)
    }
}*/
 const deletePost = async (request, response) => {
    try {
        console.log("In delete post controller",request.params.id)
       // const post = await Post.findById(request.params.id);
       const post = await Post.findById(request.params.id);
        

        const res=await Post.deleteOne(post)
        //console.log("res=",res)

        response.status(200).json('post deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}
 const getPost = async (request, response) => {
    console.log("request=getpost",request.params)
    console.log("server fetching id=",request.params.id)
    try {
        console.log("server fetching id=",request.params.id)
        const post = await Post.findById(request.params.id);

        response.status(200).json(post);
    } catch (error) {
        console.log("2server fetching id=",request.params.id)
        response.status(500).json(error)
    }
}
 const updatePost = async (request, response) => {
    console.log("here in nupdated server",Post)
    try {
        console.log("1inside update server",request.params.id)
        console.log("request=",request.params)
        const post = await Post.findById(request.params.id);
        console.log("inside update server",post)

        if (!post) {
            response.status(404).json({ msg: 'Post not found' })
        }
        
        await Post.findByIdAndUpdate( request.params.id, { $set: request.body })

        response.status(200).json('post updated successfully');
    } catch (error) {
        
        response.status(500).json(error);
    }
}

module.exports={createPost,getAllPosts,getPost,updatePost,deletePost}