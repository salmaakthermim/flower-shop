// src/layouts/DashboardLayout.jsx
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-pink-50">
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold text-pink-600 mb-6">
          🌸 Dashboard
        </h2>

        <nav className="space-y-3">
          <NavLink to="/dashboard" end className="block">
            Home
          </NavLink>
          <NavLink to="/dashboard/profile" className="block">
            Profile
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-pink-500 text-white py-2 rounded-lg"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
