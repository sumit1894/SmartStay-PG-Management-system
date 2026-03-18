import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Topbar } from "../components/Topbar";
import { Sidebar } from "../components/Sidebar";
import "../style/payment.css"

export const Payments = () => {

    const [payments, setPayments] = useState([]);
    const [showUnpaid, setShowUnpaid] = useState(false);
    const [open, setOpen] = useState(false);


    const fetchPayments = async () => {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/auth/get-all-payment",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        setPayments(res.data);

    };

    useEffect(() => {
        fetchPayments();
    }, []);

    const markPaid = async (tenant) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post("http://localhost:5000/api/auth/payment",

                {
                    tenantId: tenant.tenantId,
                    amount: tenant.rent,
                    roomNumber: tenant.roomNumber
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            toast.success(res.data.message)
            fetchPayments();
        } catch (error) {
            toast.error(error.response?.data?.message || "Something Error");
        }
    };

    const finalpayments = showUnpaid
        ? payments.filter(t => t.status === "Pending")
        : payments;

    return (
        <>
            <Sidebar open={open} setOpen={setOpen} />

            <div className="main-content">
                <Topbar toggleSidebar={() => setOpen(!open)} />

                <h2 className="page-title">Monthly Payments</h2>

                <div className="payment-actions">
                    <button
                        className="filter-btn"
                        onClick={() => setShowUnpaid(!showUnpaid)}
                    >
                        {showUnpaid ? "Show All" : "Show Unpaid"}
                    </button>
                </div>

                <table className="payment-table">

                    <thead>
                        <tr>
                            <th>Tenant</th>
                            <th>Room</th>
                            <th>Rent</th>
                            <th>Month</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {finalpayments.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="empty-row">
                                    No Payments Found
                                </td>
                            </tr>
                        ) : (
                            finalpayments.map((p) => (
                                <tr key={p.tenantId}>

                                    <td data-label="Tenant"><span>{p.name}</span></td>
                                    <td data-label="Room"><span>{p.roomNumber}</span></td>
                                    <td data-label="Rent"><span>₹{p.rent}</span></td>
                                    <td data-label="Month"><span>{p.month}</span></td>

                                    <td data-label="Status">
                                        <span className={`status ${p.status === "Paid" ? "paid" : "pending"}`}>
                                            {p.status}
                                        </span>
                                    </td>

                                    <td data-label="Action">
                                        {p.status === "Pending" && (
                                            <button
                                                className="pay-btn"
                                                onClick={() => markPaid(p)}
                                            >
                                                Mark Paid
                                            </button>
                                        )}
                                    </td>

                                </tr>
                            ))
                        )}

                    </tbody>

                </table>
            </div>
        </>
    );

};