const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-green-600 font-bold">₹{product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-2 bg-yellow-400 text-black py-1 px-4 rounded hover:bg-yellow-500"
      >
        Add to Cart
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    padding: '1rem',
    borderRadius: '8px',
    textAlign: 'center',
    width: '200px',
    backgroundColor: '#fff'
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover'
  },
  button: {
    marginTop: '0.5rem',
    backgroundColor: '#222',
    color: 'white',
    border: 'none',
    padding: '0.5rem',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default ProductCard;
