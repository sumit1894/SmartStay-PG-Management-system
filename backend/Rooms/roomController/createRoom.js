import roomModel from "../roomModel/roomModel.js";


export const CreateRoom = async (req, res) => {
    try {

        const { roomNumber, totalBeds, occupiedBeds, rent } = req.body;


        const existingRoom = await roomModel.findOne({ roomNumber });

        if (existingRoom) {
            return res.status(400).json({
                success:false,
                message: "Room already Exists!"
            });
        }

        const room = new roomModel({
            roomNumber,
            totalBeds,
            rent,
            occupiedBeds
        });

        await room.save();

        res.status(201).json({
            success:true,
            message: "Room created successfully!",
            room
        });
    } catch (error) {
        res.status(500).json({success:false, message: error.message });
    }
}