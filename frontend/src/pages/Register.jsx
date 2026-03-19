import axios from "axios";
import "../style/register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from 'react-hot-toast';


export const Register = () => {

    const [formdata, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });


    const handleChange = (e) => {
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (formdata.password !== formdata.confirmPassword) {

            toast.error("Passwords do not match");
            return;

        }

        try {
            const res = await axios.post(
                "https://smartstay-backend-b74w.onrender.com/api/auth/register",
                {
                    name: formdata.name,
                    email: formdata.email,
                    password: formdata.password
                }
            );
            toast.success(res.data.message);

        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        }
    };



    return (
        <div className="register-page">
            <form className="register-box" onSubmit={handleSubmit}>

                <h2>Smart PG Register</h2>


                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formdata.name}
                    onChange={handleChange}
                    required
                />


                <input
                    type="email"
                    name="email"
                    placeholder="xyz@gmail.com"
                    value={formdata.email}
                    onChange={handleChange}
                    required
                />


                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formdata.password}
                    onChange={handleChange}
                    required
                />


                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formdata.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Register</button>

                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>

            </form>
        </div>
    );
};