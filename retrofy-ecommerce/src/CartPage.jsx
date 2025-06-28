import React, { useEffect } from "react";
import axios from "axios";

const CartPage = ({ cart, setCart, token, removeFromCart, placeOrder }) => {
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/cart/view`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setCart(res.data))
      .catch((err) => console.error("Error loading cart:", err));
  }, [token]);

  return (
    <div className="p-6 max-w-3xl mx-auto text-gray-800">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 border rounded-lg shadow-sm bg-white"
            >
              <div>
                <h4 className="text-lg font-semibold">{item.name}</h4>
                <p className="text-green-600 font-medium">₹{item.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <button
          onClick={placeOrder}
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded shadow"
        >
          ✅ Place Order
        </button>
      )}
    </div>
  );
};

export default CartPage;
