import React, { useEffect, useState } from "react";
import axios from "axios";

const MyCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ same as MyOrders
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("Logged user:", user);



  const fetchCart = async () => {
    try {
      if (!user?.email) return;

      const res = await axios.get(
        `http://localhost:5000/cart/${user.email}`
      );

      setCartItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (id, qty) => {
    if (qty < 1) return;

    await axios.patch(`http://localhost:5000/cart/${id}`, {
      quantity: qty,
    });

    fetchCart();
  };

  const removeItem = async (id) => {
    await axios.delete(`http://localhost:5000/cart/${id}`);
    fetchCart();
  };

  const checkout = async () => {
    await axios.post("http://localhost:5000/checkout", {
      email: user.email, // ✅ now correct
      name: "Customer Name",
      phone: "01700000000",
    });

    fetchCart();
    alert("Order Placed Successfully 🎉");
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (loading)
    return (
      <p className="text-center py-20 text-lg">
        Loading cart...
      </p>
    );

  if (!cartItems.length)
    return (
      <p className="text-center py-20 text-lg">
        Your cart is empty 😔
      </p>
    );

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Cart</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 border rounded-lg p-4 shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-lg">
                  {item.name}
                </h3>
                <p>${item.price}</p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      updateQuantity(item._id, item.quantity - 1)
                    }
                    className="px-2 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item._id, item.quantity + 1)
                    }
                    className="px-2 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeItem(item._id)}
                className="text-red-500 text-xl"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-1/3 border rounded-lg p-6 shadow">
          <h2 className="text-xl font-bold mb-4">
            Order Summary
          </h2>

          <p>Total Items: {cartItems.length}</p>
          <p className="font-semibold text-lg mb-4">
            Total: ${totalPrice}
          </p>

          <button
            onClick={checkout}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
