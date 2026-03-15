import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import { Register } from "./pages/Register";
import { Toaster } from 'react-hot-toast';
import { Dashboard } from "./pages/Dashboard";


export const App = () => {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}