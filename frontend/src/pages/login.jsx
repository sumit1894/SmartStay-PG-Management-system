import { useState } from "react";
import axios from "axios";
import "../style/login.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                { email, password }
            );

            localStorage.setItem("token", res.data.token);
            toast.success(res.data.message);
            navigate("/");

        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="login-page">

            <div className="login-wrapper">

                {/* LEFT SIDE */}
                <div className="login-left">
                    <h3>Hello, welcome to!</h3>
                    <div className="logo-circle">🔥</div>
                    <h2>Smart PG</h2>
                    <p>Manage your PG system smartly and easily</p>

                    <button className="left-btn">GET STARTED</button>
                </div>

                {/* RIGHT SIDE */}
                <div className="login-right">
                    <h2>welcome</h2>
                    <p>Login to your account to continue</p>

                    <form onSubmit={handleLogin}>

                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button className="login-btn">SIGN IN</button>
                    </form>
                </div>

            </div>

        </div>
    );
};