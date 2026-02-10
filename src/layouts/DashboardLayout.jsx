import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  // ✅ fallback role
  const role = user?.role || localStorage.getItem("role");

  const handleLogout = async () => {
    await logoutUser?.();
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-pink-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-pink-600 mb-6">
          🌸 {role?.toUpperCase()} Dashboard
        </h2>

        <nav className="space-y-3 text-gray-700 flex-1">
          {/* ADMIN */}
          {role === "admin" && (
            <>
              <NavLink
                to="/dashboard/admin/add-flower"
                className="btn w-full py-2 rounded-lg hover:bg-pink-100"
              >
                🌼 Add Flower
              </NavLink>

              <NavLink
                to="/dashboard/admin/manage-flowers"
                className="btn w-full py-2 rounded-lg hover:bg-pink-100"
              >
                📦 Manage Products
              </NavLink>

              <NavLink
                to="/dashboard/admin/all-orders"
                className="btn w-full py-2 rounded-lg hover:bg-pink-100"
              >
                🛒 All Orders
              </NavLink>

              <NavLink
                to="/dashboard/admin/manage-users"
                className="btn w-full py-2 rounded-lg hover:bg-pink-100"
              >
                👥 Manage Users
              </NavLink>
            </>
          )}

          {/* CUSTOMER */}
          {role === "customer" && (
            <>
              <NavLink
                to="/dashboard/my-orders"
                className="btn w-full py-2 rounded-lg hover:bg-pink-100"
              >
                🛍 My Orders
              </NavLink>

              <NavLink
                to="/dashboard/cart"
                className="btn w-full py-2 rounded-lg hover:bg-pink-100"
              >
                🛒 My Cart
              </NavLink>
            </>
          )}

          {/* GUEST */}
          {role === "guest" && (
            <NavLink
              to="/shop"
              className="btn w-full py-2 rounded-lg hover:bg-pink-100"
            >
              🌸 Browse Flowers
            </NavLink>
          )}
        </nav>

        {/* COMMON LINKS */}
        <div className="mt-6">
          <NavLink
            to="/"
            end
            className="btn w-full py-2 rounded-lg hover:bg-pink-100"
          >
            🏠 Home
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className="btn mt-5 w-full py-2 rounded-lg hover:bg-pink-100"
          >
            👤 Profile
          </NavLink>

          <button
            onClick={handleLogout}
            className="mt-10 w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
