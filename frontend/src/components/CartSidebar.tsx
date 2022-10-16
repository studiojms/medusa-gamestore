import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CartContext, ICartContext } from '../context/context';
import { ICart } from '../types';
import { formatter } from '../utils/formatter';
import CheckoutDialog from './CheckoutDialog';

export default function CartSidebar({ cart }: { cart: ICart }) {
  const cancelButtonRef = useRef(null);

  const {
    cartOpen,
    setCartOpen,
    removeCartItem,
    clearCart,
    cartLoading,
    incrementCartItem,
    decrementCartItem,
    confirmCart,
  } = useContext<ICartContext>(CartContext);

  return (
    <Transition.Root show={cartOpen || false} as={Fragment}>
      <Dialog
        initialFocus={cancelButtonRef}
        as="div"
        className="fixed inset-0 z-50 overflow-hidden"
        onClose={() => {
          setCartOpen(!cartOpen);
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl dark:bg-slate-800">
                  <div className="flex-1 px-4 py-6 overflow-y-auto sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-slate-100">
                        Shopping cart
                      </Dialog.Title>
                      <div className="flex items-center ml-3 h-7">
                        <button
                          ref={cancelButtonRef}
                          type="button"
                          className="p-2 -m-2 text-gray-400 hover:text-gray-500 dark:text-slate-300 "
                          onClick={() => setCartOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        {cart?.items.length > 0 ? (
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cart.items.map((lineItem) => (
                              <li key={lineItem.id + Math.random()} className="relative flex py-6">
                                <div
                                  className={`top-0 left-0 right-0 z-50 w-full h-full absolute ${
                                    cartLoading ? 'bg-white dark:bg-slate-800 opacity-60' : 'hidden'
                                  }`}
                                ></div>
                                <div className="relative flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
                                  <img src={lineItem.thumbnail || ''} alt={lineItem.title} />
                                </div>

                                <div className="flex flex-col flex-1 ml-4">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                      <h3>
                                        <Link to={`/products/${lineItem.id}`} onClick={() => setCartOpen(false)}>
                                          {lineItem.title}
                                        </Link>
                                      </h3>
                                      <p className="ml-4">{formatter.format(lineItem.subtotal || 0)}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                                      {lineItem.variant.title}
                                    </p>
                                  </div>
                                  <div className="flex items-end justify-between flex-1 text-sm dark:text-gray-100">
                                    <div className={`border`}>
                                      <button
                                        className="px-2"
                                        onClick={() => decrementCartItem(lineItem)}
                                        disabled={cartLoading}
                                      >
                                        -
                                      </button>
                                      <span className="px-2 border-l border-r">{lineItem.quantity}</span>
                                      <button
                                        className="px-2"
                                        onClick={() => incrementCartItem(lineItem)}
                                        disabled={cartLoading}
                                      >
                                        +
                                      </button>
                                    </div>
                                    <div className="flex">
                                      <button
                                        onClick={() => removeCartItem(lineItem.id)}
                                        type="button"
                                        className="font-medium text-gray-500 hover:text-gray-800 dark:text-slate-300 dark:hover:text-gray-200"
                                        disabled={cartLoading}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="dark:text-slate-400">
                            <p>Nothing in your cart!</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {cart?.items.length > 0 ? (
                    <div className="px-4 py-6 border-t border-gray-200 sm:px-6 dark:border-slate-400 ">
                      <div className="flex justify-between text-base font-medium text-gray-900 dark:text-slate-300">
                        <p>Subtotal</p>
                        <p>{formatter.format(cart.subtotal || 0)}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500 dark:text-slate-400">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <CheckoutDialog loading={cartLoading} onConfirm={confirmCart} />
                      <div className="flex justify-center mt-6 text-sm text-center text-gray-500 dark:text-slate-400">
                        <p>
                          <button
                            onClick={clearCart}
                            className="font-medium hover:text-gray-800 dark:hover:text-slate-100"
                          >
                            Clear Cart
                          </button>{' '}
                          or{' '}
                          <button
                            type="button"
                            className="font-medium hover:text-gray-800 dark:hover:text-slate-100"
                            onClick={() => setCartOpen(false)}
                          >
                            Continue Shopping<span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
