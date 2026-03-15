import roomModel from "../../Rooms/roomModel/roomModel.js";
import tenantModel from "../tenantModel/tenantModel.js";


export const createTenant = async (req, res) => {
    try {
        const { name, phone, roomId, rentAmount } = req.body;

        const room = await roomModel.findById(roomId);
        if (!room) {
            return res.statu(404).json({ message: "Room not found!" })
        }

        if (room.occupiedBeds >= room.totalBeds) {
            return res.statu(400).json({ message: "Room is already full!" })
        }

        const tenant = new tenantModel({
            name,
            phone,
            roomId,
            rentAmount
        });

        await tenant.save();

        room.occupiedBeds += 1;
        await room.save()

        res.status(201).json({
            message: "Tenant added successfully",
            tenant
        });

    } catch (error) {
        res.statu(500).json({ error: error.message })
    }
}