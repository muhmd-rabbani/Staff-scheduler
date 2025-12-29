import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import adminRoute from "./Routes/adminRoute.js"
import managerRoute from "./Routes/mangerRoute.js"
import staffRoute from "./Routes/staffRoute.js"
import authRoute from "./Routes/authRoute.js"
import shiftRoute from "./Routes/shiftRoute.js"
mongoose.connect("mongodb://localhost:27017/Staffscheduler").then(()=>{
    console.log("mongodb connectedsuccessfully")
})
.catch((e)=>{
    console.log(e)
})
const app=express()
app.use(express.json())
app.use(cors({origin:'*'}))
app.use("/api/admin",adminRoute)
app.use("/api/Manager",managerRoute)
app.use("/api/staff",staffRoute)
app.use("/api/login",authRoute)
app.use("/api/shift",shiftRoute)

app.listen(8000,()=>{ console.log("Serverstarted onport 8000")})