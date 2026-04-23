import { useState } from "react";
import toast from "react-hot-toast";

export default function AddFlower() {
  const [form, setForm] = useState({ name: "", price: "", image: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (name === "image") setPreview(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/flowers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Flower added successfully");
        setForm({ name: "", price: "", image: "", description: "" });
        setPreview("");
      } else {
        toast.error(data.message || "Failed to add flower");
      }
    } catch { toast.error("Server error"); }
    finally { setLoading(false); }
  };

  return (
    <div className="p-6 md:p-8">
      <div className="mb-7">
        <p className="section-label">Admin</p>
        <h1 className="text-3xl font-serif font-medium text-[#1a2e1a] mt-1">Add New Flower</h1>
      </div>

      <div className="max-w-2xl grid md:grid-cols-2 gap-6">
        {/* Form */}
        <div className="bg-white rounded-2xl p-7 shadow-sm border border-[#e8f0ea]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium block mb-1.5">Flower Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Red Rose"
                className="w-full border border-[#c8e0d0] px-4 py-3 rounded-xl text-sm text-[#1a2e1a] focus:outline-none focus:border-[#2d5a3d] transition"
                required />
            </div>
            <div>
              <label className="text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium block mb-1.5">Price ($) *</label>
              <input name="price" value={form.price} onChange={handleChange} type="number" placeholder="e.g. 29"
                className="w-full border border-[#c8e0d0] px-4 py-3 rounded-xl text-sm text-[#1a2e1a] focus:outline-none focus:border-[#2d5a3d] transition"
                required />
            </div>
            <div>
              <label className="text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium block mb-1.5">Image URL *</label>
              <input name="image" value={form.image} onChange={handleChange} placeholder="https://..."
                className="w-full border border-[#c8e0d0] px-4 py-3 rounded-xl text-sm text-[#1a2e1a] focus:outline-none focus:border-[#2d5a3d] transition"
                required />
            </div>
            <div>
              <label className="text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium block mb-1.5">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Optional description..."
                className="w-full border border-[#c8e0d0] px-4 py-3 rounded-xl text-sm text-[#1a2e1a] focus:outline-none focus:border-[#2d5a3d] transition resize-none"
                rows={3} />
            </div>
            <button type="submit" disabled={loading} className="w-full btn-primary py-3.5 text-[11px] mt-2">
              {loading ? "Adding..." : "Add Flower"}
            </button>
          </form>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-2xl p-7 shadow-sm border border-[#e8f0ea] flex flex-col items-center justify-center">
          {preview ? (
            <>
              <img src={preview} alt="preview" className="w-full h-48 object-cover rounded-xl mb-4" onError={() => setPreview("")} />
              <p className="text-xs text-[#4a6a4a] tracking-wide">Image Preview</p>
            </>
          ) : (
            <div className="text-center text-[#4a6a4a]">
              <p className="text-5xl mb-3">🌸</p>
              <p className="text-sm">Paste an image URL to preview</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
