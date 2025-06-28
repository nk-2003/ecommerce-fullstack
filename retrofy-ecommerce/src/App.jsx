import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [activeForm, setActiveForm] = useState('login'); // 'login' or 'register'
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  // ✅ Load Products
  useEffect(() => {
    axios.get(`${API}/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error("Failed to load products", err));
  }, []);

  const loadCart = () => {
    axios.get(`${API}/cart/view`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setCart(res.data))
      .catch(err => console.error("Failed to load cart", err));
  };

  const loadOrders = () => {
    axios.get(`${API}/orders/view`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setOrders(res.data))
      .catch(err => console.error("Failed to load orders", err));
  };

  const register = () => {
    axios.post(`${API}/register`, {
      name: inputName,
      email: inputEmail,
      password: inputPassword
    })
    .then(() => {
      alert("Registered successfully");
      // auto-login
      return axios.post(`${API}/login`, {
        email: inputEmail,
        password: inputPassword
      });
    })
    .then(res => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('email', inputEmail);
      setToken(res.data.token);
      setEmail(inputEmail);
      alert("Logged in successfully");
    })
    .catch(err => {
      console.error("Error:", err.response?.data);
      alert(err.response?.data?.error || "Something went wrong");
    });
  };

  const login = () => {
    axios.post(`${API}/login`, {
      email: inputEmail,
      password: inputPassword
    })
    .then(res => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('email', inputEmail);
      setToken(res.data.token);
      setEmail(inputEmail);
      alert("Login successful");
    })
    .catch(err => {
      console.error("Login failed:", err.response?.data);
      alert(err.response?.data?.error || "Login failed");
    });
  };

  const addToCart = (product_id) => {
    axios.post(`${API}/cart/add`, { product_id }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      alert("Added to cart");
      loadCart();
    }).catch(err => alert("Add to cart failed"));
  };

  const removeFromCart = (product_id) => {
    axios.post(`${API}/cart/remove`, { product_id }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      alert("Removed from cart");
      loadCart();
    }).catch(err => alert("Remove from cart failed"));
  };

  const placeOrder = () => {
    axios.post(`${API}/orders/place`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      alert("Order placed");
      loadOrders();
      loadCart();
    }).catch(err => alert("Order failed"));
  };

  const cancelOrder = (order_id) => {
    axios.post(`${API}/orders/cancel`, { order_id }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      alert("Order cancelled");
      loadOrders();
    }).catch(err => alert("Cancel failed"));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setToken('');
    setEmail('');
    setCart([]);
    setOrders([]);
    setInputName('');
    setInputEmail('');
    setInputPassword('');
    setActiveForm('login');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Retrofy Shop</h1>

      {!token ? (
        <>
          <div style={{ marginBottom: 20 }}>
            <button
              onClick={() => setActiveForm('login')}
              style={{
                marginRight: 10,
                backgroundColor: activeForm === 'login' ? '#444' : '#ccc',
                color: activeForm === 'login' ? '#fff' : '#000',
                padding: '6px 12px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Login
            </button>
            <button
              onClick={() => setActiveForm('register')}
              style={{
                backgroundColor: activeForm === 'register' ? '#444' : '#ccc',
                color: activeForm === 'register' ? '#fff' : '#000',
                padding: '6px 12px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Register
            </button>
          </div>

          {activeForm === 'register' && (
            <>
              <h2>Register</h2>
              <input
                type="text"
                placeholder="Name"
                value={inputName}
                onChange={e => setInputName(e.target.value)}
                style={{ display: 'block', marginBottom: 10 }}
              />
              <input
                type="email"
                placeholder="Email"
                value={inputEmail}
                onChange={e => setInputEmail(e.target.value)}
                style={{ display: 'block', marginBottom: 10 }}
              />
              <input
                type="password"
                placeholder="Password"
                value={inputPassword}
                onChange={e => setInputPassword(e.target.value)}
                style={{ display: 'block', marginBottom: 10 }}
              />
              <button onClick={register}>Register</button>
            </>
          )}

          {activeForm === 'login' && (
            <>
              <h2>Login</h2>
              <input
                type="email"
                placeholder="Email"
                value={inputEmail}
                onChange={e => setInputEmail(e.target.value)}
                style={{ display: 'block', marginBottom: 10 }}
              />
              <input
                type="password"
                placeholder="Password"
                value={inputPassword}
                onChange={e => setInputPassword(e.target.value)}
                style={{ display: 'block', marginBottom: 10 }}
              />
              <button onClick={login}>Login</button>
            </>
          )}
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
            <div key={order.order_id} style={{ marginTop: 10 }}>
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
