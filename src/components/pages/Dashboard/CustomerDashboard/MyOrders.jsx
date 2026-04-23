import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const statusColors = {
  pending: "bg-[#fef9e7] text-[#b7860b]",
  processing: "bg-[#e8f0ff] text-[#3b5bdb]",
  delivered: "bg-[#e8f5e9] text-[#2e7d32]",
  cancelled: "bg-[#fce8ef] text-[#c0506a]",
};

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:5000/orders/customer/${user.email}`)
      .then(r => r.json())
      .then(data => setOrders(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-[#2d5a3d] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="p-6 md:p-8">
      <div className="mb-7">
        <p className="section-label">Customer</p>
        <h1 className="text-3xl font-serif font-medium text-[#1a2e1a] mt-1">My Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-[#e8f0ea]">
          <p className="text-4xl mb-3">🌸</p>
          <p className="text-[#4a6a4a] mb-4">You haven't placed any orders yet.</p>
          <Link to="/shop" className="btn-primary text-[11px] py-2.5 px-6">Shop Now</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="bg-white rounded-2xl border border-[#e8f0ea] p-6 shadow-sm">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div>
                  <p className="font-mono text-xs text-[#4a6a4a]">Order #{String(order._id).slice(-6).toUpperCase()}</p>
                  <p className="text-xs text-[#4a6a4a] mt-0.5">{new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-medium ${statusColors[order.orderStatus] || "bg-gray-100 text-gray-600"}`}>
                    {order.orderStatus}
                  </span>
                  <span className="font-serif text-lg text-[#1a2e1a]">${order.totalPrice}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {order.products?.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-[#f0f7f2] rounded-xl px-3 py-2">
                    {item.image && <img src={item.image} className="w-8 h-8 rounded-lg object-cover" alt={item.name} />}
                    <div>
                      <p className="text-xs font-medium text-[#1a2e1a]">{item.name}</p>
                      <p className="text-[10px] text-[#4a6a4a]">×{item.qty || item.quantity || 1}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-[#e8f0ea]">
                <Link to={`/order-success/${order._id}`}
                  className="text-[10px] tracking-widest uppercase text-[#2d5a3d] hover:underline font-medium">
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
