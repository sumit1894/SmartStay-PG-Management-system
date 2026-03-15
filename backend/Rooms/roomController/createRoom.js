import roomModel from "../roomModel/roomModel.js";

export const CreateRoom = async (req, res) => {
    try {

        const { roomNumber, totalBeds } = req.body;

        if (!roomNumber || !totalBeds) {
            return res.status(400).json({
                message: "Room number and total beds are required"
            });
        }

        const existingRoom = await roomModel.findOne({ roomNumber });

        if (existingRoom) {
            return res.status(400).json({
                message: "Room already Exists"
            });
        }

        const room = new roomModel({
            roomNumber,
            totalBeds,
        });

        await room.save();

        res.status(201).json({
            message: "Room created successfully",
            room
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}