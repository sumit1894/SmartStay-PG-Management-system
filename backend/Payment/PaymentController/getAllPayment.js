import paymentModel from "../PaymentModel/paymentModel.js";

export const getAllPayments = async (req, res) => {
  try {

    const payments = await paymentModel
      .find()
      .populate("tenantId", "name phone roomId");

    res.status(200).json({
      message: "All payments",
      payments
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};