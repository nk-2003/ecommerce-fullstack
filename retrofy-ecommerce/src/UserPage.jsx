import React, { useEffect } from "react";
import axios from "axios";
import { UserCircle, ShoppingCart, PackageCheck, LogOut } from "lucide-react";

const UserPage = ({ user, token, cart, setCart, orders, setOrders, logout }) => {
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/cart/view`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCart(res.data))
      .catch((err) => console.error("Error loading cart:", err));

    axios
      .get(`${import.meta.env.VITE_API_URL}/orders/view`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error loading orders:", err));
  }, [token]);

  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-800">
      {/* User Info */}
      <div className="mb-6 flex items-center space-x-3">
        <UserCircle className="text-gray-700" size={28} />
        <div>
          <h2 className="text-2xl font-bold">{user.name || user.email}</h2>
          <p className="text-gray-600 text-sm">{user.email}</p>
        </div>
      </div>

      {/* Cart Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-2">
          <ShoppingCart className="text-gray-700" size={20} />
          <h3 className="text-xl font-semibold">Your Cart</h3>
        </div>
        {cart.length === 0 ? (
          <p className="text-gray-500 text-sm">Your cart is empty.</p>
        ) : (
          <div className="space-y-2">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 border rounded-lg bg-white shadow-sm"
              >
                <span>{item.name}</span>
                <span className="font-semibold text-green-600">₹{item.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Orders Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-2">
          <PackageCheck className="text-gray-700" size={20} />
          <h3 className="text-xl font-semibold">Your Orders</h3>
        </div>
        {orders.length === 0 ? (
          <p className="text-gray-500 text-sm">You have not placed any orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.order_id}
                className="p-4 border rounded-lg bg-gray-50 shadow"
              >
                <p className="text-sm text-gray-700 mb-1 font-medium">
                  Order ID: #{order.order_id.slice(-6)}
                </p>
                <ul className="ml-4 list-disc text-sm text-gray-600">
                  {order.products.map((p) => (
                    <li key={p._id}>
                      {p.name} - ₹{p.price}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Logout Button */}
      <div className="flex justify-end">
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded shadow transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

export default UserPage;
