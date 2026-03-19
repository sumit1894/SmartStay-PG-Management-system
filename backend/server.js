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

app.use(cors({
  origin: [
  "http://localhost:5173",
  "https://your-netlify-app.netlify.app"
],
  credentials: true
}))
app.use(express.json());

app.use("/api/auth", userAuthRoute);
app.use("/api/auth", roomRoutes);
app.use("/api/auth", complaintRoutes);
app.use("/api/auth", tenantRoutes);
app.use("/api/auth", paymentRoute);
app.use("/api/auth", getDashboardStats);


// app.listen(5000, () => {
//   console.log("Server running on http://localhost:5000");
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});