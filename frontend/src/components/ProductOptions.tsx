import { IProductOptionValue } from '../types';

interface IProductOptionsProps {
  optionId: string;
  name: string;
  values: IProductOptionValue[];
  selectedOptions: Record<string, unknown>;
  setOptions: (name: string, value: string) => void;
}
function ProductOptions({ optionId, name, values, selectedOptions, setOptions }: IProductOptionsProps) {
  return (
    <fieldset className="mt-3">
      <legend className="text-xl font-semibold">{name}</legend>
      <div className="inline-flex items-center flex-wrap">
        {values.map(({ id, value }) => {
          const checked = selectedOptions[optionId] === value;

          return (
            <label key={id} htmlFor={id}>
              <input
                className="sr-only"
                type="radio"
                id={id}
                name={`option-${optionId}`}
                value={value}
                checked={checked}
                onChange={() => {
                  setOptions(optionId, value);
                }}
              />
              <div
                className={`p-2 mt-3 text-lg rounded-full block cursor-pointer mr-3 ${
                  checked
                    ? 'text-white dark:text-slate-800 bg-gray-900 dark:bg-gray-100'
                    : 'text-gray-900 dark:text-white bg-gray-200 dark:bg-slate-800'
                }`}
              >
                <span className="px-2">{value}</span>
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default ProductOptions;
