import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartPage from './CartPage';
import OrdersPage from './OrdersPage';
import UserPage from './UserPage';
import UserMenu from './components/UserMenu';
import AuthForm from './components/AuthForm';

const API = import.meta.env.VITE_API_URL;

const App = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userEmail, setUserEmail] = useState(localStorage.getItem("email") || null);
  const [showLogin, setShowLogin] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/products`);
        setProducts(res.data);
        if (token) {
          await fetchCart();
          await fetchOrders();
        }
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API}/cart/view`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/orders/view`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  const addToCart = async (product) => {
    try {
      await axios.post(
        `${API}/cart/add`,
        { product_id: product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (err) {
      console.error("Failed to add to cart", err);
      alert("Add to cart failed");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.post(
        `${API}/cart/remove`,
        { product_id: productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (err) {
      console.error("Failed to remove from cart", err);
    }
  };

  const placeOrder = async () => {
    try {
      const res = await axios.post(
        `${API}/orders/place`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      fetchCart();
      fetchOrders();
    } catch (err) {
      console.error('Failed to place order', err);
      alert('Order failed');
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const res = await axios.post(
        `${API}/orders/cancel`,
        { order_id: orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      fetchOrders();
    } catch (err) {
      console.error('Failed to cancel order', err);
      alert('Cancel failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setToken(null);
    setUserEmail(null);
    setShowUserMenu(false);
    setCart([]);
    setOrders([]);
    alert('Logged out');
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-600 text-lg">Loading...</div>;
  }

  if (!token && showLogin) {
    return (
      <AuthForm
        setToken={setToken}
        setUserEmail={setUserEmail}
        setShowLogin={setShowLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <Navbar
        toggleUserMenu={() => {
          if (token) {
            setShowUserMenu(!showUserMenu);
          } else {
            setShowLogin(true);
          }
        }}
        token={token}
        setShowLogin={setShowLogin}
      />

      {showUserMenu && (
        <UserMenu
          user={{ name: userEmail }}
          cart={cart}
          orders={orders}
          logout={handleLogout}
        />
      )}

      <div className="p-4">
        <Routes>
          <Route
            path="/"
            element={
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product._id} product={product} addToCart={addToCart} />
                ))}
              </div>
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                removeFromCart={removeFromCart}
                placeOrder={placeOrder}
              />
            }
          />
          <Route
            path="/orders"
            element={
              <OrdersPage orders={orders} cancelOrder={cancelOrder} />
            }
          />
          <Route
            path="/user"
            element={
              <UserPage
                user={{ name: userEmail }}
                cart={cart}
                orders={orders}
                setUserEmail={setUserEmail}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
