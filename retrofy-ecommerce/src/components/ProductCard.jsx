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
    <div className="bg-white p-3 rounded-lg shadow-md hover:shadow-xl transition-all w-full">
      <img
        src={`/images/${product.image}`}
        alt={product.name}
        className="w-full h-32 object-contain rounded-md transition-transform duration-300 hover:scale-105"
      />
      <h3
        className="text-base font-semibold mt-2 text-center truncate"
        title={product.name}
      >
        {product.name}
      </h3>
      <p className="text-green-600 font-bold text-center text-sm">
        ₹{product.price}
      </p>
      {/* Optional stock placeholder */}
      {/* <p className="text-xs text-gray-500 text-center">In Stock</p> */}

      <button
        onClick={handleAddToCart}
        className="mt-3 w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded text-sm font-medium"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
