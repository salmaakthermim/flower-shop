import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";

const statusColors = {
  pending:    "bg-[#fef9e7] text-[#b7860b]",
  processing: "bg-[#e8f0ff] text-[#3b5bdb]",
  delivered:  "bg-[#e8f5e9] text-[#2e7d32]",
  cancelled:  "bg-[#fce8ef] text-[#c0506a]",
};

const steps = ["pending", "processing", "delivered"];

const stepLabels = {
  pending:    { label: "Order Placed",   icon: "📋" },
  processing: { label: "Processing",     icon: "🌸" },
  delivered:  { label: "Delivered",      icon: "✅" },
  cancelled:  { label: "Cancelled",      icon: "❌" },
};

function DeliveryTimeline({ status, estimatedDelivery, deliveredAt, deliveryAddress }) {
  const isCancelled = status === "cancelled";
  const currentStep = isCancelled ? -1 : steps.indexOf(status);

  return (
    <div className="mt-5 pt-5 border-t border-[#e8f0ea]">
      {/* Address */}
      {deliveryAddress && (
        <div className="flex items-start gap-2 mb-5 text-sm text-[#4a6a4a]">
          <FaMapMarkerAlt className="text-[#e8a0b4] mt-0.5 flex-shrink-0" />
          <span>{deliveryAddress}</span>
        </div>
      )}

      {/* Estimated delivery */}
      {estimatedDelivery && status !== "delivered" && status !== "cancelled" && (
        <div className="bg-[#f0f7f2] rounded-xl px-4 py-2.5 mb-5 text-sm text-[#2d5a3d] font-medium">
          🚚 Estimated delivery:{" "}
          {new Date(estimatedDelivery).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
        </div>
      )}

      {/* Timeline */}
      {isCancelled ? (
        <div className="flex items-center gap-3 text-sm text-[#c0506a]">
          <span className="text-xl">❌</span>
          <span className="font-medium">Order Cancelled</span>
        </div>
      ) : (
        <div className="flex items-center gap-0">
          {steps.map((step, i) => {
            const done = i <= currentStep;
            const active = i === currentStep;
            return (
              <div key={step} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-base transition-all ${
                    done ? "bg-[#2d5a3d] text-white shadow-md" : "bg-[#e8f0ea] text-[#4a6a4a]"
                  } ${active ? "ring-4 ring-[#2d5a3d]/20" : ""}`}>
                    {stepLabels[step].icon}
                  </div>
                  <p className={`text-[9px] tracking-wide mt-1.5 text-center whitespace-nowrap ${done ? "text-[#2d5a3d] font-medium" : "text-[#4a6a4a]"}`}>
                    {stepLabels[step].label}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-[2px] mx-1 mb-4 rounded-full transition-all ${i < currentStep ? "bg-[#2d5a3d]" : "bg-[#e8f0ea]"}`} />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Delivered at */}
      {status === "delivered" && deliveredAt && (
        <p className="text-xs text-[#2e7d32] mt-3">
          ✓ Delivered on {new Date(deliveredAt).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
        </p>
      )}
    </div>
  );
}

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?.email) return;
    fetch(`https://flower-shop-server-nu.vercel.app/orders/customer/${user.email}`)
      .then(r => r.json())
      .then(data => setOrders(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const toggle = (id) => setExpanded(e => ({ ...e, [id]: !e[id] }));

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
            <div key={order._id} className="bg-white rounded-2xl border border-[#e8f0ea] shadow-sm overflow-hidden">
              {/* Header */}
              <div className="p-5 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <p className="font-mono text-xs text-[#4a6a4a]">
                    #{String(order._id).slice(-6).toUpperCase()}
                  </p>
                  <p className="text-xs text-[#4a6a4a] mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-medium ${statusColors[order.orderStatus] || "bg-gray-100 text-gray-600"}`}>
                    {order.orderStatus}
                  </span>
                  <span className="font-serif text-lg text-[#1a2e1a]">${order.totalPrice}</span>
                  <button onClick={() => toggle(order._id)} className="text-[#4a6a4a] hover:text-[#1a2e1a] transition">
                    {expanded[order._id] ? <FaChevronUp size={13} /> : <FaChevronDown size={13} />}
                  </button>
                </div>
              </div>

              {/* Expanded content */}
              {expanded[order._id] && (
                <div className="px-5 pb-5 border-t border-[#f0f7f2]">
                  {/* Products */}
                  <div className="flex flex-wrap gap-3 mt-4">
                    {order.products?.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 bg-[#f0f7f2] rounded-xl px-3 py-2">
                        {item.image && <img src={item.image} className="w-8 h-8 rounded-lg object-cover" alt={item.name} />}
                        <div>
                          <p className="text-xs font-medium text-[#1a2e1a]">{item.name}</p>
                          <p className="text-[10px] text-[#4a6a4a]">×{item.qty || item.quantity || 1} · ${item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery timeline */}
                  <DeliveryTimeline
                    status={order.orderStatus}
                    estimatedDelivery={order.estimatedDelivery}
                    deliveredAt={order.deliveredAt}
                    deliveryAddress={order.deliveryAddress}
                  />

                  <div className="mt-4">
                    <Link to={`/order-success/${order._id}`}
                      className="text-[10px] tracking-widest uppercase text-[#2d5a3d] hover:underline font-medium">
                      View Full Details →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
