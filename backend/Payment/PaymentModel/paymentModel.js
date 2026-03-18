
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
        required: true
    },
     roomNumber: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    month: {
        type: Number, // 1–12
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    paidDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["paid", "pending"],
        default: "pending"
    },

}, { timestamps: true })

export default mongoose.model("Payment", paymentSchema);