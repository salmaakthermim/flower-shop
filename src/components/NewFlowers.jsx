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
    <section className="bg-[#f7f3ee] py-16 relative">
      <div className="max-w-7xl mx-auto px-4">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={30}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {flowers.map((flower) => (
            <SwiperSlide key={flower._id}>
              <motion.div whileHover={{ y: -8 }} className="text-center">
                <img
                  src={flower.image}
                  alt={flower.name}
                  className="mx-auto h-64 object-contain"
                />
                <h3 className="mt-4 font-semibold">
                  {flower.name}
                </h3>
                <p>${flower.price}</p>

                <button
                  onClick={() => addToCart(flower)}
                  className="mt-4 px-6 py-2 border hover:bg-gray-800 hover:text-white"
                >
                  ADD TO CART
                </button>
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
            className="fixed inset-0 bg-black/40 z-50 flex justify-end"
          >
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className="w-full max-w-md bg-white h-full p-6 overflow-y-auto"
            >
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  Shopping Cart
                </h2>
                <button onClick={() => setOpen(false)}>
                  ✕
                </button>
              </div>

              {loadingCart ? (
                <p>Loading...</p>
              ) : cart.length === 0 ? (
                <p>Your cart is empty 😔</p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-3 mb-4"
                  >
                    <img
                      src={item.image}
                      className="w-14 h-14 object-cover"
                    />
                    <div className="flex-1">
                      <p>{item.name}</p>
                      <div className="flex gap-2 mt-1">
                        <button
                          onClick={() =>
                            updateQty(
                              item._id,
                              item.quantity - 1
                            )
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQty(
                              item._id,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        removeItem(item._id)
                      }
                    >
                      🗑
                    </button>
                  </div>
                ))
              )}

              <p className="font-semibold border-t pt-3">
                Total: ${total}
              </p>

              <div className="mt-6 space-y-3">
                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Name *"
                  className="w-full bg-gray-100 p-2"
                />
                <input
                  value={email}
                  readOnly
                  className="w-full bg-gray-200 p-2"
                />
                <input
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  placeholder="Phone *"
                  className="w-full bg-gray-100 p-2"
                />
                <textarea
                  value={comment}
                  onChange={(e) =>
                    setComment(e.target.value)
                  }
                  placeholder="Comment"
                  className="w-full bg-gray-100 p-2"
                />

                <button
                  onClick={handleOrder}
                  className="w-full bg-[#7a745e] text-white py-3"
                >
                  ORDER
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
