import express from "express";
import {
  addstaff,
  getallstaffs,
  getStaffByManager,
  getStaffById,
  updateStaff,
  deleteStaff
} from "../Controller/StaffController.js";

const router = express.Router();

router.post("/addStaffs", addstaff);
router.get("/staff", getallstaffs);
router.get("/by-manager/:managerId", getStaffByManager);
router.get("/:id", getStaffById);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);

export default router;
