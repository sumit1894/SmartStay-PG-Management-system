import tenantModel from "../tenantModel/tenantModel.js"

export const getTenant = async (req, res) => {
    try {
        const tenant = await tenantModel.find().populate("roomId", "roomNumber totalBeds occupiedBeds");

        res.status(200).json({
            message: "All tenant fetched successfully!",
            tenant
        });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}