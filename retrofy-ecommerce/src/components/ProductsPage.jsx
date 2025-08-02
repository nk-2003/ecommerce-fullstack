import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import LoadingCard from './LoadingCard'; // If you use Spinner, import Spinner instead

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🌀 Fisher-Yates Shuffle Function
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // 📦 Fetch and shuffle products
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
      const data = await res.json();
      const shuffled = shuffleArray(data); // 🔁 shuffle before displaying
      setProducts(shuffled);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // 👈 Run once when the component mounts
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {loading
        ? Array(4)
            .fill()
            .map((_, index) => <LoadingCard key={index} />)
        : products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              addToCart={() => console.log('Add:', product._id)}
            />
          ))}
    </div>
  );
};

export default ProductsPage;
