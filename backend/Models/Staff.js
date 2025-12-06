import mongoose, { Schema } from "mongoose";

const StaffScheema=new Schema({
    Name:{
        type:String,
        required:true
    },
    Age:{
        type:String,
        required:true,
    },
    Phoneno:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
    },
    Address:{
        type:String,
        required:true,
    },
    State:{
        type:String,
        required:true,
    },
    Position:{
        type:String,
        required:true,
    },
    Pincode:{
        type:String,
        required:true,
    },
    Gender:{
        type:String,
        required:true,
    },
    Qualification:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    
})
const StaffData=mongoose.model("staff",StaffScheema)
export default StaffData