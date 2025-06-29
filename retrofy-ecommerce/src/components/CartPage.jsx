// src/components/CartPage.jsx
import React, { useEffect } from "react";

const CartPage = ({ cart = [], setCart, token, removeFromCart, placeOrder }) => {
  useEffect(() => {
    // Optional: You can fetch the cart here if needed
  }, [cart]);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🛒 Your Cart</h2>

      {!cart || cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border p-3 rounded"
            >
              <div>
                <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-600">₹{item.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                ❌ Remove
              </button>
            </div>
          ))}

          <div className="flex justify-end mt-4">
            <button
              onClick={placeOrder}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
            >
              ✅ Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
