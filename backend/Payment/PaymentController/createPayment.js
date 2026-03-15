import paymentModel from "../PaymentModel/paymentModel.js";


export const uploadPayment = async (req, res) => {
    try {

        const { tenantId, amount, transactionId } = req.body;

        const existingPayment = await paymentModel.findOne({ transactionId });

        if (existingPayment) {
            return res.status(400).json({
                message: "Transaction already exists"
            });
        };

        const payment = new paymentModel({
            tenantId,
            amount,
            transactionId,
            status: "pending"
        })

        await payment.save();

        res.status(201).json({
            message: "Payment uploaded successfully",
            payment
        });



    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}