import mongoose, { Schema } from "mongoose";

const leaveschema = new Schema({
    depid:{type:Schema.Types.ObjectId,ref:'Department'},
    startDate:{type:Date,require:true},
    endDate:{type:Date,require:true},
    leaveType:{type:String,require:true},
    reason:{type:String,require:true},
    status:{type:String,require:true},
    staffId:{type:Schema.Types.ObjectId,ref:'staff'},

},{timestamps:true})
const LEAVE=mongoose.model("leave",leaveschema)
export {LEAVE}