import tenantModel from "../../Tenant/tenantModel/tenantModel.js";
import paymentModel from "../PaymentModel/paymentModel.js";

export const getAllPayments = async (req, res) => {
  try {
    const tenants = await tenantModel.find();

    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const payments = await paymentModel.find({ month, year });

    const result = tenants.map((tenant) => {

      const payment = payments.find(
        (p) => p.tenantId.toString() === tenant._id.toString()
      );

      return {
        tenantId: tenant._id,
        name: tenant.name,
        roomNumber: tenant.roomNumber,
        rent: tenant.rent,
        month,
        year,
        status: payment ? "Paid" : "Pending"
      };

    })

    res.json(result);



  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};