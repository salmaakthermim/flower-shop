import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaHeart, FaRegHeart, FaTh, FaList, FaSlidersH } from "react-icons/fa";
import toast from "react-hot-toast";

const CATEGORIES = ["All", "Rose", "Tulip", "Lily", "Orchid", "Sunflower", "Bouquet", "Seasonal"];
const OCCASIONS  = ["All", "Wedding", "Birthday", "Valentine", "Mother's Day", "Funeral", "Party"];

export default function AllFlowers() {
  const [flowers, setFlowers]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [sort, setSort]           = useState("default");
  const [category, setCategory]   = useState("All");
  const [occasion, setOccasion]   = useState("All");
  const [maxPrice, setMaxPrice]   = useState(500);
  const [view, setView]           = useState("grid");
  const [wishlist, setWishlist]   = useState(() => {
    try { return JSON.parse(localStorage.getItem("wishlist") || "[]"); } catch { return []; }
  });
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://flower-shop-server-nu.vercel.app/flowers")
      .then(r => r.json())
      .then(d => { setFlowers(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let list = [...flowers];
    if (search.trim()) list = list.filter(f =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.description?.toLowerCase().includes(search.toLowerCase())
    );
    if (category !== "All") list = list.filter(f =>
      f.name.toLowerCase().includes(category.toLowerCase()) ||
      f.description?.toLowerCase().includes(category.toLowerCase())
    );
    if (occasion !== "All") list = list.filter(f =>
      f.description?.toLowerCase().includes(occasion.toLowerCase())
    );
    list = list.filter(f => f.price <= maxPrice);
    if (sort === "low")  list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [flowers, search, category, occasion, maxPrice, sort]);

  const toggleWishlist = (id) => {
    const updated = wishlist.includes(id) ? wishlist.filter(w => w !== id) : [...wishlist, id];
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    toast.success(wishlist.includes(id) ? "Removed from wishlist" : "Added to wishlist 🌸");
  };

  const addToCart = async (flower) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.email) { toast.error("Please login first"); navigate("/login"); return; }
    await fetch("https://flower-shop-server-nu.vercel.app/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email, productId: flower._id, name: flower.name, price: flower.price, image: flower.image, quantity: 1 }),
    });
    toast.success("Added to cart 🛒");
  };

  const resetFilters = () => { setSearch(""); setCategory("All"); setOccasion("All"); setMaxPrice(500); setSort("default"); };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-2 border-[#2d5a3d] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <section className="min-h-screen bg-[#fffdf9]">

      {/* Banner */}
      <div className="relative h-48 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #2d5a3d 0%, #4a8a5d 60%, #6aaa7d 100%)" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 15% 60%, rgba(232,160,180,0.3) 0%, transparent 45%)" }} />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#e8a0b4] mb-2">Our Collection</p>
          <h1 className="text-4xl font-serif font-medium text-white">Flower Shop</h1>
          <p className="text-white/60 text-sm mt-2">{filtered.length} flowers available</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Top bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a6a4a] text-sm" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search flowers..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-[#c8e0d0] rounded-xl text-sm text-[#1a2e1a] focus:outline-none focus:border-[#2d5a3d] transition" />
          </div>

          {/* Sort */}
          <select value={sort} onChange={e => setSort(e.target.value)}
            className="border border-[#c8e0d0] px-4 py-3 rounded-xl text-sm text-[#1a2e1a] bg-white focus:outline-none focus:border-[#2d5a3d]">
            <option value="default">Sort: Default</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
            <option value="name">Name: A → Z</option>
          </select>

          {/* Filter toggle */}
          <button onClick={() => setShowFilters(s => !s)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition ${showFilters ? "bg-[#2d5a3d] text-white border-[#2d5a3d]" : "bg-white border-[#c8e0d0] text-[#1a2e1a]"}`}>
            <FaSlidersH size={13} /> Filters
          </button>

          {/* View toggle */}
          <div className="flex border border-[#c8e0d0] rounded-xl overflow-hidden">
            <button onClick={() => setView("grid")} className={`px-3 py-3 transition ${view === "grid" ? "bg-[#2d5a3d] text-white" : "bg-white text-[#4a6a4a]"}`}><FaTh size={13} /></button>
            <button onClick={() => setView("list")} className={`px-3 py-3 transition ${view === "list" ? "bg-[#2d5a3d] text-white" : "bg-white text-[#4a6a4a]"}`}><FaList size={13} /></button>
          </div>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#e8f0ea] rounded-2xl p-6 mb-6 grid sm:grid-cols-3 gap-5">
            <div>
              <p className="text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium mb-3">Category</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(c => (
                  <button key={c} onClick={() => setCategory(c)}
                    className={`px-3 py-1.5 rounded-full text-[11px] tracking-wide font-medium transition ${category === c ? "bg-[#2d5a3d] text-white" : "bg-[#f0f7f2] text-[#4a6a4a] hover:bg-[#2d5a3d] hover:text-white"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium mb-3">Occasion</p>
              <div className="flex flex-wrap gap-2">
                {OCCASIONS.map(o => (
                  <button key={o} onClick={() => setOccasion(o)}
                    className={`px-3 py-1.5 rounded-full text-[11px] tracking-wide font-medium transition ${occasion === o ? "bg-[#e8a0b4] text-white" : "bg-[#fce8ef] text-[#c0506a] hover:bg-[#e8a0b4] hover:text-white"}`}>
                    {o}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium mb-3">Max Price: <span className="text-[#2d5a3d] font-semibold">${maxPrice}</span></p>
              <input type="range" min={10} max={500} step={10} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#2d5a3d]" />
              <div className="flex justify-between text-xs text-[#4a6a4a] mt-1"><span>$10</span><span>$500</span></div>
              <button onClick={resetFilters} className="mt-3 text-[10px] tracking-widest uppercase text-[#c0506a] hover:underline">Reset All</button>
            </div>
          </motion.div>
        )}

        {/* Category pills (quick filter) */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-[11px] tracking-wide font-medium transition ${category === c ? "bg-[#2d5a3d] text-white" : "bg-white border border-[#c8e0d0] text-[#4a6a4a] hover:border-[#2d5a3d]"}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">🌸</p>
            <p className="text-[#4a6a4a] mb-4">No flowers found.</p>
            <button onClick={resetFilters} className="btn-primary text-[11px] py-2.5 px-6">Clear Filters</button>
          </div>
        ) : view === "grid" ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((flower, i) => (
              <motion.div key={flower._id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white rounded-2xl border border-[#e8f0ea] overflow-hidden card-lift group">
                <div className="relative h-52 bg-[#f0f7f2] overflow-hidden">
                  <Link to={`/flower/${flower._id}`}>
                    <img src={flower.image} alt={flower.name} className="w-full h-full object-contain p-3 group-hover:scale-105 transition duration-500" />
                  </Link>
                  <button onClick={() => toggleWishlist(flower._id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition">
                    {wishlist.includes(flower._id) ? <FaHeart className="text-[#e8a0b4]" /> : <FaRegHeart className="text-[#4a6a4a]" />}
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-[#1a2e1a] truncate">{flower.name}</h3>
                  <p className="text-[#2d5a3d] font-semibold mt-0.5">${flower.price}</p>
                  <div className="flex gap-2 mt-3">
                    <Link to={`/flower/${flower._id}`} className="flex-1 text-center btn-outline text-[10px] py-2">Details</Link>
                    <button onClick={() => addToCart(flower)} className="flex-1 btn-primary text-[10px] py-2">Add to Cart</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((flower, i) => (
              <motion.div key={flower._id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                className="bg-white rounded-2xl border border-[#e8f0ea] p-4 flex items-center gap-5 card-lift">
                <img src={flower.image} alt={flower.name} className="w-20 h-20 rounded-xl object-contain bg-[#f0f7f2] p-2 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-medium text-[#1a2e1a]">{flower.name}</h3>
                  <p className="text-sm text-[#4a6a4a] mt-0.5 line-clamp-1">{flower.description || "Fresh handcrafted flower"}</p>
                  <p className="text-[#2d5a3d] font-semibold mt-1">${flower.price}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => toggleWishlist(flower._id)} className="w-9 h-9 border border-[#c8e0d0] rounded-xl flex items-center justify-center hover:border-[#e8a0b4] transition">
                    {wishlist.includes(flower._id) ? <FaHeart className="text-[#e8a0b4]" size={13} /> : <FaRegHeart className="text-[#4a6a4a]" size={13} />}
                  </button>
                  <Link to={`/flower/${flower._id}`} className="btn-outline text-[10px] py-2 px-4">Details</Link>
                  <button onClick={() => addToCart(flower)} className="btn-primary text-[10px] py-2 px-4">Add to Cart</button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
