import paymentModel from "../PaymentModel/paymentModel.js";

export const updatePaymentStatus = async (req, res) => {
    try {

        const { status } = req.body;

        const payment = await paymentModel.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        res.status(200).json({
            message: "Payment status updated",
            payment
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};