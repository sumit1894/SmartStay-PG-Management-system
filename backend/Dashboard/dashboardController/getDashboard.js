import complaintModel from "../../Complaint/complaintModel/complaintModel.js";
import paymentModel from "../../Payment/PaymentModel/paymentModel.js";
import roomModel from "../../Rooms/roomModel/roomModel.js";
import tenantModel from "../../Tenant/tenantModel/tenantModel.js";


export const getDashboardStats = async (req, res) => {

    try {

        const totalRooms=await roomModel.countDocuments();
        const totalTenants=await tenantModel.countDocuments();

        const pendingComplaints= await complaintModel.countDocuments({
            status:"pending",
        });

        const rooms= await  roomModel.find();

        let totalBeds=0;
        let occupiedBeds=0;

        rooms.forEach(room=>{
            totalBeds +=room.totalBeds;
            occupiedBeds+=room.occupiedBeds;
        })

        const availableBeds=totalBeds-occupiedBeds;

        //! Revanue State 

        const payments= await paymentModel.find();

        let monthlyRent=0;
        let pendingRent=0;

        payments.forEach(payment=>{
            monthlyRent+=payment.amount;

            if(payment.status==="pending"){
                pendingRent+=payment.amount;
            }
        })



        res.json({
            totalRooms,
            totalTenants,
            availableBeds,
            pendingComplaints,
            monthlyRent,
            pendingRent
        })


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}