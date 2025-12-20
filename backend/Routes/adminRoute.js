import { addDep, getDepartments } from "../Controller/adminController.js"
import express from "express"
const route=express.Router()
route.post("/addDep",addDep)
route.get('/department',getDepartments)
export default route