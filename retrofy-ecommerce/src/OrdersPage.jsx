import React, { useEffect } from "react";
import axios from "axios";

const OrderPage = ({ orders, setOrders, token, cancelOrder }) => {
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/orders/view`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error loading orders:", err));
  }, [token]);

  return (
    <div className="p-6 max-w-3xl mx-auto text-gray-800">
      <h2 className="text-2xl font-bold mb-4">📦 Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.order_id}
              className="p-4 border rounded-lg shadow-sm bg-white"
            >
              <p className="font-semibold mb-2">
                Order ID:{" "}
                <span className="text-sm text-gray-500">
                  #{order.order_id.slice(-6)}
                </span>
              </p>
              <ul className="list-disc ml-5 text-sm text-gray-700 mb-2">
                {order.products.map((p) => (
                  <li key={p._id}>
                    {p.name} - ₹{p.price}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => cancelOrder(order.order_id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm"
              >
                Cancel Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
