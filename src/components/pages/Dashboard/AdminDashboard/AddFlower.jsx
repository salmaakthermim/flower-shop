// src/components/admin/AddFlower.jsx
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddFlower() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddFlower = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/flowers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, image, description }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Flower added successfully 🌸");
        setName(""); setPrice(""); setImage(""); setDescription("");
      } else {
        toast.error(data.message || "Failed to add flower ❌");
      }
    } catch (err) {
      console.log(err);
      toast.error("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-2xl rounded-xl p-8">
      <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">Add New Flower</h2>
      <form onSubmit={handleAddFlower} className="space-y-4">
        <input
          type="text"
          placeholder="Flower Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors"
        >
          {loading ? "Adding..." : "Add Flower"}
        </button>
      </form>
    </div>
  );
}
