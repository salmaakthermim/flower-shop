import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/orders/${id}`)
      .then(res => res.json())
      .then(data => setOrder(data));
  }, [id]);

  if (!order) return <p className="text-center py-20">Loading...</p>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="text-3xl mb-10 text-[#6e684f]">
        Thank you for your order!
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Order Info */}
        <div className="md:col-span-2 border p-6 rounded">
          <p className="mb-4 text-gray-500">#{order._id.slice(-6)}</p>

          {order.products.map(item => (
            <div key={item.productId} className="flex justify-between mb-3">
              <div className="flex gap-3">
                <img src={item.image} className="w-12 h-12" />
                <p>{item.name}</p>
              </div>
              <p>{item.quantity}x &nbsp; ${item.price}</p>
            </div>
          ))}

          <p className="border-t pt-4 font-semibold">
            Total: ${order.totalPrice} USD
          </p>
        </div>

        {/* Customer Info */}
        <div className="border p-6 rounded">
          <h3 className="font-semibold mb-4">Customer details</h3>
          <p>Name: {order.customer.name}</p>
          <p>Email: {order.customer.email}</p>
          <p>Phone: {order.customer.phone}</p>
          <p>Comment: {order.customer.comment}</p>
        </div>
      </div>
    </section>
  );
}
