import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import NewFlowers from "./NewFlowers";

export default function FlowerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [flower, setFlower] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  // CART STATES
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);

  // ORDER STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  // ================= LOAD FLOWER =================
  useEffect(() => {
    fetch(`http://localhost:5000/flowers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFlower(data);
        setSelectedImage(data.image);
        setLoading(false);
      });
  }, [id]);

  // ================= LOAD USER =================
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.email) setEmail(user.email);
    if (user?.name) setName(user.name);
  }, []);

  // ================= LOAD CART =================
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
  const addToCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.email) {
      alert("Please login first");
      return;
    }

    await fetch("http://localhost:5000/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        productId: flower._id,
        name: flower.name,
        price: flower.price,
        image: selectedImage,
        quantity: qty,
      }),
    });

    await loadCart();
    setOpen(true);
  };

  // ================= UPDATE QTY =================
  const updateQty = async (id, quantity) => {
    if (quantity < 1) return;

    await fetch(`http://localhost:5000/cart/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
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

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ================= PLACE ORDER =================
  const handleOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();

    await fetch(
      `http://localhost:5000/cart/clear/${user.email}`,
      { method: "DELETE" }
    );

    setCart([]);
    setOpen(false);
    navigate(`/order-success/${data.order._id}`);
  };

  if (loading)
    return <div className="text-center py-20">Loading...</div>;

  return (
    <div>
      <section className="bg-[#f4efe9] min-h-screen py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 px-6">

          {/* LEFT SIDE */}
          <div>

            <Link to="/all-flowers">
              <h1 className="text-2xl cursor-pointer hover:text-pink-500">
                All Flower
              </h1>
            </Link>
            <img
              src={selectedImage}
              alt={flower.name}
              className="w-full max-h-[500px] object-contain"
            />

            {/* THUMBNAIL */}
            <div className="mt-6">
              <img
                src={flower.image}
                onClick={() => setSelectedImage(flower.image)}
                className={`w-24 h-24 object-cover border cursor-pointer ${selectedImage === flower.image
                    ? "border-black"
                    : "border-gray-300"
                  }`}
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <p className="text-green-600 mb-2">In stock</p>

            <h1 className="text-4xl font-serif mb-3">
              {flower.name}
            </h1>

            <p className="text-xl text-[#7a745e] mb-6">
              ${flower.price} USD
            </p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex border">
                <button
                  onClick={() =>
                    setQty((prev) =>
                      prev > 1 ? prev - 1 : 1
                    )
                  }
                  className="px-3"
                >
                  -
                </button>
                <span className="px-4 border-x">
                  {qty}
                </span>
                <button
                  onClick={() =>
                    setQty((prev) => prev + 1)
                  }
                  className="px-3"
                >
                  +
                </button>
              </div>

              <button
                onClick={addToCart}
                className="bg-[#7a745e] text-white px-8 py-3 hover:bg-black transition"
              >
                ADD TO CART
              </button>
            </div>

            <hr className="mb-6" />

            <h3 className="font-semibold mb-2">
              DESCRIPTION
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {flower.description}
            </p>
          </div>
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
                        <div className="flex gap-2">
                          <button onClick={() =>
                            updateQty(item._id, item.quantity - 1)
                          }>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() =>
                            updateQty(item._id, item.quantity + 1)
                          }>+</button>
                        </div>
                      </div>
                      <button onClick={() =>
                        removeItem(item._id)
                      }>🗑</button>
                    </div>
                  ))
                )}

                <p className="font-semibold border-t pt-3">
                  Total: ${total}
                </p>

                {/* ORDER FORM */}
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
      <NewFlowers></NewFlowers>
    </div>
  );
}
