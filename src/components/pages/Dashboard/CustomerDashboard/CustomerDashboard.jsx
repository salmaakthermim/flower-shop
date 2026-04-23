import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaShoppingCart, FaCheckCircle, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

export default function CustomerDashboard() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:5000/orders/customer/${user.email}`)
      .then(r => r.json())
      .then(data => setOrders(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const pending = orders.filter(o => o.orderStatus === "pending").length;
  const delivered = orders.filter(o => o.orderStatus === "delivered").length;
  const totalSpent = orders.reduce((s, o) => s + (o.totalPrice || 0), 0);

  const cards = [
    { title: "Total Orders", value: orders.length, icon: <FaShoppingBag />, bg: "bg-[#fce8ef]", text: "text-[#c0506a]" },
    { title: "Pending", value: pending, icon: <FaClock />, bg: "bg-[#fef9e7]", text: "text-[#b7860b]" },
    { title: "Delivered", value: delivered, icon: <FaCheckCircle />, bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]" },
    { title: "Total Spent", value: `$${totalSpent}`, icon: <FaShoppingCart />, bg: "bg-[#e8f0ea]", text: "text-[#2d5a3d]" },
  ];

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <p className="section-label">Customer</p>
        <h1 className="text-3xl font-serif font-medium text-[#1a2e1a] mt-1">
          Welcome back, {user?.name?.split(" ")[0] || "there"} 🌸
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {cards.map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className={`${c.bg} rounded-2xl p-5 flex items-center gap-4`}>
            <div className={`text-2xl ${c.text}`}>{c.icon}</div>
            <div>
              <p className="text-xs text-[#4a6a4a] tracking-wide">{c.title}</p>
              <p className={`text-2xl font-serif font-medium ${c.text}`}>{c.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#e8f0ea] p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-serif text-lg text-[#1a2e1a]">Recent Orders</h2>
          <Link to="/dashboard/customer/my-orders" className="text-[10px] tracking-widest uppercase text-[#2d5a3d] hover:underline">View All</Link>
        </div>
        {orders.length === 0 ? (
          <div className="text-center py-10 text-[#4a6a4a]">
            <p className="text-3xl mb-2">🌸</p>
            <p className="text-sm">No orders yet. <Link to="/shop" className="text-[#2d5a3d] underline">Shop now</Link></p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.slice(0, 4).map(order => (
              <div key={order._id} className="flex items-center justify-between p-4 bg-[#f0f7f2] rounded-xl">
                <div>
                  <p className="text-sm font-medium text-[#1a2e1a]">#{String(order._id).slice(-6).toUpperCase()}</p>
                  <p className="text-xs text-[#4a6a4a] mt-0.5">{order.products?.length || 0} items</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#2d5a3d]">${order.totalPrice}</p>
                  <span className={`text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full font-medium ${
                    order.orderStatus === "delivered" ? "bg-[#e8f5e9] text-[#2e7d32]" :
                    order.orderStatus === "pending" ? "bg-[#fef9e7] text-[#b7860b]" : "bg-[#e8f0ea] text-[#2d5a3d]"
                  }`}>{order.orderStatus}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
