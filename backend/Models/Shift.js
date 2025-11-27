import mongoose, { Schema } from "mongoose";

const loginScheema=new Schema({
    Id:{
        type:String,
        required:true
    },
    Staffid:{
        type:Schema.Types.ObjectId,
        ref:"staff"
    },
    date:{
        type:String,
        required:true
    },
    Starttime:{
        type:String,
        required:true
    },
        Endtime:{
        type:String,
        required:true
    },
        Status:{
        type:String,
        required:true
    },
      Availability:{
        type:String,
        required:true
    },
})
const loginData=mongoose.model("Login",loginScheema)
export default loginData
