import { FaBars } from "react-icons/fa";
import "../style/topbar.css";

export const Topbar = ({ toggleSidebar }) => {
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
                <button>Logout</button>
            </div>

        </div>
    );
};