import {addManager } from "../Controller/managerController.js"
import express from "express"
const route=express.Router()
route.post("/addManager",addManager)
export default route