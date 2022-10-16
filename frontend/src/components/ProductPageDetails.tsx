import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import ProductForm from './ProductForm';
import { IProduct } from '../types';

function ProductPageDetails() {
  const [product, setProduct] = useState<IProduct | null>();
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (productId) {
          const product = await api.products.get(productId);
          setProduct(product.product);
        }
      } catch (err) {
        setProduct(null);
        console.error(err);
      }
    };

    fetchProduct();
  }, [productId]);

  SwiperCore.use([Navigation, Pagination]);

  return (
    <div className="dark:bg-slate-800 dark:text-gray-100">
      <div className="flex flex-col items-center justify-center w-11/12 max-w-6xl mx-auto space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-4 lg:space-x-8">
        <div className="w-full max-w-md overflow-hidden bg-white  border shadow-lg rounded-2xl md:w-1/2">
          <div className="relative w-full h-96">
            <Swiper
              style={{ '--swiper-navigation-color': '#000', '--swiper-pagination-color': '#000' }}
              navigation
              pagination={{ clickable: true }}
              className="h-96 rounded-2xl"
              loop={true}
            >
              {product?.images.map((image) => (
                <SwiperSlide key={`slide-${image.id}`}>
                  <img src={image.url} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        {product && <ProductForm product={product} />}
      </div>
      <p className="w-11/12 max-w-3xl pt-16 mx-auto space-y-8 md:space-x-4 lg:space-x-8">{product?.description}</p>
    </div>
  );
}

export default ProductPageDetails;
