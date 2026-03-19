import express from "express";
import "./database/db-connection.js";
import userAuthRoute from "./Users/userRoutes/userAuthRoute.js";
import complaintRoutes from "./Complaint/complaintRoutes/complaintRoutes.js";
import roomRoutes from "./Rooms/roomRoutes/roomRoutes.js";
import tenantRoutes from "./Tenant/tenantRoutes/tenantRoutes.js";
import paymentRoute from "./Payment/PaymentRoutes/PaymentRoute.js";
import { getDashboardStats } from "./Dashboard/dashboardController/getDashboard.js";

const app = express();
import cors from "cors"

const allowedOrigins = [
  "http://localhost:5173",
  "https://spstacksmartpg.netlify.app"
];
console.log("NEW DEPLOY CHECK");

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.use(express.json());

app.use("/api/auth", userAuthRoute);
app.use("/api/auth", roomRoutes);
app.use("/api/auth", complaintRoutes);
app.use("/api/auth", tenantRoutes);
app.use("/api/auth", paymentRoute);
app.use("/api/auth", getDashboardStats);


// app.listen(5000, () => {
//   console.log("Server running on https://smartstay-backend-b74w.onrender.com");
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});