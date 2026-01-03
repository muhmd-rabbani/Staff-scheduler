import ShiftData from "../Models/Shift.js";

/* =========================
   ADD SHIFT (DEPARTMENT BASED)
========================= */
export const addShift = async (req, res) => {
  try {
    const { shiftName, date, startTime, endTime, departmentId } = req.body;

    if (!departmentId) {
      return res.status(400).json({ message: "Department is required" });
    }

    const newShift = await ShiftData.create({
      shiftName,
      date,
      startTime,
      endTime,
      department: departmentId
    });

    res.status(201).json({
      message: "Shift added successfully",
      shift: newShift
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   GET SHIFTS BY DEPARTMENT
========================= */
export const getShiftsByDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;

    const shifts = await ShiftData.find({
      department: departmentId
    });

    res.status(200).json({ shifts });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   DELETE SHIFT
========================= */
export const deleteShift = async (req, res) => {
  try {
    await ShiftData.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Shift deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};
