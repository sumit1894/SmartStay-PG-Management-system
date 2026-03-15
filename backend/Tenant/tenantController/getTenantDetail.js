import tenantModel from "../tenantModel/tenantModel.js";

export const getTenantById = async (req, res) => {
    try {

        const tenant = await tenantModel.findById(req.params.id).populate("roomId", "roomNumber");

        if (!tenant) {
            return res.status(404).json({ message: "Tenant not found" });
        }

        res.status(200).json({
            message: "Tenant fetched successfully",
            tenant
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}