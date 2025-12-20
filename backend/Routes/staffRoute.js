
import express from "express"
import { addstaff } from "../Controller/staffController.js"
const route=express.Router()
route.post("/addStaff",addstaff)
export default route