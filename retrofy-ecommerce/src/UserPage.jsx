import React from 'react';

const UserPage = ({ user, cart, orders, setUser }) => {
  // ✅ Cancel Order Function
  const cancelOrder = async (orderId) => {
    try {
      const res = await fetch('http://localhost:5000/orders/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ order_id: orderId })
      });

      const data = await res.json();
      alert(data.message || data.error);
      window.location.reload(); // Refresh orders after cancel
    } catch (error) {
      alert("Cancel failed");
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>User: {user?.name || "Guest"}</h2>

      {/* 🛒 Cart Section */}
      <div style={styles.section}>
        <h3>🛒 Cart</h3>
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          cart.map((item, index) => (
            <p key={index}>{item.name} - ₹{item.price}</p>
          ))
        )}
      </div>

      {/* 📦 Orders Section */}
      <div style={styles.section}>
        <h3>📦 Orders</h3>
        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          orders.map(order => (
            <div key={order.order_id} style={styles.orderBox}>
              <h4>Order #{order.order_id.slice(-6)}</h4>

              {order.products.map(product => (
                <div key={product._id} style={styles.orderItem}>
                  <p>{product.name}</p>
                  <p>₹{product.price}</p>
                </div>
              ))}

              <button
                style={styles.cancelBtn}
                onClick={() => cancelOrder(order.order_id)}
              >
                Cancel Order
              </button>
            </div>
          ))
        )}
      </div>

      {/* 🚪 Logout Button */}
      <button onClick={() => setUser(null)} style={styles.logoutBtn}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem'
  },
  section: {
    marginTop: '1rem',
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px'
  },
  logoutBtn: {
    marginTop: '2rem',
    backgroundColor: '#ff4444',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    position: 'fixed',
    bottom: '1rem',
    right: '1rem'
  },
  cancelBtn: {
    marginTop: '0.5rem',
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  orderBox: {
    border: '1px solid #ccc',
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '6px',
    backgroundColor: '#f9f9f9'
  },
  orderItem: {
    marginLeft: '1rem'
  }
};

export default UserPage;
