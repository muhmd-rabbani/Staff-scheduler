import loginData from "../Models/Login.js";
import ManagerData from "../Models/Manager.js";
import bcrypt from "bcrypt";
import StaffData from "../Models/Staff.js";

/* =========================
   ADD MANAGER
========================= */
export const addManager = async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      phone,
      email,
      qualification,
      address,
      state,
      pincode,
      password,
      department
    } = req.body;

    const existing = await loginData.findOne({ UserName: email });
    if (existing) {
      return res.status(400).json({ message: "Already Exist" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newlogin = new loginData({
      UserName: email,
      password: hashpassword,
      role: "manager"
    });
    await newlogin.save();

    const newmanager = new ManagerData({
      commonKey: newlogin._id,
      name,
      age,
      gender,
      phone,
      email,
      qualification,
      address,
      state,
      pincode,
      department
    });

    await newmanager.save();

    res.status(201).json({ message: "Manager registration successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   GET ALL MANAGERS
========================= */
export const getallmanagers = async (req, res) => {
  try {
    const managers = await ManagerData.find().populate('department');
    res.status(200).json({ managers });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch managers" });
  }
};

/* =========================
   GET MANAGER BY ID
========================= */
export const getManagerById = async (req, res) => {
  try {
    const manager = await ManagerData.findById(req.params.id);

    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }

    res.status(200).json({ manager });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   UPDATE MANAGER
========================= */
export const updateManager = async (req, res) => {
  try {
    const updatedManager = await ManagerData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedManager) {
      return res.status(404).json({ message: "Manager not found" });
    }

    res.status(200).json({
      message: "Manager updated successfully",
      manager: updatedManager
    });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

/* =========================
   DELETE MANAGER
========================= */
export const deleteManager = async (req, res) => {
  try {
    const manager = await ManagerData.findById(req.params.id);

    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }

    // delete login credentials also
    await loginData.findByIdAndDelete(manager.commonKey);
    await ManagerData.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Manager deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

export const getManagerByLoginId = async (req, res) => {
  try {
   
    
    const { loginId } = req.params;
    console.log(loginId);
    

    const manager = await ManagerData.findOne({ commonKey: loginId });

    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }

    res.status(200).json(manager);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const editstaff =async (req,res) =>{
  const {staffid}=req.params
  const{name,
    age,
    gender,
    phone,
    qualification,
    department,
    position,
    address,
    state,
    pincode }=req.body 
    try {
      const staffedited=await StaffData.findByIdAndUpdate(staffid,{name,age,phoneno:phone,address,state,position,pincode,gender,
        qualification,department
      })

      return res.status(200).json({message:"staff updated successfully",staffedited})
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({message:"server error",error})
      
      
    }
}

export const deletestaff = async(req,res)=>{
  const {staffid}=req.params
  try {
    const staff = await  StaffData.findById(staffid)
    console.log(staff);
    const logindelete = await loginData.findByIdAndDelete(staff.commonKey)
    const deleted=await StaffData.findByIdAndDelete(staffid)
          return res.status(200).json({message:"staff deleted successfully",deleted})

  } catch (error) {
    console.log(error);
      return res.status(500).json({message:"server error",error})
  }
}