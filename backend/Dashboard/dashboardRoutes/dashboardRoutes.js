
import express from "express";
import { getDashboardStats } from "../dashboardController/getDashboard.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const route=express.Router();

route.get("/get-dashboard",authMiddleware,getDashboardStats);


export default route;