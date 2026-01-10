import express from "express";
import {
  addShift,
  getShiftsByDepartment,
  deleteShift
} from "../Controller/ShiftController.js";
import { assignShift, getAssignedShiftsByDepartment } from "../Controller/shiftAssignment.js";

const router = express.Router();

router.post("/add", addShift);
router.get("/by-department/:departmentId", getShiftsByDepartment);
router.delete("/:id", deleteShift);

router.post("/assign", assignShift);
router.get("/assign/:departmentId", getAssignedShiftsByDepartment);

export default router;
