import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import "../style/rooms.css";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";

export const Rooms = () => {

  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);

  const [formdata, setFormdata] = useState({
    roomNumber: "",
    totalBeds: "",
    occupiedBeds: "",
    rent: ""
  });


  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    });
  };


  const [editId, setEditId] = useState(null);

  const handleEdit = (room) => {
    setEditId(room._id);

    setFormdata({
      roomNumber: room.roomNumber,
      totalBeds: room.totalBeds,
      occupiedBeds: room.occupiedBeds,
      rent: room.rent
    });
  };


  //! Fetch all rooms

  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/auth/all-room",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setRooms(res.data.rooms);
    } catch (error) {
      toast.message(toast.error(error.response?.data?.message || "Server Error"));
    }
  };




  useEffect(() => {
    fetchRooms();
  }, []);


  //! Add Room
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (editId) {

        const res = await axios.put(
          `http://localhost:5000/api/auth/update-room/${editId}`,
          formdata,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        toast.success("Room Updated");

      } else {

        const res = await axios.post(
          "http://localhost:5000/api/auth/create-room",
          formdata,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        toast.success(res.data.message);
      }

      setFormdata({
        roomNumber: "",
        totalBeds: "",
        occupiedBeds: "",
        rent: ""
      });

      setEditId(null);

      fetchRooms();

    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  // Delete room
  const deleteRoom = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/auth/delete-room/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Room Deleted");

      fetchRooms();

    } catch (error) {
      toast.error(error.response?.data?.message || "Not Deleted");
    }
  };

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <div className="main">

        <Topbar toggleSidebar={() => setOpen(!open)} />

        <div className="rooms-content">
          <h2>Room Management</h2>

          {/* Form */}
          <form className="room-form" onSubmit={handleSubmit}>

            <input
              type="text"
              name="roomNumber"
              placeholder="Room Number"
              value={formdata.roomNumber}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="totalBeds"
              placeholder="Total Beds"
              value={formdata.totalBeds}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="occupiedBeds"
              placeholder="Occupied Beds"
              value={formdata.occupiedBeds}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="rent"
              placeholder="Rent"
              value={formdata.rent}
              onChange={handleChange}
              required
            />

            <button type="submit">
              {editId ? "Update Room" : "Add Room"}
            </button>

          </form>

          {/* Table */}
          <table className="room-table">
            <thead>
              <tr>
                <th>Room</th>
                <th>Total Beds</th>
                <th>Occupied</th>
                <th>Rent</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {rooms.length === 0 ? (
                <tr>
                  <td colSpan="5">No Rooms Found</td>
                </tr>
              ) : (
                rooms.map((room) => (
                  <tr key={room._id}>
                    <td>{room.roomNumber}</td>
                    <td>{room.totalBeds}</td>
                    <td>{room.occupiedBeds}</td>
                    <td>₹{room.rent}</td>

                    <td>
                      <button onClick={() => handleEdit(room)}>Edit</button>
                      <button onClick={() => deleteRoom(room._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};