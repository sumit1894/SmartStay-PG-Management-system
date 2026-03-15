import tenantModel from "../../Tenant/tenantModel/tenantModel.js"
import paymentModel from "../PaymentModel/paymentModel.js";



export const getPaymentsDashboard = async (req, res) => {
    try {
        const tenants = await tenantModel.find();

        // get all paid payements

        const paidPayments = await paymentModel.find({ status: "paid" }).populate(
            "tenantId",
            "name phone"
        );

        //extract paid tenant IDs
        const paidTenantIds = paidPayments.map(p => p.tenantId._id.toString());

        //find unpaid tenants
        const unpaidTenants = tenants.filter(
            tenant => !paidTenantIds.includes(tenant._id.toString())
        );

        res.status(200).json({
            paidTenants : paidPayments,
            unpaidTenants
        });



    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}