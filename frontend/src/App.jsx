import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import { Register } from "./pages/Register";
import { Toaster } from 'react-hot-toast';
import { Dashboard } from "./pages/Dashboard";
import { Rooms } from "./pages/Room";
import { Tenants } from "./pages/Tenant";
import { Payments } from "./pages/Payments";
import { ProtectedRoute } from "./components/ProtectedRoute";


export const App = () => {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/rooms" element={<ProtectedRoute><Rooms /></ProtectedRoute>} />
        <Route path="/tenants" element={<ProtectedRoute><Tenants /></ProtectedRoute>} />
        <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
      </Routes>
    </>
  )
}