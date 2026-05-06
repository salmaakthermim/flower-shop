import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaTrash, FaMapMarkerAlt } from "react-icons/fa";

const MyCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchCart = async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(`https://flower-shop-server-nu.vercel.app/cart/${user.email}`);
      setCartItems(await res.json());
    } catch { toast.error("Failed to load cart"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCart(); }, []);

  const updateQty = async (id, qty) => {
    if (qty < 1) return;
    await fetch(`https://flower-shop-server-nu.vercel.app/cart/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: qty }),
    });
    fetchCart();
  };

  const removeItem = async (id) => {
    await fetch(`https://flower-shop-server-nu.vercel.app/cart/${id}`, { method: "DELETE" });
    fetchCart();
    toast.success("Item removed");
  };

  const total = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  const handleCheckout = async () => {
    if (!user?.email) { toast.error("Please login first"); return; }
    if (!phone) { toast.error("Phone number is required"); return; }
    if (!address) { toast.error("Delivery address is required"); return; }
    if (cartItems.length === 0) { toast.error("Cart is empty"); return; }

    setOrdering(true);
    try {
      const res = await fetch("https://flower-shop-server-nu.vercel.app/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name || "Customer",
          email: user.email,
          phone,
          address,
          note,
          items: cartItems.map(i => ({
            _id: i.productId,
            name: i.name,
            price: i.price,
            image: i.image,
            qty: i.quantity,
          })),
          total,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Order failed");

      await fetch(`https://flower-shop-server-nu.vercel.app/cart/clear/${user.email}`, { method: "DELETE" });
      toast.success("Order placed! 🌸");
      navigate(`/order-success/${data.order._id}`);
    } catch (err) {
      toast.error(err.message || "Order failed");
    } finally {
      setOrdering(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-[#2d5a3d] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="p-6 md:p-8">
      <div className="mb-7">
        <p className="section-label">Customer</p>
        <h1 className="text-3xl font-serif font-medium text-[#1a2e1a] mt-1">My Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-[#e8f0ea]">
          <p className="text-4xl mb-3">🛒</p>
          <p className="text-[#4a6a4a] mb-4">Your cart is empty.</p>
          <a href="/shop" className="btn-primary text-[11px] py-2.5 px-6">Browse Flowers</a>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Cart items */}
          <div className="lg:col-span-2 space-y-3">
            {cartItems.map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-[#e8f0ea] p-4 flex items-center gap-4"
              >
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover bg-[#f0f7f2] flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-[#1a2e1a]">{item.name}</p>
                  <p className="text-[#2d5a3d] font-semibold text-sm mt-0.5">${item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQty(item._id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full border border-[#c8e0d0] flex items-center justify-center text-[#1a2e1a] hover:bg-[#2d5a3d] hover:text-white hover:border-[#2d5a3d] transition text-sm">−</button>
                    <span className="text-sm font-medium text-[#1a2e1a] w-5 text-center">{item.quantity}</span>
                    <button onClick={() => updateQty(item._id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full border border-[#c8e0d0] flex items-center justify-center text-[#1a2e1a] hover:bg-[#2d5a3d] hover:text-white hover:border-[#2d5a3d] transition text-sm">+</button>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold text-[#1a2e1a]">${(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => removeItem(item._id)} className="mt-2 text-[#e8a0b4] hover:text-[#c0506a] transition">
                    <FaTrash size={13} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order summary + checkout */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-[#e8f0ea] p-6">
              <h2 className="font-serif text-lg text-[#1a2e1a] mb-5">Order Summary</h2>
              <div className="space-y-2 text-sm text-[#4a6a4a] mb-4">
                <div className="flex justify-between">
                  <span>Items ({cartItems.length})</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-[#2d5a3d]">{total >= 80 ? "Free" : "$5.00"}</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-[#e8f0ea]">
                <span className="font-medium text-[#1a2e1a]">Total</span>
                <span className="font-serif text-2xl text-[#1a2e1a]">${(total + (total >= 80 ? 0 : 5)).toFixed(2)}</span>
              </div>
              {total < 80 && (
                <p className="text-[10px] text-[#2d5a3d] mt-2 text-center">
                  Add ${(80 - total).toFixed(2)} more for free delivery!
                </p>
              )}
            </div>

            {/* Delivery form */}
            <div className="bg-white rounded-2xl border border-[#e8f0ea] p-6 space-y-3">
              <h2 className="font-serif text-lg text-[#1a2e1a] mb-1">Delivery Details</h2>
              <input readOnly value={user?.email || ""} className="w-full bg-[#f0f7f2] border border-[#e8f0ea] px-4 py-3 rounded-xl text-sm text-[#4a6a4a]" />
              <input
                value={phone} onChange={e => setPhone(e.target.value)}
                placeholder="Phone Number *"
                className="w-full border border-[#c8e0d0] px-4 py-3 rounded-xl text-sm text-[#1a2e1a] focus:outline-none focus:border-[#2d5a3d] transition placeholder-[#8aaa8a]"
              />
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a6a4a] text-sm" />
                <input
                  value={address} onChange={e => setAddress(e.target.value)}
                  placeholder="Delivery Address *"
                  className="w-full border border-[#c8e0d0] pl-10 pr-4 py-3 rounded-xl text-sm text-[#1a2e1a] focus:outline-none focus:border-[#2d5a3d] transition placeholder-[#8aaa8a]"
                />
              </div>
              <textarea
                value={note} onChange={e => setNote(e.target.value)}
                placeholder="Special instructions (optional)"
                rows={2}
                className="w-full border border-[#c8e0d0] px-4 py-3 rounded-xl text-sm text-[#1a2e1a] focus:outline-none focus:border-[#2d5a3d] transition resize-none placeholder-[#8aaa8a]"
              />
              <button onClick={handleCheckout} disabled={ordering} className="w-full btn-primary py-4 text-[11px]">
                {ordering ? "Placing Order..." : "Place Order 🌸"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCart;
