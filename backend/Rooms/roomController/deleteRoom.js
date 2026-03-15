import roomModel from "../roomModel/roomModel.js";

export const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;

        const room = await roomModel.findById(id);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        if(room.occupiedBeds>0){
            return res.status(400).json({
                message:"Cannot delete room with occupants"
            });
        }

        await roomModel.findByIdAndDelete(id);


        res.status(200).json({
            message: "Room deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}