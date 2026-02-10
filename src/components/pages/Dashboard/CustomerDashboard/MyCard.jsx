import React, { useState, useEffect } from "react";
import axios from "axios";

const MyCard = ({ userEmail }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Demo: Normally, cart stored in DB or localStorage
  useEffect(() => {
    const fetchCart = async () => {
      try {
        // এখন orders এর মধ্যে pending order ধরে নিলে হবে
        const res = await axios.get(
          `http://localhost:5000/orders/customer/${userEmail}`
        );
        // শুধু pending orders ধরব
        const pendingOrders = res.data.filter(
          (order) => order.orderStatus === "pending"
        );

        // সমস্ত প্রোডাক্টকে এক জায়গায় merge
        let items = [];
        pendingOrders.forEach((order) => {
          order.products.forEach((p) => items.push({ ...p, orderId: order.orderId }));
        });

        setCartItems(items);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userEmail]);

  const handleRemove = (productId) => {
    setCartItems(cartItems.filter((item) => item.productId !== productId));
  };

  const handleQuantityChange = (productId, qty) => {
    if (qty < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || item.qty || 1),
    0
  );

  if (loading) return <p className="text-center py-20">Loading cart...</p>;
  if (!cartItems.length)
    return <p className="text-center py-20">Your cart is empty 😔</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Cart</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.productId}
              className="flex items-center gap-4 border rounded-lg p-4 bg-white shadow hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-500">
                  Price: ${item.price} | Order ID: {item.orderId}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.productId, (item.quantity || item.qty || 1) - 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity || item.qty || 1}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.productId, (item.quantity || item.qty || 1) + 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.productId)}
                className="text-red-500 font-bold text-xl hover:text-red-700"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="w-full lg:w-1/3 border rounded-lg p-6 bg-white shadow">
          <h2 className="text-2xl font-bold mb-4">Summary</h2>
          <p className="text-gray-600 mb-2">Total Items: {cartItems.length}</p>
          <p className="text-gray-600 mb-4 font-semibold text-lg">
            Total Price: ${totalPrice.toFixed(2)}
          </p>
          <button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
            onClick={() => alert("Proceed to Checkout - Coming Soon!")}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCard;
