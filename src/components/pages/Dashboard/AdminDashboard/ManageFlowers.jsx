import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function ManageFlowers() {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);

  // edit modal states
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [updating, setUpdating] = useState(false);

  // fetch flowers
  const fetchFlowers = async () => {
    try {
      const res = await fetch("http://localhost:5000/flowers");
      const data = await res.json();
      setFlowers(data);
    } catch (err) {
      toast.error("Failed to load flowers ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlowers();
  }, []);

// delete flower with SweetAlert
const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This flower will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ec4899", // pink
      cancelButtonColor: "#6b7280",  // gray
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
  
    if (!result.isConfirmed) return;
  
    try {
      const res = await fetch(`http://localhost:5000/flowers/${id}`, {
        method: "DELETE",
      });
  
      if (res.ok) {
        toast.success("Flower deleted 🌸");
        setFlowers(flowers.filter((f) => f._id !== id));
      } else {
        toast.error("Delete failed ❌");
      }
    } catch (error) {
      toast.error("Server error ❌");
    }
  };
  

  // open edit modal
  const openEdit = (flower) => {
    setEditId(flower._id);
    setName(flower.name);
    setPrice(flower.price);
    setImage(flower.image);
    setDescription(flower.description || "");
    setIsOpen(true);
  };

  // update flower
  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const res = await fetch(`http://localhost:5000/flowers/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, image, description }),
      });

      if (res.ok) {
        toast.success("Flower updated 🌼");
        setIsOpen(false);
        fetchFlowers();
      } else {
        toast.error("Update failed ❌");
      }
    } catch {
      toast.error("Server error ❌");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
        🌼 Manage Flowers
      </h2>

      <div className="overflow-x-auto  shadow-xl rounded-xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-pink-100 text-pink-700">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {flowers.map((flower) => (
              <tr key={flower._id} className="border-t">
                <td className="px-4 py-3">
                  <img
                    src={flower.image}
                    alt={flower.name}
                    className="w-14 h-14 rounded object-cover"
                  />
                </td>
                <td className="px-4 py-3">{flower.name}</td>
                <td className="px-4 py-3">৳ {flower.price}</td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button
                    onClick={() => openEdit(flower)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(flower._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4 text-pink-600">
              ✏️ Edit Flower
            </h3>

            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="Name"
                required
              />
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                className="w-full border p-2 rounded"
                placeholder="Price"
                required
              />
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="Image URL"
                required
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="Description"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  disabled={updating}
                  className="px-4 py-2 bg-pink-500 text-white rounded"
                >
                  {updating ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
