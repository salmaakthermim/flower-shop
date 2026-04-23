import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

export default function NewFlowers() {
  const [flowers, setFlowers] = useState([]);
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  // ================= FETCH FLOWERS =================
  useEffect(() => {
    fetch("http://localhost:5000/flowers")
      .then((res) => res.json())
      .then((data) => setFlowers(data));
  }, []);

  // ================= LOAD USER =================
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.email) setEmail(user.email);
    if (user?.name) setName(user.name);
  }, []);

  // ================= LOAD CART FROM DB =================
  const loadCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.email) return;

    setLoadingCart(true);

    const res = await fetch(
      `http://localhost:5000/cart/${user.email}`
    );
    const data = await res.json();
    setCart(data);
    setLoadingCart(false);
  };

  // ================= ADD TO CART =================
  const addToCart = async (flower) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Logged user:", user);


    if (!user?.email) {
      alert("Please login first");
      return;
    }

    await fetch("http://localhost:5000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        productId: flower._id,
        name: flower.name,
        price: flower.price,
        image: flower.image,
        quantity: 1,
      }),
    });

    setOpen(true);
    loadCart();
  };

  // ================= UPDATE QTY =================
  const updateQty = async (id, qty) => {
    if (qty < 1) return;

    await fetch(`http://localhost:5000/cart/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: qty }),
    });

    loadCart();
  };

  // ================= REMOVE ITEM =================
  const removeItem = async (id) => {
    await fetch(`http://localhost:5000/cart/${id}`, {
      method: "DELETE",
    });

    loadCart();
  };

  // ================= TOTAL =================
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ================= PLACE ORDER =================
  const handleOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.email) {
      alert("Please login first");
      return;
    }

    if (!name || !phone) {
      alert("Please fill name and phone");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const orderData = {
      name,
      email: user.email,
      phone,
      comment,
      items: cart.map((item) => ({
        _id: item.productId,
        name: item.name,
        price: item.price,
        image: item.image,
        qty: item.quantity,
      })),
      total,
    };

    const res = await fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Order failed");
      return;
    }

    // Clear cart after order
    await fetch(
      `http://localhost:5000/cart/clear/${user.email}`,
      { method: "DELETE" }
    );

    setCart([]);
    setOpen(false);
    setPhone("");
    setComment("");

    navigate(`/order-success/${data.order._id}`);
  };

  return (
    <section className="bg-[#fffdf9] py-24 relative">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-label">Fresh Arrivals</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-serif font-medium text-[#1a2e1a]">
            New Flowers
          </h2>
          <div className="petal-divider max-w-xs mx-auto my-5">
            <span className="text-[#e8a0b4] text-xl">✿</span>
          </div>
        </motion.div>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={24}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {flowers.map((flower) => (
            <SwiperSlide key={flower._id}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group bg-white border border-[#e8f0ea] overflow-hidden cursor-pointer card-lift rounded-2xl"
                onClick={() => navigate(`/flower/${flower._id}`)}
              >
                <div className="overflow-hidden h-64 bg-[#f0f7f2] rounded-t-2xl">
                  <img
                    src={flower.image}
                    alt={flower.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-serif text-lg font-medium text-[#1a2e1a]">{flower.name}</h3>
                  <p className="text-[#2d5a3d] font-semibold mt-1">${flower.price}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); addToCart(flower); }}
                    className="mt-4 w-full btn-primary text-[10px] py-2.5"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CART MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex justify-end"
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <motion.div
              initial={{ x: 420 }}
              animate={{ x: 0 }}
              exit={{ x: 420 }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl"
            >
              {/* Cart Header */}
              <div className="flex justify-between items-center px-7 py-6 border-b border-[#e8f0ea] bg-[#f0f7f2]">
                <div>
                  <h2 className="text-2xl font-serif text-[#1a2e1a]">Shopping Cart</h2>
                  <p className="text-[11px] tracking-widest text-[#2d5a3d] uppercase mt-0.5">{cart.length} items</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 border border-[#c8e0d0] rounded-full flex items-center justify-center hover:bg-[#2d5a3d] hover:text-white hover:border-[#2d5a3d] transition text-[#1a2e1a]"
                >✕</button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto px-7 py-5">
                {loadingCart ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="w-8 h-8 border-2 border-[#2d5a3d] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : cart.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-4xl mb-4">🌸</p>
                    <p className="font-serif text-lg text-[#1a2e1a]">Your cart is empty</p>
                    <p className="text-sm mt-2 text-[#4a6a4a]">Add some beautiful flowers!</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item._id} className="flex items-center gap-4 py-4 border-b border-[#e8f0ea]">
                      <img src={item.image} className="w-16 h-16 object-cover bg-[#f0f7f2] rounded-lg" alt={item.name} />
                      <div className="flex-1">
                        <p className="font-medium text-[#1a2e1a] text-sm">{item.name}</p>
                        <p className="text-[#2d5a3d] font-semibold text-sm mt-0.5">${item.price}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button onClick={() => updateQty(item._id, item.quantity - 1)}
                            className="w-7 h-7 border border-[#c8e0d0] rounded-full flex items-center justify-center text-[#1a2e1a] hover:bg-[#2d5a3d] hover:text-white hover:border-[#2d5a3d] transition text-sm">−</button>
                          <span className="text-sm font-medium text-[#1a2e1a] w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQty(item._id, item.quantity + 1)}
                            className="w-7 h-7 border border-[#c8e0d0] rounded-full flex items-center justify-center text-[#1a2e1a] hover:bg-[#2d5a3d] hover:text-white hover:border-[#2d5a3d] transition text-sm">+</button>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item._id)} className="text-[#e8a0b4] hover:text-red-400 transition text-lg">🗑</button>
                    </div>
                  ))
                )}
              </div>

              {/* Order Form + Total */}
              <div className="px-7 py-6 border-t border-[#e8f0ea] bg-[#f0f7f2]">
                <div className="flex justify-between items-center mb-5">
                  <span className="text-sm text-[#4a6a4a] tracking-wide">Total</span>
                  <span className="text-2xl font-serif text-[#1a2e1a]">${total}</span>
                </div>

                <div className="space-y-3">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name *"
                    className="w-full bg-white border border-[#c8e0d0] px-4 py-3 text-sm text-[#1a2e1a] placeholder-[#8aaa8a] focus:outline-none focus:border-[#2d5a3d] transition rounded-lg"
                  />
                  <input
                    value={email}
                    readOnly
                    className="w-full bg-[#e8f0ea] border border-[#c8e0d0] px-4 py-3 text-sm text-[#4a6a4a] rounded-lg"
                  />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number *"
                    className="w-full bg-white border border-[#c8e0d0] px-4 py-3 text-sm text-[#1a2e1a] placeholder-[#8aaa8a] focus:outline-none focus:border-[#2d5a3d] transition rounded-lg"
                  />
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Special instructions..."
                    rows={2}
                    className="w-full bg-white border border-[#c8e0d0] px-4 py-3 text-sm text-[#1a2e1a] placeholder-[#8aaa8a] focus:outline-none focus:border-[#2d5a3d] transition resize-none rounded-lg"
                  />
                  <button
                    onClick={handleOrder}
                    className="w-full btn-primary py-4 text-[11px] tracking-[0.2em]"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
