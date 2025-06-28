import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthForm from './components/AuthForm';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';

const API = import.meta.env.VITE_API_URL;

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [activeForm, setActiveForm] = useState('login');
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    console.log("API:", API);
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
    <div className="font-sans bg-white min-h-screen text-gray-900">
      <Navbar token={token} setShowLogin={setShowLogin} />

      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <AuthForm
              setToken={setToken}
              setUserEmail={setEmail}
              setShowLogin={setShowLogin}
            />
          </div>
        </div>
      )}

      <div className="p-6">
        <hr className="mb-6 border-gray-300" />

        {token && (
          <div className="flex justify-between items-center my-4">
            <p className="text-lg">Welcome, <span className="font-semibold">{email}</span></p>
            <button onClick={logout} className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded shadow">Logout</button>
          </div>
        )}

        <h2 className="text-2xl font-semibold mt-6 mb-4">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              addToCart={() => addToCart(product._id)}
            />
          ))}
        </div>

        {token && (
          <>
            <h2 className="text-2xl font-semibold mt-6 mb-2">Cart</h2>
            <button onClick={loadCart} className="mb-2 bg-gray-300 hover:bg-gray-400 transition px-4 py-2 rounded shadow">Refresh Cart</button>
            <div className="space-y-2">
              {cart.map(p => (
                <div key={p._id} className="flex justify-between items-center p-4 border rounded shadow-sm hover:shadow-md transition">
                  <span>{p.name} - ₹{p.price}</span>
                  <button onClick={() => removeFromCart(p._id)} className="text-red-600 hover:underline">Remove</button>
                </div>
              ))}
            </div>
            <button onClick={placeOrder} className="mt-4 bg-indigo-600 hover:bg-indigo-700 transition text-white px-4 py-2 rounded shadow">Place Order</button>

            <h2 className="text-2xl font-semibold mt-6 mb-2">Orders</h2>
            <button onClick={loadOrders} className="mb-2 bg-gray-300 hover:bg-gray-400 transition px-4 py-2 rounded shadow">Refresh Orders</button>
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.order_id} className="p-4 border rounded shadow hover:shadow-md transition bg-gray-50">
                  <p><b>Order ID:</b> {order.order_id}</p>
                  <div className="ml-2 mt-1 space-y-1">
                    {order.products.map(p => (
                      <div key={p._id}>- {p.name}</div>
                    ))}
                  </div>
                  <button onClick={() => cancelOrder(order.order_id)} className="mt-2 text-sm text-red-600 hover:underline hover:text-red-800 transition">Cancel</button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
