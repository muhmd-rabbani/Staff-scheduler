import mongoose, { Schema } from "mongoose";

const ManagerScheema=new Schema({
    Name:{
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