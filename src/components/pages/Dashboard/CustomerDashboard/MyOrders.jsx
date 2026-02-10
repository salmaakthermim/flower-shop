import { useEffect, useState } from "react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:5000/orders/customer/${user.email}`)
      .then(res => res.json())
      .then(data => setOrders(data));
  }, [user]);

  if (orders.length === 0) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-semibold mb-2">🌸 My Orders</h2>
        <p>No orders yet</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">🌸 My Orders</h2>

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order._id} className="border p-4 rounded">
            <p><b>Order ID:</b> {order.orderId}</p>
            <p><b>Status:</b> {order.orderStatus}</p>
            <p><b>Total:</b> ${order.totalPrice}</p>

            <div className="mt-3">
              {order.products.map(item => (
                <div key={item.productId} className="flex gap-3 text-sm">
                  <img src={item.image} className="w-10 h-10" />
                  <p>{item.name} × {item.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
