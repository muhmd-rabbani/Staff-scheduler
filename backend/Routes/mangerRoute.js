import {addManager, deleteManager, getallmanagers, getManagerById, updateManager } from "../Controller/managerController.js"
import express from "express"
const route=express.Router()
route.post("/addManager",addManager)
route.get("/allmanagers",getallmanagers)
route.get("/:id", getManagerById);
route.put("/update/:id", updateManager);
route.delete("/delete/:id", deleteManager);
export default route