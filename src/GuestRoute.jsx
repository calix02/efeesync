// GuestRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";
import React from "react";
import Logo from "./assets/Final_Logo.png";

export default function GuestRoute() {
  const { user, loading } = useAuth();
  const [delayedLoading, setDelayedLoading] = useState(true);

  useEffect(() => {
    let timer;
    if (!loading) {
      // add delay before hiding loading screen
      timer = setTimeout(() => setDelayedLoading(false), 2000); // 1.2s delay
    }
    return () => clearTimeout(timer);
  }, [loading]);

  // Show loading screen while auth is fetching OR during delay
  if (loading || delayedLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
        <img src={Logo} alt="App Logo" className="w-24 h-24 mb-6 animate-bounce"/>
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold font-inter text-gray-700 animate-pulse"> Loading, please wait...</p>
      </div>
    );
  }

  // if user is logged in, send them to dashboard
  if (user) {
    const userRole = user.current_role;
    if (userRole === "admin") {
      return <Navigate to="/osas/dashboard" replace />;
    } else if (userRole === "treasurer") {
      return <Navigate to="/org/dashboard" replace />;
    } else if (userRole === "student") {
      return <Navigate to="/student/dashboard" replace />;
    }
  }

  return <Outlet />;
}
