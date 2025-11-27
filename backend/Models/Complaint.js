import mongoose, { Schema } from "mongoose";

const ComplaintScheema=new Schema({
    Against_id:{
        type:Schema.Types.ObjectId,
        ref:"staff"
    },
    Subject:{
        type:String,
        required:true,
    },
    Response:{
        type:String,
        required:true,
    },
})
const loginData=mongoose.model("Login",loginScheema)
export default loginData