// GuestRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function GuestRoute() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  // if user is logged in, send them to dashboard
  if (user) {
    const userRole = user.current_role;
    if (userRole === "admin") {
        return <Navigate to="/osas/dashboard" replace />;
    } else if (userRole === "treasurer") {
        return <Navigate to="/org/dashboard" replace />;
    } else if(userRole === "student") {
        return <Navigate to="/student/dashboard" replace />;
    }
  }

  return <Outlet />;
}
