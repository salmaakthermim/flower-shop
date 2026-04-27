import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("token");

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#f0f7f2]">
      <div className="w-10 h-10 border-2 border-[#2d5a3d] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  // user state অথবা token যেকোনো একটা থাকলে allow
  if (!user && !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
