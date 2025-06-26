import React from 'react';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition w-full max-w-xs">
      <img
        src={`/images/${product.image}`} // 👈 assumes image is in public/images/
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

export default ProductCard;
