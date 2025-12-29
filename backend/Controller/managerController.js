import loginData from "../Models/Login.js";
import ManagerData from "../Models/Manager.js";
import bcrypt from "bcrypt";

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
    const managers = await ManagerData.find();
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
