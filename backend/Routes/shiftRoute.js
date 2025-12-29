

import express from 'express'
import { addShift } from '../Controller/shiftController.js';
const shiftRoute = express.Router();


shiftRoute.post("/add", addShift)
export default shiftRoute