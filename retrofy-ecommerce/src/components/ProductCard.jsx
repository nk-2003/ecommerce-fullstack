import React from 'react';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow hover:shadow-xl transition-all duration-200 w-full max-w-xs mx-auto text-center">
      <img
        src={`/images/${product.image}`}
        onError={(e) => { e.target.src = '/images/placeholder.jpg'; }}
        alt={product.name}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <p className="text-green-600 font-bold mb-2">₹{product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg font-medium transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
