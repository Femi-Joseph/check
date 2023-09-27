const User=require('../model/user.js')
const signupUser=async(request,response)=>{
    try{
        console.log("4inside signup user")
        const user=request.body
        const newUser=new User(user)
        await newUser.save()
        return response.status(200).json({msg:'signup success'})

    }
    catch(error){
        return response.status(500).json({msg:'error while signup'})

    }

}
 const loginUser = async (request, response) => {
    console.log("inside login user")
    let user = await User.findOne({ username: request.body.username });
    if (!user) {
        return response.status(400).json({ msg: 'Username does not match' });
    }

    try {
        
        if(request.body.password===user.password)
        {
            response.status(200).json({'msg':'password match','username': request.body.username })
            console.log("success")
        }
    } catch (error) {
        response.status(500).json({ msg: 'error while login the user' })
    }
}


module.exports={signupUser,loginUser}