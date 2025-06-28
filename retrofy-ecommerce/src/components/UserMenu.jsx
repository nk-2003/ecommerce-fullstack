import React from 'react';

const UserMenu = ({ user, cart, orders, logout }) => {
  return (
    <div style={styles.menuContainer}>
      <div style={styles.section}>
        <h3>User: {user.name}</h3>
      </div>

      <div style={styles.section}>
        <h4>Cart:</h4>
        {cart.length === 0 ? <p>Cart is empty</p> : cart.map((item, idx) => (
          <div key={idx}>
            <p>{item.name} - ₹{item.price}</p>
          </div>
        ))}
      </div>

      <div style={styles.section}>
        <h4>Orders:</h4>
        {orders.length === 0 ? <p>No orders yet</p> : orders.map(order => (
          <div key={order.order_id}>
            <p><strong>Order #{order.order_id.slice(-6)}</strong></p>
            {order.products.map(prod => (
              <div key={prod._id} style={{ marginLeft: '1rem' }}>
                <p>{prod.name} - ₹{prod.price}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={styles.logoutContainer}>
        <button style={styles.logoutBtn} onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default UserMenu;
