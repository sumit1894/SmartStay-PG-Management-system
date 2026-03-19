import roomModel from "../../Rooms/roomModel/roomModel.js";
import tenantModel from "../tenantModel/tenantModel.js";

export const createTenant = async (req, res) => {
    try {

        const { name, phone, roomNumber, rent,aadhar } = req.body;

        // find specific room
        const room = await roomModel.findOne({ roomNumber });

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        // check if room full
        if (room.occupiedBeds >= room.totalBeds) {
            return res.status(400).json({
                success: false,
                message: "Room is already full!"
            });
        }

        const tenant = new tenantModel({
            name,
            phone,
            roomNumber,
            aadhar,
            rent
        });

        await tenant.save();

        // increase occupied beds
        room.occupiedBeds += 1;
        await room.save();

        res.status(201).json({
            success: true,
            message: "Tenant added successfully",
            tenant
        });

    } catch (error) {
        res.status(500).json({
            message: error.message || "Something Error Found"
        });
    }
};