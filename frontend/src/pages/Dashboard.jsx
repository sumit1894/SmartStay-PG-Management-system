import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "../style/dashboard.css";

import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";





// Icons
import {
    FaUsers,
    FaDoorOpen,
    FaBed,
    FaMoneyBillWave,
    FaExclamationCircle,
    FaUserPlus,
    FaPlusSquare
} from "react-icons/fa";
import Loader from "../components/Loading";

export const Dashboard = () => {
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        totalRooms: 0,
        totalTenants: 0,
        occupiedBeds: 0,
        vacantBeds: 0,
        pendingComplaints: 0,
        monthlyRent: 0,
        pendingRent: 0
    });
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true); // ✅ loading state

    const fetchDashBoard = async () => {

        try {

            const token = localStorage.getItem("token");
            const res = await axios.get("https://smartstay-backend-b74w.onrender.com/api/auth/get-dashboard",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setStats(res.data);
        } catch (error) {
            toast.error("Unauthorized or Server Error");
            navigate("/login");
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchDashBoard();
    }, []);


    if (loading) {
        return <Loader text="Loading Dashboard..." />
    }
    return (
        <>
            <Sidebar open={open} setOpen={setOpen} />

            <div className="main-content">
                <Topbar toggleSidebar={() => setOpen(!open)} />

                <div className="dashboard">

                    <h1>Smart PG Dashboard</h1>

                    {/* Stats Cards */}
                    <div className="cards">

                        <div className="card">
                            <FaUsers className="icon blue" />
                            <h3>Total Tenants</h3>
                            <p>{stats.totalTenants}</p>
                        </div>

                        <div className="card">
                            <FaDoorOpen className="icon purple" />
                            <h3>Total Rooms</h3>
                            <p>{stats.totalRooms}</p>
                        </div>

                        <div className="card">
                            <FaBed className="icon green" />
                            <h3>Occupied Beds</h3>
                            <p>{stats.occupiedBeds}</p>
                        </div>

                        <div className="card">
                            <FaBed className="icon orange" />
                            <h3>Vacant Beds</h3>
                            <p>{stats.vacantBeds}</p>
                        </div>

                        <div className="card success">
                            <FaMoneyBillWave className="icon green" />
                            <h3>Monthly Rent</h3>
                            <p>₹ {stats.monthlyRent}</p>
                        </div>

                        <div className="card pending">
                            <FaExclamationCircle className="icon red" />
                            <h3>Pending Rent Tenants</h3>
                            <p>{stats.pendingComplaints}</p>
                        </div>

                    </div>

                    {/* Quick Actions */}
                    <div className="actions">
                        <Link to="/tenants">
                            <button className="action-btn green-btn">
                                <FaUserPlus />
                                Add Tenant
                            </button>
                        </Link>

                        <Link to="/rooms">
                            <button className="action-btn yellow-btn">
                                <FaPlusSquare />
                                Add Room
                            </button>
                        </Link>

                        <Link to="/payments">
                            <button className="action-btn red-btn">
                                <FaMoneyBillWave />
                                Record Payment
                            </button>
                        </Link>

                    </div>

                    {/* Optional: Info Section */}
                    <div className="info-box">
                        <h2>Overview</h2>
                        <p>
                            You have <b>{stats.totalTenants}</b> tenants across{" "}
                            <b>{stats.totalRooms}</b> rooms. Currently{" "}
                            <b>{stats.vacantBeds}</b> beds are available.
                        </p>
                    </div>

                </div>
            </div>
        </>
    );
};