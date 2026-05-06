import { motion } from "framer-motion";
import { useAuth } from "../../../context/AuthContext";
import { FaEnvelope, FaUserTag, FaCalendarAlt, FaLeaf, FaShoppingBag, FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const localUser = JSON.parse(localStorage.getItem("user") || "{}");
  const name   = user?.name   || localUser?.name   || "User";
  const email  = user?.email  || localUser?.email  || "—";
  const avatar = user?.avatar || localUser?.avatar || null;
  const role   = user?.role   || localUser?.role   || localStorage.getItem("role") || "customer";
  const initial = name[0]?.toUpperCase() || "U";

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!email || email === "—") return;
    fetch(`https://flower-shop-server-nu.vercel.app/orders/customer/${email}`)
      .then(r => r.json())
      .then(d => setOrders(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, [email]);

  const roleStyle = role === "admin"
    ? "bg-[#f3e8ff] text-[#7b3fa0]"
    : role === "customer"
    ? "bg-[#e8f0ea] text-[#2d5a3d]"
    : "bg-[#fef9e7] text-[#b7860b]";

  const totalSpent = orders.reduce((s, o) => s + (o.totalPrice || 0), 0);
  const delivered  = orders.filter(o => o.orderStatus === "delivered").length;

  return (
    <div className="p-6 md:p-8 min-h-screen bg-[#f0f7f2]">
      <div className="mb-8">
        <p className="section-label">Account</p>
        <h1 className="text-3xl font-serif font-medium text-[#1a2e1a] mt-1">My Profile</h1>
      </div>

      <div className="max-w-2xl space-y-5">

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-[#e8f0ea] overflow-hidden"
        >
          {/* Banner — pure CSS gradient, no external image */}
          <div className="h-28 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #2d5a3d 0%, #4a8a5d 50%, #6aaa7d 100%)" }}
          >
            <div className="absolute inset-0"
              style={{ backgroundImage: "radial-gradient(circle at 15% 60%, rgba(232,160,180,0.3) 0%, transparent 45%), radial-gradient(circle at 85% 20%, rgba(255,255,255,0.15) 0%, transparent 40%)" }}
            />
            <FaLeaf className="absolute bottom-3 right-5 text-white/15 text-6xl rotate-12" />
            <FaLeaf className="absolute top-3 left-8 text-white/10 text-4xl -rotate-20" />
          </div>

          {/* Avatar + name */}
          <div className="px-7 pb-7">
            <div className="flex items-end gap-5 -mt-10 mb-6">
              {avatar ? (
                <img src={avatar} alt="avatar"
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-lg flex-shrink-0" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#2d5a3d] flex items-center justify-center text-white font-serif text-3xl ring-4 ring-white shadow-lg flex-shrink-0">
                  {initial}
                </div>
              )}
              <div className="pb-1">
                <h2 className="font-serif text-2xl text-[#1a2e1a] leading-tight">{name}</h2>
                <span className={`inline-block mt-1.5 px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-medium ${roleStyle}`}>
                  {role}
                </span>
              </div>
            </div>

            {/* Info rows */}
            <div className="space-y-4 border-t border-[#e8f0ea] pt-6">
              {[
                { icon: <FaEnvelope size={13} />, label: "Email Address", value: email },
                { icon: <FaUserTag size={13} />,  label: "Account Role",  value: role },
                { icon: <FaCalendarAlt size={13} />, label: "Member Since", value: "2025" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#f0f7f2] flex items-center justify-center text-[#2d5a3d] flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium">{label}</p>
                    <p className="text-[#1a2e1a] font-medium text-sm mt-0.5 capitalize">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats row */}
        {role === "customer" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-4"
          >
            {[
              { icon: <FaShoppingBag />, label: "Total Orders", value: orders.length, color: "text-[#c0506a]", bg: "bg-[#fce8ef]" },
              { icon: <FaCheckCircle />, label: "Delivered",    value: delivered,      color: "text-[#2e7d32]", bg: "bg-[#e8f5e9]" },
              { icon: <FaShoppingBag />, label: "Total Spent",  value: `$${totalSpent}`, color: "text-[#2d5a3d]", bg: "bg-[#e8f0ea]" },
            ].map(({ icon, label, value, color, bg }) => (
              <div key={label} className={`${bg} rounded-2xl p-5 text-center`}>
                <div className={`text-xl ${color} flex justify-center mb-2`}>{icon}</div>
                <p className={`text-xl font-serif font-medium ${color}`}>{value}</p>
                <p className="text-[10px] tracking-wide text-[#4a6a4a] mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Account status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl shadow-sm border border-[#e8f0ea] p-6 flex items-center justify-between gap-5"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#e8f5e9] flex items-center justify-center text-[#2e7d32] text-lg flex-shrink-0">✓</div>
            <div>
              <p className="font-medium text-[#1a2e1a]">Account Active</p>
              <p className="text-sm text-[#4a6a4a] mt-0.5">Your account is verified and in good standing.</p>
            </div>
          </div>
          {role === "customer" && (
            <Link to="/dashboard/customer/my-orders" className="btn-outline text-[10px] py-2 px-4 whitespace-nowrap">
              My Orders
            </Link>
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default Profile;
