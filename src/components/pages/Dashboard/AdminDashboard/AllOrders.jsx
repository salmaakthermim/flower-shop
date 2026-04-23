import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const statusColors = {
  pending: "bg-[#fef9e7] text-[#b7860b]",
  processing: "bg-[#e8f0ff] text-[#3b5bdb]",
  delivered: "bg-[#e8f5e9] text-[#2e7d32]",
  cancelled: "bg-[#fce8ef] text-[#c0506a]",
};

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/orders");
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch { toast.error("Failed to load orders"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusUpdate = async (id, status) => {
    const res = await fetch(`http://localhost:5000/orders/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderStatus: status }),
    });
    if (res.ok) {
      toast.success("Status updated");
      setOrders(prev => prev.map(o => o._id === id ? { ...o, orderStatus: status } : o));
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this order?", icon: "warning",
      showCancelButton: true, confirmButtonColor: "#e8a0b4",
      cancelButtonColor: "#6b7280", confirmButtonText: "Delete",
    });
    if (!result.isConfirmed) return;
    const res = await fetch(`http://localhost:5000/orders/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Order deleted"); setOrders(prev => prev.filter(o => o._id !== id)); }
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
        <h1 className="text-3xl font-serif font-medium text-[#1a2e1a] mt-1">All Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-[#e8f0ea]">
          <p className="text-4xl mb-3">📦</p>
          <p className="text-[#4a6a4a]">No orders yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8f0ea] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-[#f0f7f2] border-b border-[#e8f0ea]">
                  {["Order ID", "Customer", "Total", "Status", "Actions"].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b border-[#f0f7f2] hover:bg-[#fafffe] transition">
                    <td className="px-5 py-4 font-mono text-xs text-[#4a6a4a]">#{String(order._id).slice(-6).toUpperCase()}</td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-[#1a2e1a]">{order.customer?.name}</p>
                      <p className="text-xs text-[#4a6a4a]">{order.customer?.email}</p>
                    </td>
                    <td className="px-5 py-4 font-semibold text-[#2d5a3d]">${order.totalPrice}</td>
                    <td className="px-5 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-medium ${statusColors[order.orderStatus] || "bg-gray-100 text-gray-600"}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <button onClick={() => setSelected(order)}
                          className="px-3 py-1.5 bg-[#f0f7f2] text-[#2d5a3d] text-[10px] tracking-widest uppercase rounded-lg hover:bg-[#2d5a3d] hover:text-white transition font-medium">
                          View
                        </button>
                        <select
                          defaultValue={order.orderStatus}
                          onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                          className="px-2 py-1.5 border border-[#e8f0ea] rounded-lg text-xs text-[#1a2e1a] bg-white focus:outline-none focus:border-[#2d5a3d]"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <button onClick={() => handleDelete(order._id)}
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
      )}

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-7 shadow-2xl">
            <div className="flex justify-between items-start mb-5">
              <div>
                <h3 className="font-serif text-xl text-[#1a2e1a]">Order Details</h3>
                <p className="text-xs text-[#4a6a4a] mt-0.5">#{String(selected._id).slice(-6).toUpperCase()}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-[#4a6a4a] hover:text-[#1a2e1a] text-xl">✕</button>
            </div>
            <div className="space-y-2 text-sm text-[#4a6a4a] mb-5">
              <p><span className="text-[#1a2e1a] font-medium">Name:</span> {selected.customer?.name}</p>
              <p><span className="text-[#1a2e1a] font-medium">Email:</span> {selected.customer?.email}</p>
              <p><span className="text-[#1a2e1a] font-medium">Phone:</span> {selected.customer?.phone}</p>
            </div>
            <div className="border-t border-[#e8f0ea] pt-4 space-y-3">
              {selected.products?.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  {p.image && <img src={p.image} className="w-10 h-10 rounded-lg object-cover bg-[#f0f7f2]" alt={p.name} />}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1a2e1a]">{p.name}</p>
                    <p className="text-xs text-[#4a6a4a]">×{p.qty || p.quantity || 1}</p>
                  </div>
                  <p className="text-sm font-semibold text-[#2d5a3d]">${p.price}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-5 pt-4 border-t border-[#e8f0ea]">
              <span className="text-[#4a6a4a] text-sm">Total</span>
              <span className="font-serif text-xl text-[#1a2e1a]">${selected.totalPrice}</span>
            </div>
            <button onClick={() => setSelected(null)} className="mt-5 w-full btn-primary py-3 text-[11px]">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
