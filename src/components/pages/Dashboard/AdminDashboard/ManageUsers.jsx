// src/components/pages/Dashboard/AdminDashboard/ManageUsers.jsx
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      setUsers(data);
    } catch {
      toast.error("Failed to load users ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // role change
  const handleRoleChange = async (id, role) => {
    const result = await Swal.fire({
      title: "Change role?",
      text: `Make this user ${role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ec4899",
      confirmButtonText: "Yes",
    });

    if (!result.isConfirmed) return;

    const res = await fetch(`http://localhost:5000/users/role/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });

    if (res.ok) {
      toast.success("Role updated ✅");
      fetchUsers();
    }
  };

  // block / unblock
  const handleStatus = async (id, status) => {
    const res = await fetch(`http://localhost:5000/users/status/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      toast.success(`User ${status} 🚦`);
      fetchUsers();
    }
  };

  // delete user
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete user?",
      text: "This action cannot be undone!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    const res = await fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("User deleted 🗑️");
      fetchUsers();
    }
  };

  if (loading) return <p className="text-center mt-10">Loading users...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-pink-600 text-center mb-6">
        👥 Manage Users
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-pink-100 text-pink-700">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{u.name}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3 capitalize">{u.role}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-white ${
                    u.status === "blocked" ? "bg-red-500" : "bg-green-500"
                  }`}>
                    {u.status || "active"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center space-x-2">
                  {u.role !== "admin" && (
                    <button
                      onClick={() => handleRoleChange(u._id, "admin")}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      Make Admin
                    </button>
                  )}

                  {u.status !== "blocked" ? (
                    <button
                      onClick={() => handleStatus(u._id, "blocked")}
                      className="px-3 py-1 bg-yellow-500 text-white rounded"
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatus(u._id, "active")}
                      className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                      Unblock
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(u._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
