import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function ManageFlowers() {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", image: "", description: "" });
  const [updating, setUpdating] = useState(false);

  const fetchFlowers = async () => {
    try {
      const res = await fetch("http://localhost:5000/flowers");
      setFlowers(await res.json());
    } catch { toast.error("Failed to load flowers"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchFlowers(); }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this flower?", icon: "warning",
      showCancelButton: true, confirmButtonColor: "#e8a0b4",
      cancelButtonColor: "#6b7280", confirmButtonText: "Delete",
    });
    if (!result.isConfirmed) return;
    const res = await fetch(`http://localhost:5000/flowers/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Flower deleted"); setFlowers(f => f.filter(x => x._id !== id)); }
  };

  const openEdit = (flower) => {
    setEditId(flower._id);
    setForm({ name: flower.name, price: flower.price, image: flower.image, description: flower.description || "" });
    setIsOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await fetch(`http://localhost:5000/flowers/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { toast.success("Flower updated"); setIsOpen(false); fetchFlowers(); }
      else toast.error("Update failed");
    } catch { toast.error("Server error"); }
    finally { setUpdating(false); }
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
        <h1 className="text-3xl font-serif font-medium text-[#1a2e1a] mt-1">Manage Flowers</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#e8f0ea] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[#f0f7f2] border-b border-[#e8f0ea]">
                {["Image", "Name", "Price", "Actions"].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {flowers.map((flower) => (
                <tr key={flower._id} className="border-b border-[#f0f7f2] hover:bg-[#fafffe] transition">
                  <td className="px-5 py-3">
                    <img src={flower.image} alt={flower.name} className="w-12 h-12 rounded-xl object-cover bg-[#f0f7f2]" />
                  </td>
                  <td className="px-5 py-3 font-medium text-[#1a2e1a]">{flower.name}</td>
                  <td className="px-5 py-3 font-semibold text-[#2d5a3d]">${flower.price}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(flower)}
                        className="px-3 py-1.5 bg-[#f0f7f2] text-[#2d5a3d] text-[10px] tracking-widest uppercase rounded-lg hover:bg-[#2d5a3d] hover:text-white transition font-medium">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(flower._id)}
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

      {/* Edit Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-7 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-xl text-[#1a2e1a]">Edit Flower</h3>
              <button onClick={() => setIsOpen(false)} className="text-[#4a6a4a] hover:text-[#1a2e1a] text-xl">✕</button>
            </div>
            <form onSubmit={handleUpdate} className="space-y-4">
              {[
                { key: "name", placeholder: "Flower Name", type: "text" },
                { key: "price", placeholder: "Price", type: "number" },
                { key: "image", placeholder: "Image URL", type: "text" },
              ].map(({ key, placeholder, type }) => (
                <input key={key} type={type} placeholder={placeholder} value={form[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  className="w-full border border-[#c8e0d0] px-4 py-3 rounded-xl text-sm text-[#1a2e1a] focus:outline-none focus:border-[#2d5a3d] transition"
                  required
                />
              ))}
              <textarea placeholder="Description" value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="w-full border border-[#c8e0d0] px-4 py-3 rounded-xl text-sm text-[#1a2e1a] focus:outline-none focus:border-[#2d5a3d] transition resize-none"
                rows={3}
              />
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsOpen(false)}
                  className="flex-1 btn-outline py-3 text-[11px]">Cancel</button>
                <button type="submit" disabled={updating}
                  className="flex-1 btn-primary py-3 text-[11px]">
                  {updating ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
