import mongoose, { Schema } from "mongoose";

const loginScheema=new Schema({
    UserName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,

    },
    role:{type:String,}
    
})
const loginData=mongoose.model("Login",loginScheema)
export default loginData