import roomModel from "../roomModel/roomModel.js";

export const updateRoom = async (req, res) => {
    try {

        const { roomNumber, totalBeds, occupiedBeds, rent } = req.body;

        const room = await roomModel.findByIdAndUpdate(
            req.params.id,
            {
                roomNumber,
                totalBeds,
                occupiedBeds,
                rent
            },
            { new: true }
        );

        if (!room) {
            return res.status(404).json({
                message: "Room not found"
            });
        }
        res.status(200).json({
            message: "Room updated successfully",
            room
        });

    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}