import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FaTruck, FaMapMarkerAlt } from "react-icons/fa";

const statusColors = {
  pending:    "bg-[#fef9e7] text-[#b7860b]",
  processing: "bg-[#e8f0ff] text-[#3b5bdb]",
  delivered:  "bg-[#e8f5e9] text-[#2e7d32]",
  cancelled:  "bg-[#fce8ef] text-[#c0506a]",
};

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [deliveryModal, setDeliveryModal] = useState(null);
  const [deliveryForm, setDeliveryForm] = useState({ deliveryAddress: "", deliveryNote: "", estimatedDelivery: "" });
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch("https://flower-shop-server-nu.vercel.app/orders");
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch { toast.error("Failed to load orders"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusUpdate = async (id, status) => {
    const res = await fetch(`https://flower-shop-server-nu.vercel.app/orders/${id}/status`, {
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
    const res = await fetch(`https://flower-shop-server-nu.vercel.app/orders/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Order deleted"); setOrders(prev => prev.filter(o => o._id !== id)); }
  };

  const openDelivery = (order) => {
    setDeliveryModal(order);
    setDeliveryForm({
      deliveryAddress: order.deliveryAddress || "",
      deliveryNote: order.deliveryNote || "",
      estimatedDelivery: order.estimatedDelivery
        ? new Date(order.estimatedDelivery).toISOString().split("T")[0]
        : "",
    });
  };

  const handleDeliveryUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://flower-shop-server-nu.vercel.app/orders/${deliveryModal._id}/delivery`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deliveryForm),
    });
    if (res.ok) {
      toast.success("Delivery info updated");
      setDeliveryModal(null);
      fetchOrders();
    } else {
      toast.error("Update failed");
    }
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

      {/* Stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
        {[
          { label: "Total", value: orders.length, color: "text-[#1a2e1a]", bg: "bg-white" },
          { label: "Pending", value: orders.filter(o => o.orderStatus === "pending").length, color: "text-[#b7860b]", bg: "bg-[#fef9e7]" },
          { label: "Processing", value: orders.filter(o => o.orderStatus === "processing").length, color: "text-[#3b5bdb]", bg: "bg-[#e8f0ff]" },
          { label: "Delivered", value: orders.filter(o => o.orderStatus === "delivered").length, color: "text-[#2e7d32]", bg: "bg-[#e8f5e9]" },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-2xl border border-[#e8f0ea] p-4 text-center`}>
            <p className={`text-2xl font-serif font-medium ${s.color}`}>{s.value}</p>
            <p className="text-[10px] tracking-widest uppercase text-[#4a6a4a] mt-0.5">{s.label}</p>
          </div>
        ))}
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
                  {["Order ID", "Customer", "Address", "Total", "Status", "Actions"].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b border-[#f0f7f2] hover:bg-[#fafffe] transition">
                    <td className="px-5 py-4 font-mono text-xs text-[#4a6a4a]">
                      #{String(order._id).slice(-6).toUpperCase()}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-[#1a2e1a]">{order.customer?.name}</p>
                      <p className="text-xs text-[#4a6a4a]">{order.customer?.phone}</p>
                    </td>
                    <td className="px-5 py-4 max-w-[160px]">
                      {order.deliveryAddress ? (
                        <div className="flex items-start gap-1.5">
                          <FaMapMarkerAlt className="text-[#e8a0b4] mt-0.5 flex-shrink-0 text-xs" />
                          <p className="text-xs text-[#4a6a4a] truncate">{order.deliveryAddress}</p>
                        </div>
                      ) : (
                        <span className="text-xs text-[#4a6a4a]/50 italic">Not set</span>
                      )}
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
                        <button onClick={() => openDelivery(order)}
                          className="px-3 py-1.5 bg-[#e8f0ff] text-[#3b5bdb] text-[10px] tracking-widest uppercase rounded-lg hover:bg-[#3b5bdb] hover:text-white transition font-medium flex items-center gap-1">
                          <FaTruck size={10} /> Delivery
                        </button>
                        <select
                          value={order.orderStatus}
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

      {/* View Modal */}
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
            <div className="space-y-2 text-sm text-[#4a6a4a] mb-4">
              <p><span className="text-[#1a2e1a] font-medium">Name:</span> {selected.customer?.name}</p>
              <p><span className="text-[#1a2e1a] font-medium">Email:</span> {selected.customer?.email}</p>
              <p><span className="text-[#1a2e1a] font-medium">Phone:</span> {selected.customer?.phone}</p>
              {selected.deliveryAddress && (
                <p><span className="text-[#1a2e1a] font-medium">Address:</span> {selected.deliveryAddress}</p>
              )}
              {selected.estimatedDelivery && (
                <p><span className="text-[#1a2e1a] font-medium">Est. Delivery:</span>{" "}
                  {new Date(selected.estimatedDelivery).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                </p>
              )}
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

      {/* Delivery Modal */}
      {deliveryModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-7 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-serif text-xl text-[#1a2e1a] flex items-center gap-2">
                  <FaTruck className="text-[#3b5bdb]" /> Delivery Info
                </h3>
                <p className="text-xs text-[#4a6a4a] mt-0.5">#{String(deliveryModal._id).slice(-6).toUpperCase()} · {deliveryModal.customer?.name}</p>
              </div>
              <button onClick={() => setDeliveryModal(null)} className="text-[#4a6a4a] hover:text-[#1a2e1a] text-xl">✕</button>
            </div>
            <form onSubmit={handleDeliveryUpdate} className="space-y-4">
              <div>
                <label className="text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium block mb-1.5">Delivery Address</label>
                <input
                  value={deliveryForm.deliveryAddress}
                  onChange={e => setDeliveryForm(f => ({ ...f, deliveryAddress: e.target.value }))}
                  placeholder="Full delivery address"
                  className="w-full border border-[#c8e0d0] px-4 py-3 rounded-xl text-sm text-[#1a2e1a] focus:outline-none focus:border-[#2d5a3d] transition"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium block mb-1.5">Estimated Delivery Date</label>
                <input
                  type="date"
                  value={deliveryForm.estimatedDelivery}
                  onChange={e => setDeliveryForm(f => ({ ...f, estimatedDelivery: e.target.value }))}
                  className="w-full border border-[#c8e0d0] px-4 py-3 rounded-xl text-sm text-[#1a2e1a] focus:outline-none focus:border-[#2d5a3d] transition"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium block mb-1.5">Delivery Note</label>
                <textarea
                  value={deliveryForm.deliveryNote}
                  onChange={e => setDeliveryForm(f => ({ ...f, deliveryNote: e.target.value }))}
                  placeholder="e.g. Leave at door, ring bell..."
                  rows={2}
                  className="w-full border border-[#c8e0d0] px-4 py-3 rounded-xl text-sm text-[#1a2e1a] focus:outline-none focus:border-[#2d5a3d] transition resize-none"
                />
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setDeliveryModal(null)} className="flex-1 btn-outline py-3 text-[11px]">Cancel</button>
                <button type="submit" className="flex-1 btn-primary py-3 text-[11px]">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
