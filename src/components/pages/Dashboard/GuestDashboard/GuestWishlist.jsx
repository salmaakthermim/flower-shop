import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaTrash } from "react-icons/fa";

export default function GuestWishlist() {
  const [flowers, setFlowers] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem("guest_wishlist") || "[]"); }
    catch { return []; }
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (wishlist.length === 0) { setLoading(false); return; }
    fetch("https://flower-shop-server-nu.vercel.app/flowers")
      .then(r => r.json())
      .then(d => setFlowers(Array.isArray(d) ? d.filter(f => wishlist.includes(f._id)) : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const remove = (id) => {
    const updated = wishlist.filter(w => w !== id);
    setWishlist(updated);
    setFlowers(f => f.filter(x => x._id !== id));
    localStorage.setItem("guest_wishlist", JSON.stringify(updated));
  };

  const clearAll = () => {
    setWishlist([]);
    setFlowers([]);
    localStorage.removeItem("guest_wishlist");
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-[#2d5a3d] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-start justify-between mb-7">
        <div>
          <p className="section-label">Guest</p>
          <h1 className="text-3xl font-serif font-medium text-[#1a2e1a] mt-1 flex items-center gap-3">
            My Wishlist <FaHeart className="text-[#e8a0b4] text-2xl" />
          </h1>
        </div>
        {flowers.length > 0 && (
          <button onClick={clearAll} className="text-[10px] tracking-widest uppercase text-[#c0506a] hover:underline font-medium mt-2">
            Clear All
          </button>
        )}
      </div>

      {flowers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e8f0ea] p-16 text-center">
          <p className="text-5xl mb-4">🤍</p>
          <p className="font-serif text-xl text-[#1a2e1a] mb-2">Your wishlist is empty</p>
          <p className="text-sm text-[#4a6a4a] mb-6">Browse flowers and tap the heart icon to save your favourites.</p>
          <button onClick={() => navigate("/dashboard/guest/browse")} className="btn-primary text-[10px] py-2.5 px-6">
            Browse Flowers
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8">
            {flowers.map((flower, i) => (
              <motion.div
                key={flower._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl border border-[#e8f0ea] overflow-hidden card-lift group"
              >
                <div className="relative h-44 bg-[#f0f7f2] overflow-hidden">
                  <img src={flower.image} alt={flower.name}
                    className="w-full h-full object-contain p-3 group-hover:scale-105 transition duration-500" />
                  <button onClick={() => remove(flower._id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-[#fce8ef] transition">
                    <FaTrash className="text-[#c0506a] text-xs" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-[#1a2e1a] text-sm truncate">{flower.name}</h3>
                  <p className="text-[#2d5a3d] font-semibold mt-0.5">${flower.price}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-[#f0f7f2] border border-[#c8e0d0] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-medium text-[#1a2e1a]">Ready to order?</p>
              <p className="text-sm text-[#4a6a4a] mt-0.5">Create an account to place orders for your saved flowers.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => navigate("/register")} className="btn-primary text-[10px] py-2.5 px-5">Register</button>
              <button onClick={() => navigate("/login")} className="btn-outline text-[10px] py-2.5 px-5">Login</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
