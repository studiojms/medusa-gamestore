import { Link } from 'react-router-dom';
import { IProduct } from '../types';
import { formatter } from '../utils/formatter';

const ProductCard = ({ product }: { product: IProduct }) => {
  const { id, title } = product;

  const { url } = product.images?.[0];

  const price = product.variants[0].prices[0].amount;

  return (
    <Link to={`/products/${id}`} className="group">
      <div className="w-full overflow-hidden bg-gray-200 rounded-3xl">
        <div className="relative group-hover:opacity-75 h-72">
          <img src={url} />
        </div>
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">{formatter.format(price)}</p>
    </Link>
  );
};

export default ProductCard;
