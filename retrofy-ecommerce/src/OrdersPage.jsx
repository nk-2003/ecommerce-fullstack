const OrdersPage = ({ orders, cancelOrder }) => {
  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((item, index) => (
          <div key={index} style={styles.orderItem}>
            <h4>{item.name}</h4>
            <p>₹{item.price}</p>
            <button style={styles.cancelBtn} onClick={() => cancelOrder(item.order_id)}>
              Cancel Order
            </button>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  orderItem: {
    marginBottom: '1rem',
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '6px'
  },
  cancelBtn: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default OrdersPage;
