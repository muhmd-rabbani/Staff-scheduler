import mongoose, { Schema } from "mongoose";

const shiftAssignmentSchema = new Schema(
  {
    shift: {
      type: Schema.Types.ObjectId,
      ref: "Shift",
      required: true
    },

    staff: {
      type: Schema.Types.ObjectId,
      ref: "staff",
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true
    },

    assignedBy: {
      type: Schema.Types.ObjectId,
      ref: "Manager"
    }
  },
  { timestamps: true }
);

export default mongoose.model("ShiftAssignment", shiftAssignmentSchema);
