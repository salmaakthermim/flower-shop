import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/users");
      setUsers(await res.json());
    } catch { toast.error("Failed to load users"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleRoleChange = async (id, role) => {
    const result = await Swal.fire({
      title: `Make this user ${role}?`, icon: "question",
      showCancelButton: true, confirmButtonColor: "#2d5a3d", confirmButtonText: "Yes",
    });
    if (!result.isConfirmed) return;
    const res = await fetch(`http://localhost:5000/users/role/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    if (res.ok) { toast.success("Role updated"); fetchUsers(); }
  };

  const handleStatus = async (id, status) => {
    const res = await fetch(`http://localhost:5000/users/status/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) { toast.success(`User ${status}`); fetchUsers(); }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this user?", icon: "warning",
      showCancelButton: true, confirmButtonColor: "#e8a0b4", confirmButtonText: "Delete",
    });
    if (!result.isConfirmed) return;
    const res = await fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("User deleted"); fetchUsers(); }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-[#2d5a3d] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="p-6 md:p-8">
      <div className="mb-7">
        <p className="section-label">Admin</p>
        <h1 className="text-3xl font-serif font-medium text-[#1a2e1a] mt-1">Manage Users</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#e8f0ea] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[#f0f7f2] border-b border-[#e8f0ea]">
                {["User", "Email", "Role", "Status", "Actions"].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b border-[#f0f7f2] hover:bg-[#fafffe] transition">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#f0f7f2] flex items-center justify-center text-[#2d5a3d] font-serif text-sm flex-shrink-0">
                        {(u.name || u.email || "U")[0].toUpperCase()}
                      </div>
                      <span className="font-medium text-[#1a2e1a]">{u.name || "—"}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-[#4a6a4a]">{u.email}</td>
                  <td className="px-5 py-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-medium ${
                      u.role === "admin" ? "bg-[#f3e8ff] text-[#7b3fa0]" : "bg-[#e8f0ea] text-[#2d5a3d]"
                    }`}>{u.role}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-medium ${
                      u.status === "blocked" ? "bg-[#fce8ef] text-[#c0506a]" : "bg-[#e8f5e9] text-[#2e7d32]"
                    }`}>{u.status || "active"}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2 flex-wrap">
                      {u.role !== "admin" && (
                        <button onClick={() => handleRoleChange(u._id, "admin")}
                          className="px-3 py-1.5 bg-[#f3e8ff] text-[#7b3fa0] text-[10px] tracking-widest uppercase rounded-lg hover:bg-[#7b3fa0] hover:text-white transition font-medium">
                          Make Admin
                        </button>
                      )}
                      {u.status !== "blocked" ? (
                        <button onClick={() => handleStatus(u._id, "blocked")}
                          className="px-3 py-1.5 bg-[#fef9e7] text-[#b7860b] text-[10px] tracking-widest uppercase rounded-lg hover:bg-[#b7860b] hover:text-white transition font-medium">
                          Block
                        </button>
                      ) : (
                        <button onClick={() => handleStatus(u._id, "active")}
                          className="px-3 py-1.5 bg-[#e8f5e9] text-[#2e7d32] text-[10px] tracking-widest uppercase rounded-lg hover:bg-[#2e7d32] hover:text-white transition font-medium">
                          Unblock
                        </button>
                      )}
                      <button onClick={() => handleDelete(u._id)}
                        className="px-3 py-1.5 bg-[#fce8ef] text-[#c0506a] text-[10px] tracking-widest uppercase rounded-lg hover:bg-[#c0506a] hover:text-white transition font-medium">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
