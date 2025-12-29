
import express from "express"
import { login } from "../Controller/authController.js"
const route=express.Router()
route.post("/login",login)

export default route