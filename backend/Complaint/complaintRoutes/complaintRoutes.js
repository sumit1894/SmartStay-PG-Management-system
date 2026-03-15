
import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { createComplaint } from "../complaintController/createComplaint.js";
import { getComplaint } from "../complaintController/getComplaint.js";
import { updateComplaintStatus } from "../complaintController/updateComplaintStatus.js";

const router=express.Router();

router.post("/complaint",authMiddleware,createComplaint);
router.get("/get-all-complaint",authMiddleware,getComplaint);
router.put("/update-status/:id",authMiddleware,updateComplaintStatus);

export default router;