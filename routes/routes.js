import express from "express";
import { getAllDataController, bookSeatController,getSeatNumbers } from "../controllers/seatController.js";

const router = express.Router();

router.post("/getalldata", getAllDataController);
router.post("/booktickets", bookSeatController);
router.post("/getseatnumbers", getSeatNumbers)

export default router;
