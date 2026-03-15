
import { useState } from "react"
import axios from "axios"
import "../style/login.css"
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
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
                {
                    email: email,
                    password: password
                }
            )

            localStorage.setItem("token", res.data.token);
            toast.success(res.data.message);
            navigate("/Dashboard")


        } catch (error) {
            toast.error(error.response?.data?.message || "login failed");
        }
    }



    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Smart PG Login</h2>

                <form className="login-form" onSubmit={handleLogin}>

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                        />
                    </div>

                    <button className="login-btn">Login</button>

                    <p>
                        Don't have an account? <Link to="/register">SignIn</Link>
                    </p>

                </form>
            </div>
        </div>
    )
}