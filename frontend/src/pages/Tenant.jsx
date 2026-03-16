import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../style/tenant.css"

export const Tenants = () => {

    const [tenants, setTenants] = useState([]);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        roomNumber: "",
        rent: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const addTenant = async (e) => {
        try {
            e.preventDefault();
            const token = localStorage.getItem("token");

            const res = await axios.post("http://localhost:5000/api/auth/create-tenant", form, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success(res.data.message);
            
            setForm({
                name: "",
                phone: "",
                roomNumber: "",
                rent: ""
            })
            getTenants();
        } catch (error) {
            toast.error(error.response?.data?.message || "Not Added");
        }
    };

    const getTenants = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/auth/get-all-tenant", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTenants(res.data.tenant);
        } catch (error) {
            toast.error(error.response?.data?.message);

        }
    };


    const deleteTenant = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.delete(`http://localhost:5000/api/auth/delete-tenant/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success(res.data.message);
            getTenants();
        } catch (error) {
            toast.error(error.response?.data?.message || "Not Deleted");
        }
    };

    useEffect(() => {
        getTenants();
    }, []);

    return (
        <div className="tenants-container">

            <h2>Add Tenant</h2>

            <form className="tenant-form" onSubmit={addTenant}>

                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
                <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
                <input name="roomNumber" placeholder="Room Number" value={form.roomNumber} onChange={handleChange} />
                <input name="rent" placeholder="Rent" value={form.rent} onChange={handleChange} />

                <button className="add-btn" type="submit">Add Tenant</button>

            </form>

            <h2>Tenants List</h2>

            <table className="tenants-table">

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Room</th>
                        <th>Rent</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {tenants.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="empty-row">No Tenants Found</td>
                        </tr>
                    ) : (

                        tenants.map((tenant) => (
                            <tr key={tenant._id}>
                                <td>{tenant.name}</td>
                                <td>{tenant.roomNumber}</td>
                                <td>{tenant.rent}</td>
                                <td>{tenant.phone}</td>

                                <td>
                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteTenant(tenant._id)}
                                    >
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        ))

                    )}

                </tbody>

            </table>

        </div>
    );
};