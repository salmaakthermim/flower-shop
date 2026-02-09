// src/components/pages/Dashboard/AdminDashboard/AllOrders.jsx
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch all orders
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load orders ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // update order status
  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderStatus: status }),
      });

      if (res.ok) {
        toast.success("Status updated ✅");
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? { ...o, orderStatus: status } : o))
        );
      } else {
        toast.error("Update failed ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error ❌");
    }
  };

  // delete order with SweetAlert
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This order will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ec4899",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:5000/orders/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Order deleted 🗑️");
        setOrders((prev) => prev.filter((o) => o._id !== id));
      } else {
        toast.error("Delete failed ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error ❌");
    }
  };

  if (loading) return <p className="text-center mt-10 text-lg">Loading orders...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
        📦 All Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto shadow-xl rounded-xl">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-pink-100 text-pink-700">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{order.orderId}</td>
                  <td className="px-4 py-3">{order.customer?.name}</td>
                  <td className="px-4 py-3">৳ {order.totalPrice}</td>
                  <td className="px-4 py-3">{order.paymentStatus}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-white ${
                      order.orderStatus === "pending"
                        ? "bg-yellow-500"
                        : order.orderStatus === "processing"
                        ? "bg-blue-500"
                        : order.orderStatus === "delivered"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => setSelected(order)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      View
                    </button>

                    <select
                      className="px-2 py-1 border rounded"
                      defaultValue={order.orderStatus}
                      onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                    >
                      <option value="pending">pending</option>
                      <option value="processing">processing</option>
                      <option value="delivered">delivered</option>
                      <option value="cancelled">cancelled</option>
                    </select>

                    <button
                      onClick={() => handleDelete(order._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Details Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[450px]">
            <h3 className="text-xl font-bold mb-3">Order Details</h3>
            <p><b>Name:</b> {selected.customer?.name}</p>
            <p><b>Email:</b> {selected.customer?.email}</p>
            <p><b>Phone:</b> {selected.customer?.phone}</p>
            <p><b>Address:</b> {selected.customer?.address}</p>
            <p><b>Payment:</b> {selected.paymentMethod} ({selected.paymentStatus})</p>
            <p className="mt-2 font-semibold">Products:</p>
            <ul className="list-disc pl-5">
              {selected.products.map((p, i) => (
                <li key={i}>
                  {p.name} × {p.quantity} = ৳{p.price * p.quantity}
                </li>
              ))}
            </ul>
            <p className="mt-2 font-bold">Total: ৳ {selected.totalPrice}</p>

            <button
              onClick={() => setSelected(null)}
              className="mt-4 w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
