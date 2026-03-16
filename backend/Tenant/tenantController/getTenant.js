import tenantModel from "../tenantModel/tenantModel.js"

export const getTenant = async (req, res) => {
    try {
        const tenant = await tenantModel.find().sort({roomNumber:1});

        res.status(200).json({
            success:true,
            tenant
        });

    } catch (error) {
        res.status(500).json({success:false, message: error.message })
    }
}