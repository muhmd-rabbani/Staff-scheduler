import mongoose, { Schema } from "mongoose";

const DepartmentScheema=new Schema({
    DepartmentName:{
        type:String,
        required:true
    },   
})
const DepartmentData=mongoose.model("Department",DepartmentScheema)
export default DepartmentData