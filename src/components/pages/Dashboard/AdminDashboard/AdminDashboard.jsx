import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaShoppingCart, FaBoxOpen, FaMoneyBillWave, FaTruck, FaCheckCircle } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const pieColors = ["#e8a0b4", "#6ee7b7", "#fbbf24", "#93c5fd"];

const monthlyData = [
  { month: "Jan", orders: 10 }, { month: "Feb", orders: 15 },
  { month: "Mar", orders: 12 }, { month: "Apr", orders: 18 },
  { month: "May", orders: 20 }, { month: "Jun", orders: 22 },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({ orders: 0, users: 0, flowers: 0, revenue: 0, pending: 0, delivered: 0 });

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/orders").then(r => r.json()),
      fetch("http://localhost:5000/users").then(r => r.json()),
      fetch("http://localhost:5000/flowers").then(r => r.json()),
    ]).then(([orders, users, flowers]) => {
      const revenue = orders.reduce((s, o) => s + (o.totalPrice || 0), 0);
      const pending = orders.filter(o => o.orderStatus === "pending").length;
      const delivered = orders.filter(o => o.orderStatus === "delivered").length;
      setStats({ orders: orders.length, users: users.length, flowers: flowers.length, revenue, pending, delivered });
    }).catch(() => {});
  }, []);

  const cards = [
    { title: "Total Users", value: stats.users, icon: <FaUsers />, bg: "bg-[#e8f0ea]", text: "text-[#2d5a3d]" },
    { title: "Total Orders", value: stats.orders, icon: <FaShoppingCart />, bg: "bg-[#fce8ef]", text: "text-[#c0506a]" },
    { title: "Pending", value: stats.pending, icon: <FaTruck />, bg: "bg-[#fef9e7]", text: "text-[#b7860b]" },
    { title: "Delivered", value: stats.delivered, icon: <FaCheckCircle />, bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]" },
    { title: "Flowers", value: stats.flowers, icon: <FaBoxOpen />, bg: "bg-[#f3e8ff]", text: "text-[#7b3fa0]" },
    { title: "Revenue", value: `$${stats.revenue}`, icon: <FaMoneyBillWave />, bg: "bg-[#e8f0ea]", text: "text-[#2d5a3d]" },
  ];

  const pieData = [
    { name: "Pending", value: stats.pending || 1 },
    { name: "Delivered", value: stats.delivered || 1 },
    { name: "Other", value: Math.max(0, stats.orders - stats.pending - stats.delivered) || 1 },
  ];

  return (
    <div className="p-6 md:p-8 bg-[#f0f7f2] min-h-screen">
      <div className="mb-8">
        <p className="section-label">Admin</p>
        <h1 className="text-3xl font-serif font-medium text-[#1a2e1a] mt-1">Dashboard Overview</h1>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className={`${c.bg} rounded-2xl p-5 flex items-center gap-4`}
          >
            <div className={`text-2xl ${c.text}`}>{c.icon}</div>
            <div>
              <p className="text-xs text-[#4a6a4a] tracking-wide">{c.title}</p>
              <p className={`text-2xl font-serif font-medium ${c.text}`}>{c.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8f0ea]">
          <h3 className="font-serif text-lg text-[#1a2e1a] mb-5">Order Status</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={4} dataKey="value">
                {pieData.map((_, i) => <Cell key={i} fill={pieColors[i]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8f0ea]">
          <h3 className="font-serif text-lg text-[#1a2e1a] mb-5">Monthly Orders</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8f0ea" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="orders" fill="#e8a0b4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
