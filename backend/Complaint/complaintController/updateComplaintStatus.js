import complaintModel from "../complaintModel/complaintModel.js";


export const updateComplaintStatus = async (req, res) => {
    try {

        const { id } = req.params;
        const { status } = req.body;

        const validStatus = ["pending", "in-progress", "resolved"];

        if (!validStatus.includes(status)) {
            return res.status(400).json({
                message: "Invalid status value"
            })
        }

        const complaint = await complaintModel.findById(id);

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not Found"
            })
        }

        complaint.status = status;

        await complaint.save();

        res.status(200).json({
            message: "Complaint Status Update !",
            complaint
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}