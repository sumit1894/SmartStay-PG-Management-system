
import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        phone: {
            type: String,
            require: true
        },
        roomNumber: {
            type: String,
            required: true
        },
        rent: {
            type: Number,
            required: true
        },

        joinedDate: {
            type: Date,
            default: Date.now
        }
    }, {
    timestamps: true
}
)

export default mongoose.model("Tenant", tenantSchema);