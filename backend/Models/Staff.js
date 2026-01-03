import mongoose, { Schema } from "mongoose";

const StaffScheema=new Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true,
    },
    phoneno:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    position:{
        type:String,
        required:true,
    },
    pincode:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    qualification:{
        type:String,
        required:true,
    },
    department:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Department"
    },
    commonKey:{
        type:Schema.Types.ObjectId,
        ref:"Login"
    }
    
})
const StaffData=mongoose.model("staff",StaffScheema)
export default StaffData