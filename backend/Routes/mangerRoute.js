import {addManager, deleteManager, deletestaff, editstaff, getallmanagers, getManagerById, getManagerByLoginId, updateManager } from "../Controller/managerController.js"
import express from "express"
const route=express.Router()
route.post("/addManager",addManager)
route.get("/allmanagers",getallmanagers)
route.get("/:id", getManagerById);
route.put("/update/:id", updateManager);
route.delete("/delete/:id", deleteManager);
route.put('/updateStaff/:staffid',editstaff);
route.delete('/deletestaff/:staffid',deletestaff)
route.get("/bylogin/:loginId", getManagerByLoginId);

export default route