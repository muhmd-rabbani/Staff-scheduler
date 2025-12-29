import mongoose, { Schema } from "mongoose";

const shiftScheema=new Schema(
 {
    shiftName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)
const shift=mongoose.model("Shift",shiftScheema)
export default shift


