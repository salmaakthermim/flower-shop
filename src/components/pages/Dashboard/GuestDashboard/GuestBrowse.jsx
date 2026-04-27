import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";

export default function GuestBrowse() {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem("guest_wishlist") || "[]"); }
    catch { return []; }
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/flowers")
      .then(r => r.json())
      .then(d => setFlowers(Array.isArray(d) ? d : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const toggleWishlist = (id) => {
    const updated = wishlist.includes(id)
      ? wishlist.filter(w => w !== id)
      : [...wishlist, id];
    setWishlist(updated);
    localStorage.setItem("guest_wishlist", JSON.stringify(updated));
  };

  const filtered = flowers.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-[#2d5a3d] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="p-6 md:p-8">
      <div className="mb-7">
        <p className="section-label">Guest</p>
        <h1 className="text-3xl font-serif font-medium text-[#1a2e1a] mt-1">Browse Flowers</h1>
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-8">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a6a4a] text-sm" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search flowers..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-[#c8e0d0] rounded-xl text-sm text-[#1a2e1a] focus:outline-none focus:border-[#2d5a3d] transition"
        />
      </div>

      {/* Notice */}
      <div className="bg-[#fef9e7] border border-[#f0d080] rounded-xl px-5 py-3 mb-7 flex items-center gap-3 text-sm text-[#b7860b]">
        <span>⚠️</span>
        <span>You're browsing as a guest. <button onClick={() => navigate("/register")} className="underline font-medium">Register</button> to place orders.</span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[#4a6a4a]">
          <p className="text-3xl mb-2">🌸</p>
          <p>No flowers found for "{search}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((flower, i) => (
            <motion.div
              key={flower._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white rounded-2xl border border-[#e8f0ea] overflow-hidden card-lift group"
            >
              <div className="relative h-48 bg-[#f0f7f2] overflow-hidden">
                <img
                  src={flower.image}
                  alt={flower.name}
                  className="w-full h-full object-contain p-3 group-hover:scale-105 transition duration-500"
                />
                <button
                  onClick={() => toggleWishlist(flower._id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition"
                >
                  {wishlist.includes(flower._id)
                    ? <FaHeart className="text-[#e8a0b4]" />
                    : <FaRegHeart className="text-[#4a6a4a]" />
                  }
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-[#1a2e1a] text-sm truncate">{flower.name}</h3>
                <p className="text-[#2d5a3d] font-semibold mt-0.5">${flower.price}</p>
                <button
                  onClick={() => navigate("/register")}
                  className="mt-3 w-full btn-primary text-[10px] py-2"
                >
                  Login to Order
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
