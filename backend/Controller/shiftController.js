import Shift from "../Models/Shift.js";


// Add new shift
export const addShift = async (req, res) => {
  try {
    const { shiftName, date, startTime, endTime } = req.body;

    const newShift = new Shift({
      shiftName,
      date,
      startTime,
      endTime,
    });

    await newShift.save();

    res.status(201).json({
      message: "Shift added successfully",
      shift: newShift,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding shift",
      error: error.message,
    });
  }
};