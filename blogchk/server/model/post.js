//import mongoose from 'mongoose';
const mongoose=require('mongoose')

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        
    },
    username: {
        type: String,
        
    },
    categories: {
        type: String,
          
    },
    createdDate: {
        type: Date,
        
    }
});


const post = mongoose.model('post', PostSchema);

module.exports=post;