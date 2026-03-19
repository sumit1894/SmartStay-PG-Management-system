import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";


export const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        toast.success("Logged out");
        return <Navigate to="/login" />;

    }

    return children;
};