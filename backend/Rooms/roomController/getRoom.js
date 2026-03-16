import roomModel from "../roomModel/roomModel.js";

export const getAllRooms = async (req, res) => {
    try {
        const rooms = await roomModel.find().sort({ roomNumber: 1 });
        res.status(200).json({
            totalRooms: rooms.length,
            rooms
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}