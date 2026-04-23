import { Navigate } from "react-router-dom";

// Redirect to role-specific dashboard
const DashboardHome = () => {
  const role = localStorage.getItem("role") || "guest";
  if (role === "admin") return <Navigate to="/dashboard/admin" replace />;
  if (role === "customer") return <Navigate to="/dashboard/customer" replace />;
  return <Navigate to="/dashboard/guest" replace />;
};

export default DashboardHome;
