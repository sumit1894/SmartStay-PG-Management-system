import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import "../style/dashboard.css"
import { Sidebar } from "../components/sidebar"
import { Topbar } from "../components/Topbar"

export const Dashboard = () => {

    const [stats, setStats] = useState({
        totalRooms: 0,
        totalTenants: 0,
        occupiedBeds: 0,
        pendingComplaints: 0,
        monthlyRent: 0,
        pendingRent: 0
    })

    const fetchDashBoard = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/auth/get-dashboard");
            setStats(res.data);

        } catch (error) {
            toast.error("Server Error")
        }
    }

    useEffect(() => {
        fetchDashBoard();
    }, [])


    return (
        <>
            <Sidebar />
            <div className="main-content">
                <Topbar />
                <div className="dashboard">

                    <h1>Smart PG Dashboard</h1>

                    <div className="cards">

                        <div className="card">
                            <h3>Total Tenants</h3>
                            <p>{stats.totalTenants}</p>
                        </div>

                        <div className="card">
                            <h3>Total Rooms</h3>
                            <p>{stats.totalRooms}</p>
                        </div>

                        <div className="card">
                            <h3>Occupied Beds</h3>
                            <p>{stats.occupiedBeds}</p>
                        </div>
                        <div className="card">
                            <h3>pending Rent</h3>
                            <p>{stats.pendingRent}</p>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}