// src/layouts/ProtectedLayout.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import React from "react";
import Logo from "./assets/Final_Logo.png";

export default function ProtectedLayout({ allowedRoles = [] }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
        <img src={Logo} alt="App Logo" className="w-24 h-24 mb-6 animate-bounce"/>
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700 animate-pulse"> Loading, please wait...</p>
      </div>
      
   
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.current_role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet context={{ user }} />;
}