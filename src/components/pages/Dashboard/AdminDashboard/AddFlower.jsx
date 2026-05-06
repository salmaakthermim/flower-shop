import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaLeaf, FaImage, FaTag, FaAlignLeft, FaCheckCircle } from "react-icons/fa";

const CATEGORIES = ["Rose", "Tulip", "Lily", "Orchid", "Sunflower", "Bouquet", "Seasonal", "Other"];
const OCCASIONS  = ["Wedding", "Birthday", "Valentine", "Mother's Day", "Funeral", "Party", "General"];

export default function AddFlower() {
  const [form, setForm] = useState({
    name: "", price: "", image: "", description: "", category: "", occasion: "",
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [imgError, setImgError] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    if (key === "image") { setPreview(val); setImgError(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.image) {
      toast.error("Name, price and image are required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("https://flower-shop-server-nu.vercel.app/flowers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        toast.success("Flower added! 🌸");
        setTimeout(() => {
          setForm({ name: "", price: "", image: "", description: "", category: "", occasion: "" });
          setPreview("");
          setSuccess(false);
        }, 2000);
      } else {
        toast.error(data.message || "Failed to add flower");
      }
    } catch { toast.error("Server error"); }
    finally { setLoading(false); }
  };

  return (
    <div className="p-6 md:p-8 min-h-screen bg-[#f0f7f2]">
      {/* Header */}
      <div className="mb-8">
        <p className="section-label">Admin</p>
        <h1 className="text-3xl font-serif font-medium text-[#1a2e1a] mt-1">Add New Flower</h1>
        <p className="text-sm text-[#4a6a4a] mt-1">Fill in the details to add a new flower to the shop.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6 max-w-5xl">

        {/* ── Form ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3 bg-white rounded-2xl border border-[#e8f0ea] shadow-sm overflow-hidden"
        >
          {/* Card header */}
          <div className="px-7 py-5 border-b border-[#e8f0ea] flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#f0f7f2] flex items-center justify-center text-[#2d5a3d]">
              <FaLeaf size={14} />
            </div>
            <p className="font-medium text-[#1a2e1a]">Flower Details</p>
          </div>

          <form onSubmit={handleSubmit} className="p-7 space-y-5">

            {/* Name */}
            <div>
              <label className="text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium block mb-1.5">
                Flower Name *
              </label>
              <div className="relative">
                <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a6a4a] text-xs" />
                <input
                  value={form.name}
                  onChange={e => set("name", e.target.value)}
                  placeholder="e.g. Red Rose Bouquet"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-[#c8e0d0] rounded-xl text-sm text-[#1a2e1a] focus:outline-none focus:border-[#2d5a3d] transition placeholder-[#8aaa8a]"
                />
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium block mb-1.5">
                Price (USD) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a6a4a] text-sm font-medium">$</span>
                <input
                  type="number"
                  min="1"
                  value={form.price}
                  onChange={e => set("price", e.target.value)}
                  placeholder="29"
                  required
                  className="w-full pl-8 pr-4 py-3 border border-[#c8e0d0] rounded-xl text-sm text-[#1a2e1a] focus:outline-none focus:border-[#2d5a3d] transition placeholder-[#8aaa8a]"
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium block mb-1.5">
                Image URL *
              </label>
              <div className="relative">
                <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a6a4a] text-xs" />
                <input
                  value={form.image}
                  onChange={e => set("image", e.target.value)}
                  placeholder="https://example.com/flower.jpg"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-[#c8e0d0] rounded-xl text-sm text-[#1a2e1a] focus:outline-none focus:border-[#2d5a3d] transition placeholder-[#8aaa8a]"
                />
              </div>
              <p className="text-[10px] text-[#4a6a4a] mt-1.5">Paste a direct image URL — preview will appear on the right.</p>
            </div>

            {/* Category + Occasion */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium block mb-1.5">Category</label>
                <select value={form.category} onChange={e => set("category", e.target.value)}
                  className="w-full border border-[#c8e0d0] px-4 py-3 rounded-xl text-sm text-[#1a2e1a] bg-white focus:outline-none focus:border-[#2d5a3d] transition">
                  <option value="">Select category</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium block mb-1.5">Occasion</label>
                <select value={form.occasion} onChange={e => set("occasion", e.target.value)}
                  className="w-full border border-[#c8e0d0] px-4 py-3 rounded-xl text-sm text-[#1a2e1a] bg-white focus:outline-none focus:border-[#2d5a3d] transition">
                  <option value="">Select occasion</option>
                  {OCCASIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium block mb-1.5">
                Description
              </label>
              <div className="relative">
                <FaAlignLeft className="absolute left-4 top-4 text-[#4a6a4a] text-xs" />
                <textarea
                  value={form.description}
                  onChange={e => set("description", e.target.value)}
                  placeholder="Describe the flower — color, fragrance, occasion..."
                  rows={4}
                  className="w-full pl-10 pr-4 py-3 border border-[#c8e0d0] rounded-xl text-sm text-[#1a2e1a] focus:outline-none focus:border-[#2d5a3d] transition resize-none placeholder-[#8aaa8a]"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || success}
              className={`w-full py-4 text-[11px] tracking-[0.18em] uppercase font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                success
                  ? "bg-[#e8f5e9] text-[#2e7d32] border border-[#c8e0d0]"
                  : "btn-primary"
              }`}
            >
              {success ? (
                <><FaCheckCircle /> Flower Added!</>
              ) : loading ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Adding...</>
              ) : (
                <><FaLeaf size={12} /> Add Flower</>
              )}
            </button>
          </form>
        </motion.div>

        {/* ── Preview ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-4"
        >
          {/* Image preview card */}
          <div className="bg-white rounded-2xl border border-[#e8f0ea] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#e8f0ea]">
              <p className="text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium">Live Preview</p>
            </div>

            {/* Image area */}
            <div className="h-52 bg-[#f0f7f2] flex items-center justify-center overflow-hidden">
              {preview && !imgError ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-contain p-4"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="text-center text-[#4a6a4a]">
                  <FaImage size={32} className="mx-auto mb-2 opacity-30" />
                  <p className="text-xs">{imgError ? "Invalid image URL" : "Paste an image URL to preview"}</p>
                </div>
              )}
            </div>

            {/* Product card preview */}
            <div className="p-5">
              <p className="font-medium text-[#1a2e1a] truncate">{form.name || "Flower Name"}</p>
              <p className="text-[#2d5a3d] font-semibold mt-0.5">{form.price ? `$${form.price}` : "$—"}</p>
              {(form.category || form.occasion) && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {form.category && (
                    <span className="px-2 py-0.5 bg-[#e8f0ea] text-[#2d5a3d] text-[10px] tracking-wide rounded-full">{form.category}</span>
                  )}
                  {form.occasion && (
                    <span className="px-2 py-0.5 bg-[#fce8ef] text-[#c0506a] text-[10px] tracking-wide rounded-full">{form.occasion}</span>
                  )}
                </div>
              )}
              {form.description && (
                <p className="text-xs text-[#4a6a4a] mt-2 line-clamp-2 leading-relaxed">{form.description}</p>
              )}
            </div>
          </div>

          {/* Tips card */}
          <div className="bg-[#f0f7f2] rounded-2xl border border-[#c8e0d0] p-5">
            <p className="text-[10px] tracking-widest uppercase text-[#2d5a3d] font-medium mb-3">Tips</p>
            <ul className="space-y-2 text-xs text-[#4a6a4a] leading-relaxed">
              <li className="flex items-start gap-2"><span className="text-[#e8a0b4] mt-0.5">✦</span> Use high-quality images (min 400×400px)</li>
              <li className="flex items-start gap-2"><span className="text-[#e8a0b4] mt-0.5">✦</span> Set a clear category for better filtering</li>
              <li className="flex items-start gap-2"><span className="text-[#e8a0b4] mt-0.5">✦</span> Add occasion to help customers find the right flower</li>
              <li className="flex items-start gap-2"><span className="text-[#e8a0b4] mt-0.5">✦</span> Write a descriptive text to boost discoverability</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
