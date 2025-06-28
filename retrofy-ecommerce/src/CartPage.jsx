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
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((item, index) => (
          <div key={index}>
            <h4>{item.name}</h4>
            <p>₹{item.price}</p>
            <button onClick={() => removeFromCart(item._id)}>Remove</button>
          </div>
        ))
      )}
      {cart.length > 0 && <button onClick={placeOrder}>Place Order</button>}
    </div>
  );
};

export default CartPage;
