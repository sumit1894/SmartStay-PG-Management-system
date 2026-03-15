
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["paid", "pending", "failed"],
        default: "pending"
    },
    transactionId: {
        type: String,
        required: true,
        unique: true
    }

}, { timestamps: true })

export default mongoose.model("Payment", paymentSchema);