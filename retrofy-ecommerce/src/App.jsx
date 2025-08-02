import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar";
import CartPage from "./components/CartPage";
import UserMenu from "./components/UserMenu";
import AuthForm from "./components/AuthForm";
import ProductCard from "./components/ProductCard";
import Spinner from "./components/Spinner"; // ✅ Circular loader

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [email, setUserEmail] = useState(localStorage.getItem("email") || "");
  const [user, setUser] = useState({ name: "", email: "" });
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL;

  // 🔁 Fisher-Yates shuffle
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // 🧠 Fetch user details
  useEffect(() => {
    if (token) {
      axios
        .get(`${API}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser({
            name: res.data.name,
            email: res.data.email,
          });
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("email", res.data.email);
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err);
          setUser({ name: "Guest", email: "Not available" });
        });
    }
  }, [token]);

  // 📦 Fetch + shuffle products
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API}/products`)
      .then((res) => {
        const shuffled = shuffleArray(res.data);
        setProducts(shuffled);
      })
      .catch((err) => console.error("Failed to load products:", err))
      .finally(() => setLoading(false));
  }, []);

  // 📦 Fetch orders
  const fetchOrders = () => {
    if (token) {
      axios
        .get(`${API}/orders/view`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setOrders(res.data))
        .catch((err) => console.error("Failed to load orders:", err));
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  // ➕ Add to Cart
  const addToCart = (product_id) => {
    if (!token) {
      alert("Please login first");
      setShowLogin(true);
      return;
    }

    axios
      .post(
        `${API}/cart/add`,
        { product_id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        alert("Added to cart!");
        fetchCart();
      })
      .catch((err) => console.error("Add to cart failed:", err));
  };

  // 🛒 Fetch Cart
  const fetchCart = () => {
    if (token) {
      axios
        .get(`${API}/cart/view`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setCart(res.data))
        .catch((err) => console.error("Failed to fetch cart:", err));
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  // 🚪 Logout
  const logout = () => {
    setToken("");
    setUserEmail("");
    localStorage.clear();
    setShowUserMenu(false);
    setCart([]);
    setOrders([]);
    setShowCart(false);
  };

  // 🔍 Filtered product list
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar
        toggleUserMenu={() => setShowUserMenu(!showUserMenu)}
        token={token}
        setShowLogin={setShowLogin}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cart={cart}
        setShowCart={() => setShowCart(!showCart)}
      />

      <main className="p-4">
        {token && showCart ? (
          <CartPage
            cart={cart}
            setCart={setCart}
            token={token}
            removeFromCart={(id) =>
              axios
                .post(
                  `${API}/cart/remove`,
                  { product_id: id },
                  { headers: { Authorization: `Bearer ${token}` } }
                )
                .then(() => fetchCart())
                .catch((err) => console.error("Failed to remove:", err))
            }
            placeOrder={() => {
              axios
                .post(
                  `${API}/orders/place`,
                  {},
                  { headers: { Authorization: `Bearer ${token}` } }
                )
                .then(() => {
                  alert("Order placed");
                  setCart([]);
                  fetchOrders();
                  setShowCart(false);
                })
                .catch(() => alert("Order failed"));
            }}
          />
        ) : loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        )}
      </main>

      {showUserMenu && token && (
        <UserMenu
          user={user}
          cart={cart}
          orders={orders}
          logout={logout}
          reloadOrders={fetchOrders}
          onClose={() => setShowUserMenu(false)}
        />
      )}

      {showLogin && (
        <AuthForm
          setToken={setToken}
          setUserEmail={setUserEmail}
          setShowLogin={setShowLogin}
        />
      )}
    </div>
  );
};

export default App;
