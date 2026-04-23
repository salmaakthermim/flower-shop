import { useAuth } from "../../../context/AuthContext";
import { motion } from "framer-motion";
import { FaEnvelope, FaUserTag, FaCalendarAlt, FaLeaf } from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();

  // fallback to localStorage if Firebase user not ready
  const localUser = JSON.parse(localStorage.getItem("user") || "{}");
  const name    = user?.name || localUser?.name || "User";
  const email   = user?.email || localUser?.email || "—";
  const avatar  = user?.avatar || localUser?.avatar || null;
  const role    = user?.role || localUser?.role || localStorage.getItem("role") || "customer";
  const initial = name[0]?.toUpperCase() || "U";

  const roleStyle = role === "admin"
    ? "bg-[#f3e8ff] text-[#7b3fa0]"
    : role === "customer"
    ? "bg-[#e8f0ea] text-[#2d5a3d]"
    : "bg-[#fef9e7] text-[#b7860b]";

  const infoItems = [
    { icon: <FaEnvelope size={13} />, label: "Email Address", value: email },
    { icon: <FaUserTag size={13} />, label: "Account Role", value: role },
    { icon: <FaCalendarAlt size={13} />, label: "Member Since", value: "2025" },
  ];

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
          {/* Banner */}
          <div className="h-28 bg-gradient-to-r from-[#2d5a3d] to-[#4a8a5d] relative">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #e8a0b4 0%, transparent 50%), radial-gradient(circle at 80% 20%, #fff 0%, transparent 40%)" }}
            />
            <FaLeaf className="absolute bottom-4 right-6 text-white/20 text-5xl" />
          </div>

          {/* Avatar + name */}
          <div className="px-8 pb-7">
            <div className="flex items-end gap-5 -mt-10 mb-5">
              {avatar ? (
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-lg"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#2d5a3d] flex items-center justify-center text-white font-serif text-3xl ring-4 ring-white shadow-lg">
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
              {infoItems.map(({ icon, label, value }) => (
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

        {/* Account status card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-[#e8f0ea] p-6 flex items-center gap-5"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#e8f5e9] flex items-center justify-center text-[#2e7d32] text-xl flex-shrink-0">
            ✓
          </div>
          <div>
            <p className="font-medium text-[#1a2e1a]">Account Active</p>
            <p className="text-sm text-[#4a6a4a] mt-0.5">Your account is verified and in good standing.</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Profile;
