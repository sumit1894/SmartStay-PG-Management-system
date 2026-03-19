import { FaBars } from "react-icons/fa";
import "../style/topbar.css";
import {useNavigate} from "react-router-dom"
import toast from "react-hot-toast";




export const Topbar = ({ toggleSidebar }) => {
    const navigate=useNavigate();

    const handleLogout=()=>{
        localStorage.removeItem("token");
        navigate("/login")
        toast.success("Logged out");

    }
    return (
        <div className="topbar">

            <div className="topbar-left">
                <button className="menu-btn" onClick={toggleSidebar}>
                    <FaBars />
                </button>

                <h3 className="Dashboard-header">Dashboard</h3>
            </div>

            <div className="profile">
                <span>Admin</span>
                <button onClick={handleLogout}>Logout</button>
            </div>

        </div>
    );
};