

import { Link } from "react-router-dom";
import "../style/sidebar.css";

export const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Smart PG</h2>

            <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/rooms">Rooms</Link></li>
                <li><Link to="/tenants">Tenants</Link></li>
                <li><Link to="/payments">Payments</Link></li>
                <li><Link to="/logout">LogOut</Link></li>
            </ul>
        </div>
    );
};