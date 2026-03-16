import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import { Register } from "./pages/Register";
import { Toaster } from 'react-hot-toast';
import { Dashboard } from "./pages/Dashboard";
import { Rooms } from "./pages/Room";
import { Tenants } from "./pages/Tenant";


export const App = () => {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/rooms" element={<Rooms/>} />
        <Route path="/tenants" element={<Tenants/>}/>
      </Routes>
    </>
  )
}