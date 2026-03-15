import roomModel from "../../Rooms/roomModel/roomModel.js";
import tenantModel from "../tenantModel/tenantModel.js"

export const deleteTenant = async (req, res) => {
    try {

        const tenant = await tenantModel.findById(req.params.id);

        if (!tenant) {
            return res.status(404).json({ message: "Tenant not found" });
        }

        const room = await roomModel.findById(tenant.roomId);

        if (room) {
            room.occupiedBeds -= 1;
            await room.save();
        }

        await tenantModel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Tenant deleted successfully"
        });


    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}