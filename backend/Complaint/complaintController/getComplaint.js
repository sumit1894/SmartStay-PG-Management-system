import complaintModel from "../complaintModel/complaintModel.js"


export const getComplaint=async(req,res)=>{
    try {
        const complaints=await complaintModel.find();

        res.status(200).json({
            totalComplaints: complaints.length,
            complaints
        });

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}