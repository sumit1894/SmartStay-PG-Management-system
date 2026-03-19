import { NavLink } from "react-router-dom";
import {
    FaHome,
    FaDoorOpen,
    FaUsers,
    FaMoneyBill,
    FaSignOutAlt
} from "react-icons/fa";

import "../style/sidebar.css";
import toast from "react-hot-toast";


import { useNavigate } from "react-router-dom";



export const Sidebar = ({ open, setOpen }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
        toast.success("Logged out");
    };
    return (
        <>
            {/* Overlay (mobile) */}
            {open && <div className="overlay" onClick={() => setOpen(false)}></div>}

            <div className={`sidebar ${open ? "open" : ""}`}>

                <h2>Smart PG</h2>

                <ul>

                    <li>
                        <NavLink to="/" onClick={() => setOpen(false)}>
                            <FaHome className="nav-icon" />
                            Dashboard
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/rooms" onClick={() => setOpen(false)}>
                            <FaDoorOpen className="nav-icon" />
                            Rooms
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/tenants" onClick={() => setOpen(false)}>
                            <FaUsers className="nav-icon" />
                            Tenants
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/payments" onClick={() => setOpen(false)}>
                            <FaMoneyBill className="nav-icon" />
                            Payments
                        </NavLink>
                    </li>

                    <li onClick={handleLogout}>
                        <NavLink  onClick={() =>{
                            setOpen(false)
                        }}>
                            <FaSignOutAlt className="nav-icon" />
                            Logout
                        </NavLink>
                    </li>

                </ul>
            </div>
        </>
    );
};