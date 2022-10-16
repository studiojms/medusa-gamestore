import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';
import api from '../services/api';

function HomePage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsList = await api.products.list();
        setProducts(productsList.products);
      } catch (err) {
        setProducts([]);
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Hero />
      <ProductList products={products} />
    </>
  );
}

export default HomePage;
