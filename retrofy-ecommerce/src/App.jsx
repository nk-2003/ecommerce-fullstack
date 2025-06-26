import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');

  // ✅ Load Products
  useEffect(() => {
    axios.get(`${API}/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error("Failed to load products", err));
  }, []);

  // ✅ Load Cart
  const loadCart = () => {
    axios.get(`${API}/cart/view`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setCart(res.data))
      .catch(err => console.error("Failed to load cart", err));
  };

  // ✅ Load Orders
  const loadOrders = () => {
    axios.get(`${API}/orders/view`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setOrders(res.data))
      .catch(err => console.error("Failed to load orders", err));
  };

  // ✅ Register
  const register = () => {
    axios.post(`${API}/register`, {
      email: "test@example.com",
      password: "123456"
    }).then(res => alert("Registered"))
      .catch(err => alert("Register failed"));
  };

  // ✅ Login
  const login = () => {
    axios.post(`${API}/login`, {
      email: "test@example.com",
      password: "123456"
    }).then(res => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('email', res.data.email);
      setToken(res.data.token);
      setEmail(res.data.email);
      alert("Login successful");
    }).catch(err => alert("Login failed"));
  };

  // ✅ Add to Cart
  const addToCart = (product_id) => {
    axios.post(`${API}/cart/add`, { product_id }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      alert("Added to cart");
      loadCart();
    }).catch(err => alert("Add to cart failed"));
  };

  // ✅ Remove from Cart
  const removeFromCart = (product_id) => {
    axios.post(`${API}/cart/remove`, { product_id }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      alert("Removed from cart");
      loadCart();
    }).catch(err => alert("Remove from cart failed"));
  };

  // ✅ Place Order
  const placeOrder = () => {
    axios.post(`${API}/orders/place`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      alert("Order placed");
      loadOrders();
      loadCart();
    }).catch(err => alert("Order failed"));
  };

  // ✅ Cancel Order
  const cancelOrder = (order_id) => {
    axios.post(`${API}/orders/cancel`, { order_id }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      alert("Order cancelled");
      loadOrders();
    }).catch(err => alert("Cancel failed"));
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setToken('');
    setEmail('');
    setCart([]);
    setOrders([]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Retrofy Shop</h1>

      {!token ? (
        <>
          <button onClick={register}>Register</button>
          <button onClick={login}>Login</button>
        </>
      ) : (
        <>
          <p>Welcome, {email}</p>
          <button onClick={logout}>Logout</button>
        </>
      )}

      <h2>Products</h2>
      {products.map(p => (
        <div key={p._id} style={{ marginBottom: 10 }}>
          <b>{p.name}</b> - ₹{p.price}
          {token && <button onClick={() => addToCart(p._id)}>Add</button>}
        </div>
      ))}

      {token && (
        <>
          <h2>Cart</h2>
          <button onClick={loadCart}>Refresh Cart</button>
          {cart.map(p => (
            <div key={p._id}>
              {p.name} - ₹{p.price}
              <button onClick={() => removeFromCart(p._id)}>Remove</button>
            </div>
          ))}
          <button onClick={placeOrder}>Place Order</button>

          <h2>Orders</h2>
          <button onClick={loadOrders}>Refresh Orders</button>
          {orders.map(order => (
            <div key={order.order_id}>
              <b>Order ID:</b> {order.order_id}
              {order.products.map(p => (
                <div key={p._id}>- {p.name}</div>
              ))}
              <button onClick={() => cancelOrder(order.order_id)}>Cancel</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
