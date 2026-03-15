import paymentModel from "../PaymentModel/paymentModel.js";

export const getPaymentByTenant = async (req, res) => {
  try {

    const payments = await paymentModel
      .find({ tenantId: req.params.tenantId })
      .populate("tenantId", "name phone");

    res.status(200).json({
      payments
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};