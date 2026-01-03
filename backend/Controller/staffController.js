import bcrypt from "bcrypt";
import loginData from "../Models/Login.js";
import StaffData from "../Models/Staff.js";
import ManagerData from "../Models/Manager.js";

/* =========================
   ADD STAFF (BY MANAGER)
========================= */
export const addstaff = async (req, res) => {
  try {
    const {
      managerId,
      name,
      age,
      gender,
      phone,
      email,
      qualification,
      position,
      address,
      state,
      pincode,
      password
    } = req.body;

    // 1️⃣ validate manager
    const manager = await ManagerData.findById(managerId);
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }

    // 2️⃣ check existing login
    const existing = await loginData.findOne({ UserName: email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3️⃣ create login for staff
    const hashpassword = await bcrypt.hash(password, 10);
    const newLogin = await loginData.create({
      UserName: email,
      password: hashpassword,
      role: "staff"
    });

    // 4️⃣ create staff (department from manager)
    const newStaff = await StaffData.create({
      commonKey: newLogin._id,
      manager: manager._id,
      department: manager.department,
      name,
      age,
      gender,
      phoneno: phone,
      email,
      qualification,
      position,
      address,
      state,
      pincode
    });

    res.status(201).json({
      message: "Staff added successfully",
      staff: newStaff
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   GET ALL STAFFS (ADMIN)
========================= */
export const getallstaffs = async (req, res) => {
  try {
    const staffs = await StaffData.find()
      .populate("department")
     
console.log(staffs);

    res.status(200).json({ staffs });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch staffs" });
  }
};

/* =========================
   GET STAFF BY MANAGER
========================= */
export const getStaffByManager = async (req, res) => {
  try {
    const { managerId } = req.params;

    // 1️⃣ get manager
    const manager = await ManagerData.findById(managerId);
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }

    // 2️⃣ get staffs by department
    const staffs = await StaffData.find({
      department: manager.department
    })

    res.status(200).json({ staffs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   GET STAFF BY ID
========================= */
export const getStaffById = async (req, res) => {
  try {
    const staff = await StaffData.findById(req.params.id)
      .populate("department")
      .populate("manager", "name");

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json({ staff });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   UPDATE STAFF
========================= */
export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;

    // ❌ department & manager must NOT be updated from frontend
    delete req.body.department;
    delete req.body.manager;

    const updatedStaff = await StaffData.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json({
      message: "Staff updated successfully",
      staff: updatedStaff
    });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

/* =========================
   DELETE STAFF
========================= */
export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const staff = await StaffData.findById(id);
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    // delete login also
    await loginData.findByIdAndDelete(staff.commonKey);
    await StaffData.findByIdAndDelete(id);

    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};
