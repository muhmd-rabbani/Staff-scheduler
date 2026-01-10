import ShiftAssignment from "../Models/ShiftAssignment.js";
import Shift from "../Models/Shift.js";

/* =========================
   ASSIGN SHIFT (DATE RANGE)
========================= */
export const assignShift = async (req, res) => {
  try {
    const { shiftId, staffIds, startDate, endDate, managerId } = req.body;

    // 🔹 Basic validation
    if (!shiftId || !staffIds?.length || !startDate || !endDate) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // 🔹 Get shift (for department)
    const shift = await Shift.findById(shiftId);

    if (!shift) {
      return res.status(404).json({
        message: "Shift not found"
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      return res.status(400).json({
        message: "End date cannot be before start date"
      });
    }

    const assignments = [];

    /* 🔹 Loop through date range */
    for (
      let date = new Date(start);
      date <= end;
      date.setDate(date.getDate() + 1)
    ) {
      staffIds.forEach(staffId => {
        assignments.push({
          shift: shiftId,
          staff: staffId,
          date: new Date(date),
          department: shift.department,
          assignedBy: managerId
        });
      });
    }

    await ShiftAssignment.insertMany(assignments);

    res.status(201).json({
      message: "Shift assigned successfully",
      totalAssignments: assignments.length
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Shift assignment failed"
    });
  }
};
export const getAssignedShiftsByDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;

    const assignments = await ShiftAssignment.find({ department: departmentId })
      .populate("staff", "name email")
      .populate("shift", "shiftName startTime endTime")
      .sort({ date: 1 });

    res.status(200).json({ assignments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch assigned shifts" });
  }
};
