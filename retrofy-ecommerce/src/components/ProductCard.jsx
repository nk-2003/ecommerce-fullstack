import React from 'react';

const ProductCard = ({ product, addToCart }) => {
  const handleAddToCart = () => {
    if (typeof addToCart === 'function') {
      addToCart(product._id);
    } else {
      console.error("addToCart is not a function");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all w-full max-w-xs">
      <img
        src={`/images/${product.image}`}
        alt={product.name}
        className="w-full h-48 object-contain rounded-md"
      />
      <h3 className="text-lg font-semibold mt-3 text-center">{product.name}</h3>
      <p className="text-green-600 font-bold text-center">₹{product.price}</p>
      <button
        onClick={handleAddToCart}
        className="mt-3 w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded font-medium"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
