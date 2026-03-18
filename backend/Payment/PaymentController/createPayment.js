import paymentModel from "../PaymentModel/paymentModel.js";


export const uploadPayment = async (req, res) => {
    try {

        const { tenantId, amount, roomNumber } = req.body;

        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();

        const existingPayment = await paymentModel.findOne({
            tenantId,
            month,
            year
        });

         if (existingPayment) {
            return res.status(400).json({
                message: "Rent already paid for this month"
            });
        }

        const payment = new paymentModel({
            tenantId,
            roomNumber,
            amount,
            month,
            year,
            status: "paid"
        })

        await payment.save();

        res.status(201).json({
            message: "Payment uploaded successfully",
            payment
        });



    } catch (error) {
        res.status(500).json({ message: error.message || "Server Error" });
    }
}

