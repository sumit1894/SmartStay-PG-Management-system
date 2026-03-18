import paymentModel from "../../Payment/PaymentModel/paymentModel.js";
import roomModel from "../../Rooms/roomModel/roomModel.js";
import tenantModel from "../tenantModel/tenantModel.js";

export const deleteTenant = async (req, res) => {
    try {

        const tenant = await tenantModel.findById(req.params.id);

        if (!tenant) {
            return res.status(404).json({
                success: false,
                message: "Tenant not found"
            });
        }

        const room = await roomModel.findOne({ roomNumber: tenant.roomNumber });

        if (room && room.occupiedBeds > 0) {
            room.occupiedBeds -= 1;
            await room.save();
        }
        
        await tenantModel.findByIdAndDelete(req.params.id);

        const paymentUser=await paymentModel.find({roomNumber: tenant.roomNumber})

        res.status(200).json({
            success: true,
            message: "Tenant deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Server error"
        });
    }
};