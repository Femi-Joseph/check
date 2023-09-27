
const mongoose=require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: false,
        
    },
    password: {
        type: String,
        required: true
    }
});


const user = mongoose.model('user', userSchema);

module.exports=user