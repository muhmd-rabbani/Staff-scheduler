import loginData from "../Models/Login.js";
import ManagerData from "../Models/Manager.js";
import bcrypt from "bcrypt"

export const addManager=async(req,res)=>{
    try{
    const {name,age,gender,phone,email,qualification,address,state,pincode,password,department}=req.body
    console.log(req.body);

    const existing=await loginData.findOne({email})
    if(existing){
        return res.status(400).json({message:"Already Exist"})
    }
    const hashpassword=await bcrypt.hash(password,10)
    const newlogin = loginData({
            UserName:email,
            password:hashpassword,
            role:'manager'
        });
        await newlogin.save()
        
        const newmanager = ManagerData({
            commonKey:newlogin._id,
            name:name,
            age:age,
            gender:gender,
            phone: phone,
            email:email,
            address:address,
            state:state,
            pincode:pincode,
            qualification:qualification,
            department:department,          
        })
        await newmanager.save()
    
        res.status(201).json({message:"manager registration successfull"})
}
    catch(error){
        console.log(error);
        
        res.status(500).json({message:"server error"})
    }
}