import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/context';
import { IProduct, IProductOption } from '../types';
import { formatter } from '../utils/formatter';
import ProductOptions from './ProductOptions';

interface IProductFormProps {
  product: IProduct;
}

function ProductForm({ product }: IProductFormProps) {
  const [available, setAvailable] = useState(true);

  const { addToCart } = useContext(CartContext);

  const defaultValues: Record<string, any> = {};
  product.options.forEach((opt: IProductOption) => {
    defaultValues[opt.id] = opt.values[0].value;
  });

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedOptions, setSelectedOptions] = useState(defaultValues);

  function setOptions(name: string, value: string) {
    setSelectedOptions((prevState) => {
      return { ...prevState, [name]: value };
    });

    const selection = {
      ...selectedOptions,
      [name]: value,
    };

    product.variants.map((item) => {
      if (JSON.stringify(item.options) === JSON.stringify(selection)) {
        setSelectedVariant(item);
      }
    });
  }

  useEffect(() => {
    if (product) {
      const checkAvailable = product?.variants.filter((item) => item.id === selectedVariant.id);

      if (checkAvailable[0]?.inventory_quantity > 0) {
        setAvailable(true);
      } else {
        setAvailable(false);
      }
    }
  }, [product, selectedVariant]);

  return (
    <div className="flex flex-col w-full p-4 shadow-lg rounded-2xl md:w-1/3">
      <h2 className="text-2xl font-bold">{product.title}</h2>
      <span className="pb-3">{formatter.format(selectedVariant.prices[0].amount)}</span>
      {product.options.map(({ id, values, title }) => (
        <ProductOptions
          key={`key-${id}`}
          name={title}
          optionId={id}
          values={values}
          selectedOptions={selectedOptions}
          setOptions={setOptions}
        />
      ))}
      {available ? (
        <button
          onClick={() => {
            addToCart(selectedVariant);
          }}
          className="px-2 py-3 mt-3 text-white bg-black rounded-lg hover:bg-gray-800 dark:bg-gray-200 dark:text-slate-800 dark:hover:bg-gray-100"
        >
          Add To Card
        </button>
      ) : (
        <button className="px-2 py-3 mt-3 text-white bg-gray-800 rounded-lg cursor-not-allowed">Sold out!</button>
      )}
    </div>
  );
}

export default ProductForm;
