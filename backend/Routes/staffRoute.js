import express from "express";
import {
  addstaff,
  getallstaffs,
  getStaffByManager,
  getStaffById,
  updateStaff,
  deleteStaff,
  profile,
  leaveRequest,
  fetchleave,
  getLeavesByDepartment
} from "../Controller/StaffController.js";

const router = express.Router();

router.post("/addStaffs", addstaff);
router.get("/staff", getallstaffs);
router.get("/by-manager/:managerId", getStaffByManager);
router.get("/:id", getStaffById);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);
router.get("/home/:logid",profile);
router.post("/sendleave/:staffid", leaveRequest);
router.get("/viewLeavereq/:staffid",fetchleave);
router.get('/leaveByDep/:departmentId',getLeavesByDepartment)
export default router;
