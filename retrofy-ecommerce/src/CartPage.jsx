const CartPage = ({ cart, removeFromCart, placeOrder }) => {
  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} style={styles.cartItem}>
            <h4>{item.name}</h4>
            <p>₹{item.price}</p>
            <button style={styles.removeBtn} onClick={() => removeFromCart(item._id)}>
              Remove
            </button>
          </div>
        ))
      )}
      {cart.length > 0 && (
        <button style={styles.orderBtn} onClick={placeOrder}>
          Place Order
        </button>
      )}
    </div>
  );
};

const styles = {
  cartItem: {
    marginBottom: '1rem',
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '6px'
  },
  removeBtn: {
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  orderBtn: {
    marginTop: '1rem',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default CartPage;
