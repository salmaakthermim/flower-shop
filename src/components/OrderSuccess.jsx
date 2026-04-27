import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/orders/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(data => setOrder(data))
      .catch(() => setError(true));
  }, [id]);

  if (error) return (
    <div className="text-center py-32">
      <p className="text-2xl font-serif text-[#1a2e1a] mb-4">Order not found</p>
      <Link to="/" className="btn-primary">Go Home</Link>
    </div>
  );

  if (!order) return (
    <div className="flex items-center justify-center py-32">
      <div className="w-10 h-10 border-2 border-[#2d5a3d] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const orderId = String(order._id).slice(-6).toUpperCase();

  return (
    <section className="bg-[#fffdf9] min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Success header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <div className="w-20 h-20 bg-[#f0f7f2] rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            🌸
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-[#1a2e1a] mb-3">
            Thank You!
          </h1>
          <p className="text-[#4a6a4a] text-base">
            Your order <span className="font-semibold text-[#2d5a3d]">#{orderId}</span> has been placed successfully.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Order items */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 bg-white border border-[#e8f0ea] rounded-2xl p-7"
          >
            <h2 className="font-serif text-xl text-[#1a2e1a] mb-6">Order Summary</h2>

            <div className="space-y-4">
              {order.products?.map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-4 pb-4 border-b border-[#e8f0ea] last:border-0">
                  <div className="flex items-center gap-4">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg bg-[#f0f7f2]" />
                    )}
                    <div>
                      <p className="font-medium text-[#1a2e1a] text-sm">{item.name}</p>
                      <p className="text-[#4a6a4a] text-xs mt-0.5">Qty: {item.qty || item.quantity || 1}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-[#2d5a3d] text-sm whitespace-nowrap">
                    ${item.price}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6 pt-5 border-t border-[#e8f0ea]">
              <span className="text-[#4a6a4a] text-sm tracking-wide">Total</span>
              <span className="text-2xl font-serif text-[#1a2e1a]">${order.totalPrice} USD</span>
            </div>
          </motion.div>

          {/* Customer info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-[#e8f0ea] rounded-2xl p-7"
          >
            <h2 className="font-serif text-xl text-[#1a2e1a] mb-6">Delivery Details</h2>
            <div className="space-y-3 text-sm text-[#4a6a4a]">
              {[
                { label: "Name",  value: order.customer?.name },
                { label: "Email", value: order.customer?.email },
                { label: "Phone", value: order.customer?.phone },
                { label: "Address", value: order.deliveryAddress },
                { label: "Note", value: order.deliveryNote },
              ].filter(i => i.value).map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[10px] tracking-widest text-[#2d5a3d] uppercase mb-0.5">{label}</p>
                  <p className="text-[#1a2e1a] font-medium">{value}</p>
                </div>
              ))}

              {order.estimatedDelivery && order.orderStatus !== "delivered" && (
                <div className="bg-[#f0f7f2] rounded-xl px-4 py-2.5 mt-2">
                  <p className="text-[10px] tracking-widest text-[#2d5a3d] uppercase mb-0.5">Est. Delivery</p>
                  <p className="text-[#1a2e1a] font-medium text-sm">
                    🚚 {new Date(order.estimatedDelivery).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                  </p>
                </div>
              )}

              <div className="pt-2">
                <span className="inline-block bg-[#f0f7f2] text-[#2d5a3d] text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full font-medium border border-[#c8e0d0]">
                  {order.orderStatus || "Pending"}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4 justify-center mt-10"
        >
          <Link to="/shop" className="btn-primary">Continue Shopping</Link>
          <Link to="/dashboard" className="btn-outline">View My Orders</Link>
        </motion.div>

      </div>
    </section>
  );
}
