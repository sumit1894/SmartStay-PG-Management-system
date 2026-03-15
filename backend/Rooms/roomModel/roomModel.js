import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true,
        unique: true
    },
    totalBeds: {
        type: Number,
        required: true,
        min:1
    },
    occupiedBeds: {
        type: Number,
        default: 0,
        min:0
    }
}, { timestamps: true });

export default mongoose.model("Room", roomSchema);