import roomModel from "../../Rooms/roomModel/roomModel.js";
import complaintModel from "../complaintModel/complaintModel.js";

export const createComplaint = async (req, res) => {
    try {

        const { roomId, message } = req.body;

        if (!roomId || !message) {
            return res.status(400).json({
                message: "roomID and Message is requird!"
            })
        }

        const room = await roomModel.findById(roomId);

        if (!room) {
            return res.status(400).json({
                message: "Invalid RoomId! "
            })
        }

        const complaint = new complaintModel({
            userId: req.user.id,
            roomId,
            message
        });

        await complaint.save();

        res.json({
            message: "Complaint submitted successfully",
            complaint
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};