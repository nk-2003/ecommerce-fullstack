import React, { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

const UserMenu = ({ user, cart, orders, logout, reloadOrders, onClose }) => {
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(""), 3000);
  };

  const handleReorder = async (products) => {
    try {
      for (const product of products) {
        await axios.post(`${API}/cart/add`, {
          product_id: product._id,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      showAlert("✅ Reordered to cart!");
    } catch (err) {
      console.error(err);
      showAlert("❌ Reorder failed.");
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.post(`${API}/orders/cancel`, {
        order_id: orderId,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showAlert("🗑️ Order cancelled.");
      reloadOrders();
    } catch (err) {
      console.error(err);
      showAlert("❌ Failed to cancel order.");
    }
  };

  return (
    <div className="fixed top-16 right-4 z-50 bg-white border shadow-lg rounded-lg w-96 max-h-[80vh] overflow-y-auto p-4 space-y-4">
      {/* ❌ Close Button */}
      <div className="absolute top-2 right-2 cursor-pointer" onClick={onClose}>
        <X size={24} />
      </div>

      {/* ✅ Alert Box */}
      {alertMessage && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-2 rounded text-sm">
          {alertMessage}
        </div>
      )}

      {/* User Info */}
      <div>
        <p className="text-lg font-semibold text-gray-800">
          Name: {user.name || "Guest"}
        </p>
        <p className="text-sm text-gray-600">Email: {user.email || "Not available"}</p>
      </div>

      {/* Cart Section */}
      <div>
        <h4 className="text-md font-bold text-gray-700 mb-1">🛒 Cart:</h4>
        {cart.length === 0 ? (
          <p className="text-sm text-gray-500">Cart is empty</p>
        ) : (
          cart.map((item, idx) => (
            <div key={idx} className="text-sm text-gray-800">
              {item.name} - ₹{item.price}
            </div>
          ))
        )}
      </div>

      {/* Orders Section */}
      <div>
        <h4 className="text-md font-bold text-gray-700 mb-1">Orders:</h4>
        {orders.length === 0 ? (
          <p className="text-sm text-gray-500">No orders yet</p>
        ) : (
          orders.map((order) => {
            const orderDate = new Date(parseInt(order.order_id.substring(0, 8), 16) * 1000);
            const deliveryDate = new Date(orderDate.getTime() + 3 * 24 * 60 * 60 * 1000);
            const total = order.products.reduce((sum, p) => sum + p.price, 0);

            return (
              <div key={order.order_id} className="mb-4 border p-3 rounded bg-gray-50">
                <p className="text-sm font-semibold text-gray-700">
                  Order #{order.order_id.slice(-6)} | {orderDate.toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  Delivery: {deliveryDate.toLocaleString()}
                </p>
                <p className="text-sm text-green-600">Status: Placed</p>

                {order.products.map((prod) => (
                  <div key={prod._id} className="ml-3 text-sm text-gray-800">
                    • {prod.name} - ₹{prod.price}
                  </div>
                ))}

                <div className="mt-2 text-right text-sm font-bold text-green-700">
                  Total: ₹{total}
                </div>

                <button
                  onClick={() => handleCancelOrder(order.order_id)}
                  className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white py-1 rounded text-sm"
                >
                  ❌ Cancel Order
                </button>

                <button
                  onClick={() => handleReorder(order.products)}
                  className="mt-2 w-full bg-yellow-400 hover:bg-yellow-500 text-black py-1 rounded text-sm"
                >
                  Reorder
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Logout */}
      <div className="text-right pt-2 border-t mt-4">
        <button
          onClick={logout}
          className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
