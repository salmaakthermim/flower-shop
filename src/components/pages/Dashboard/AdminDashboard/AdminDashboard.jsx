import { motion } from "framer-motion";
import {
  FaUsers,
  FaShoppingCart,
  FaBoxOpen,
  FaMoneyBillWave,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaChartLine,
} from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function AdminDashboard() {
  const cards = [
    {
      title: "Total Customers",
      value: "120",
      icon: <FaUsers size={24} />,
      color: "from-pink-400 to-rose-300",
    },
    {
      title: "Total Orders",
      value: "85",
      icon: <FaShoppingCart size={24} />,
      color: "from-fuchsia-400 to-pink-300",
    },
    {
      title: "Pending Orders",
      value: "12",
      icon: <FaTruck size={24} />,
      color: "from-yellow-300 to-amber-200",
    },
    {
      title: "Delivered Orders",
      value: "60",
      icon: <FaCheckCircle size={24} />,
      color: "from-green-500 to-emerald-400",
    },
    {
      title: "Cancelled Orders",
      value: "5",
      icon: <FaTimesCircle size={24} />,
      color: "from-rose-400 to-red-300",
    },
    {
      title: "Total Products",
      value: "40",
      icon: <FaBoxOpen size={24} />,
      color: "from-emerald-400 to-green-300",
    },
    {
      title: "Monthly Orders",
      value: "22",
      icon: <FaChartLine size={24} />,
      color: "from-purple-400 to-pink-300",
    },
    {
      title: "Total Revenue",
      value: "$5,240",
      icon: <FaMoneyBillWave size={24} />,
      color: "from-green-400 to-emerald-300",
    },
  ];

  // 🍩 Order Status Pie Chart
  const orderStatusData = [
    { name: "Pending", value: 12 },
    { name: "Delivered", value: 60 },
    { name: "Cancelled", value: 5 },
    { name: "Processing", value: 8 },
  ];

  const pieColors = ["#fbbf24", "#6ee7b7", "#fda4af", "#c4b5fd"];

  // 📊 Monthly Orders Bar Chart
  const monthlyOrderData = [
    { month: "Jan", orders: 10 },
    { month: "Feb", orders: 15 },
    { month: "Mar", orders: 12 },
    { month: "Apr", orders: 18 },
    { month: "May", orders: 20 },
    { month: "Jun", orders: 22 },
  ];

  return (
    <div className="p-8 bg-rose-50 min-h-screen">
      <h2 className="text-4xl font-bold text-rose-500 mb-10">
        🌸 Flower Shop Admin Dashboard
      </h2>

      {/* CARDS */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-14">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`bg-gradient-to-r ${card.color} text-white rounded-2xl p-6 shadow-lg`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-90">{card.title}</p>
                <h3 className="text-2xl font-bold mt-1">{card.value}</h3>
              </div>
              <div className="opacity-90">{card.icon}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🍩 PIE CHART - ORDER STATUS */}
      <div className="bg-white p-8 rounded-2xl shadow-md mb-14">
        <h3 className="text-2xl font-semibold text-rose-400 mb-6">
          🌷 Order Status Overview
        </h3>

        <div className="w-full h-96">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%"
                cy="50%"
                innerRadius={90}
                outerRadius={140}
                paddingAngle={5}
                dataKey="value"
              >
                {orderStatusData.map((entry, index) => (
                  <Cell key={index} fill={pieColors[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 📊 BAR CHART - MONTHLY ORDERS */}
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h3 className="text-2xl font-semibold text-emerald-400 mb-6">
          🌿 Monthly Orders
        </h3>

        <div className="w-full h-96">
          <ResponsiveContainer>
            <BarChart data={monthlyOrderData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="orders"
                fill="#f472b6"
                radius={[12, 12, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    

    )}
