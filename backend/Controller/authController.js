import loginData from "../Models/Login.js";
import bcrypt from "bcrypt";
export const login=async (req,res)=>{
    // const{userName,password}=req.body
    console.log('hit');
    console.log(req.body);
    
    const{username,password}=req.body
    try {
        const user=await loginData.findOne({UserName:username})
        if(!user){
            return res.status(400).json({message:"User not exist"})
        }
        const ismatch=await bcrypt.compare(password,user.password)
        if(!ismatch){
            return res.status(400).json({message:"password not match"})
        }
        return res.status(200).json({message:"Login successfully",user})
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message:"server error"})
    }
}