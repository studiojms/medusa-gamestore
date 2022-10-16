import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

interface CheckoutDialogProps {
  loading: boolean;
  onConfirm: () => void;
}
function CheckoutDialog({ loading, onConfirm }: CheckoutDialogProps) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="mt-6">
        <button
          onClick={openModal}
          className={`w-full flex items-center justify-center px-6 py-3 text-base font-medium text-white dark:text-slate-700 bg-black dark:bg-slate-100 border border-transparent rounded-md shadow-sm hover:bg-gray-800 dark:hover:bg-slate-300 ${
            loading ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          Checkout
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Checkout confirmation
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Do you confirm purchasing the selected items? It will be automatically added to your credit card.
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-black "
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none "
                        onClick={() => {
                          onConfirm();
                          closeModal();
                        }}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default CheckoutDialog;
