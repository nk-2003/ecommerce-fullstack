import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import LoadingCard from './LoadingCard';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {loading
        ? Array(4).fill().map((_, index) => <LoadingCard key={index} />)
        : products.map((product) => (
            <ProductCard key={product._id} product={product} addToCart={() => console.log('Add:', product._id)} />
          ))}
    </div>
  );
};

export default ProductsPage;
