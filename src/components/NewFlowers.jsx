import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

export default function NewFlowers() {
  const [flowers, setFlowers] = useState([]);
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);

  // 🔹 ORDER FORM STATES
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

  // ================= ADD TO CART =================
  const addToCart = (flower) => {
    setOpen(true);

    const exists = cart.find((item) => item._id === flower._id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item._id === flower._id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...flower, qty: 1 }]);
    }
  };

  // ================= UPDATE QTY =================
  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, qty } : item
      )
    );
  };

  // ================= REMOVE ITEM =================
  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  // ================= TOTAL =================
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

// ================= PLACE ORDER =================
const handleOrder = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user?.email) {
    alert("Please login first");
    return;
  }

  const orderData = {
    customer: {
      name,
      email: user.email,
      phone,
    },
    products: cart.map(item => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.qty,
      image: item.image,
    })),
    totalPrice: total,
    paymentMethod: "COD",
  };

  const res = await fetch("http://localhost:5000/orders", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(orderData),
  });

  const data = await res.json();

  if (data?.order?._id) {
    setCart([]);
    setOpen(false);
    navigate(`/order-success/${data.order._id}`);
  }
};


  return (
    <section className="bg-[#f7f3ee] py-16 relative">
      <div className="max-w-7xl mx-auto px-4">

        {/* ================= SLIDER ================= */}
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
              <motion.div
                whileHover={{ y: -8 }}
                className="text-center"
              >
                <img
                  src={flower.image}
                  alt={flower.name}
                  className="mx-auto h-64 object-contain"
                />
                <h3 className="mt-4 font-semibold">
                  {flower.name}
                </h3>
                <p className="text-gray-400">
                  ${flower.price} USD
                </p>

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

      {/* ================= CART MODAL ================= */}
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
                  Shopping cart
                </h2>
                <button onClick={() => setOpen(false)}>✕</button>
              </div>

              {cart.map((item) => (
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
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) =>
                        updateQty(item._id, +e.target.value)
                      }
                      className="w-16 border px-1 mt-1"
                    />
                  </div>
                  <p>${item.price * item.qty}</p>
                  <button onClick={() => removeItem(item._id)}>
                    🗑
                  </button>
                </div>
              ))}

              <p className="font-semibold border-t pt-3">
                Total: ${total} USD
              </p>

              {/* ================= ORDER FORM ================= */}
              <div className="mt-6 space-y-3">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name *"
                  className="w-full bg-gray-100 p-2"
                />

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email *"
                  className="w-full bg-gray-100 p-2"
                />

                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone *"
                  className="w-full bg-gray-100 p-2"
                />

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
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
