// GuestRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";
import Malupiton from "./assets/malupiton.jpg";

export default function GuestRoute() {
  const { user, loading } = useAuth();
  const [delayedLoading, setDelayedLoading] = useState(true);

  useEffect(() => {
    let timer;
    if (!loading) {
      // add delay before hiding loading screen
      timer = setTimeout(() => setDelayedLoading(false), 1200); // 1.2s delay
    }
    return () => clearTimeout(timer);
  }, [loading]);

  // Show loading screen while auth is fetching OR during delay
  if (loading || delayedLoading) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <img src={Malupiton} className="w-40 animate-pulse" alt="Loading..." />
        <p className="text-xl font-semibold mt-3">Wait lang ngani!!!</p>
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
