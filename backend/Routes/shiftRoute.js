import express from "express";
import {
  addShift,
  getShiftsByDepartment,
  deleteShift
} from "../Controller/ShiftController.js";

const router = express.Router();

router.post("/add", addShift);
router.get("/by-department/:departmentId", getShiftsByDepartment);
router.delete("/:id", deleteShift);


export default router;
