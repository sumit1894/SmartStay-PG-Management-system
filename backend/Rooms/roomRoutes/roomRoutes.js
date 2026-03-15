import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { getAllRooms } from "../roomController/getRoom.js";
import { deleteRoom } from "../roomController/deleteRoom.js";
import { CreateRoom } from "../roomController/createRoom.js";

const router = express.Router();

router.post("/create-room", authMiddleware, CreateRoom);
router.get("/all-room", authMiddleware, getAllRooms);
router.delete("/delete-room/:id", authMiddleware, deleteRoom);

export default router;