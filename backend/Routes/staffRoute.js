
import express from "express"
import { addstaff, getallstaffs } from "../Controller/staffController.js"
const route=express.Router()
route.post("/addStaff",addstaff)
route.get('/staff',getallstaffs)
export default route