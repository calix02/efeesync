// src/layouts/ProtectedLayout.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function ProtectedLayout({ allowedRoles = [] }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.current_role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet context={{ user }} />;
}