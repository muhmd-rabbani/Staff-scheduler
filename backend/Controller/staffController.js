import loginData from "../Models/Login.js";
import bcrypt from "bcrypt"
import StaffData from "../Models/Staff.js";
export const addstaff=async(req,res)=>{
    try{
        const {name,age,gender,phone,email,qualification,department,position,address,state,pincode,password}=req.body
        console.log(req.body);

        const existing=await loginData.findOne({email})
        if(existing){
            return res.status(400).json({message:"Already Exist"})
    }
    const hashpassword=await bcrypt.hash(password,10)
    const newlogin = loginData({
            UserName:email,
            password:hashpassword,
            role:'staff'
        });
        await newlogin.save()
        
        const newstaff = StaffData({
            commonKey:newlogin._id,
            name:name,
            age:age,
            gender:gender,
            phoneno: phone,
            email:email,
            position:position,
            address:address,
            state:state,
            pincode:pincode,
            qualification:qualification,
            department:department,          
        })
        await newstaff.save()
    
        res.status(201).json({message:"staff registration successfull"},newstaff)
}
    catch(error){
        console.log(error);
        
        res.status(500).json({message:"server error"})
        }
    }

    /* =========================
   GET ALL STAFFS
========================= */

    export const getallstaffs = async (req, res) => {
  try {
    const staffs = await StaffData.find();
    res.status(200).json({ staffs });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch staffs" });
  }
};