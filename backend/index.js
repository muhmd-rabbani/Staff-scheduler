import mongoose from "mongoose";
import express from "express";
import cors from "cors";
mongoose.connect("mongodb://localhost:27017/Staffscheduler").then(()=>{
    console.log("mongodb connectedsuccessfully")
})
.catch((e)=>{
    console.log(e)
})
const app=express()
app.use(express.json())
app.use(cors({origin:'*'}))
app.listen(8000,()=>{ console.log("Serverstarted onport 8000")})