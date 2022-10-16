import { createContext, ReactNode, useEffect, useState } from 'react';
import api from '../services/api';
import { ICart, IItem, ILineItem, IProductVariant } from '../types';

export interface ICartContext {
  cart?: ICart;
  cartOpen: boolean;
  setCartOpen: (val: boolean) => void;
  addToCart: (val: IProductVariant) => void;
  removeCartItem: (val: string) => void;
  incrementCartItem: (val: ILineItem) => void;
  decrementCartItem: (val: ILineItem) => void;
  clearCart: () => void;
  confirmCart: () => void;
  cartLoading: boolean;
}

const CartContext = createContext<ICartContext>({} as ICartContext);

export default function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ICart>();
  const [cartOpen, setCartOpen] = useState(false);
  const [cartId, setCartId] = useState('');
  const [cartLoading, setCartLoading] = useState(false);

  useEffect(() => {
    if (localStorage.cartId) {
      const cartId = JSON.parse(localStorage.cartId);
      setCartId(cartId);

      const loadCart = async (cartId: string) => {
        try {
          const response = await api.carts.get(cartId);
          const cartObject = response.cart;
          if (cartObject.id) {
            setCart(cartObject);
            // } else if (cartObject.length > 0) {
            // setCart(...[cartObject[0]]);
          }
        } catch (err) {
          console.error(`Error loading cart: ${err}`);
        }
      };

      loadCart(cartId);
    }
  }, []);

  async function addToCart(addedItem: IProductVariant) {
    setCartLoading(true);
    setCartOpen(true);

    try {
      const item = {
        variant_id: addedItem.id,
        quantity: 1,
      } as IItem;

      if (!cart) {
        const cart = await api.carts.create({ items: [item] });
        setCart(cart);
        setCartId(cart.id);

        localStorage.setItem('cartId', JSON.stringify(cart.id));
      } else {
        const updatedCart = await api.carts.addItem(cartId, item);
        setCart(updatedCart);
      }
    } catch (err) {
      console.error(`Error adding item to cart: ${err}`);
    } finally {
      setCartLoading(false);
    }
  }

  async function removeCartItem(itemId: string) {
    setCartLoading(true);

    try {
      const updatedCart = await api.carts.removeItem(cartId, itemId);
      setCart(updatedCart);

      if (updatedCart.items.length === 0) {
        setCartOpen(false);
      }
    } catch (err) {
      console.error(`Error removing cart item: ${err}`);
    } finally {
      setCartLoading(false);
    }
  }

  async function incrementCartItem(itemToUpdate: any) {
    setCartLoading(true);

    const item = {
      quantity: itemToUpdate.quantity + 1,
    } as IItem;

    try {
      const updatedCart = await api.carts.updateItem(cartId, itemToUpdate.id, item);
      setCart(updatedCart);
    } catch (err) {
      console.error(`Error incrementing cart item: ${err}`);
    } finally {
      setCartLoading(false);
    }
  }

  async function decrementCartItem(itemToUpdate: any) {
    setCartLoading(true);

    const item = {
      quantity: itemToUpdate.quantity - 1,
    } as IItem;

    try {
      const updatedCart = await api.carts.updateItem(cartId, itemToUpdate.id, item);
      setCart(updatedCart);

      if (updatedCart.items.length === 0) {
        setCartOpen(false);
      }
    } catch (err) {
      console.error(`Error decrementing cart item: ${err}`);
    } finally {
      setCartLoading(false);
    }
  }

  async function clearCart() {
    setCartLoading(true);

    try {
      if (cart?.items) {
        for (const item of cart?.items) {
          const updatedCart = await api.carts.removeItem(cartId, item.id);
          setCart(updatedCart);
        }
      }
    } catch (err) {
      console.error(`Error cleaning cart: ${err}`);
    } finally {
      setCartLoading(false);
      setCartOpen(false);
    }
  }

  async function confirmCart() {
    setCartLoading(true);

    try {
      let providerId = cart?.payment?.provider_id || '';
      if (!cart?.payment) {
        const updatedCart = await api.carts.createPaymentSession(cartId);
        setCart(updatedCart);
        providerId = updatedCart?.payment?.provider_id;
      }

      const cartWithPaymentSession = await api.carts.setPaymentSession(cartId, providerId);
      setCart(cartWithPaymentSession);

      await api.carts.completeCart(cartId);
      console.log('completed');
    } catch (err) {
      console.error(`Error completing cart: ${err}`);

      if (cart?.payment) {
        const cartWithNoPayment = await api.carts.removePaymentSession(cartId, cart?.payment.provider_id);
        setCart(cartWithNoPayment);
      }
    } finally {
      setCartLoading(false);
    }
  }
  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        setCartOpen,
        addToCart,
        removeCartItem,
        clearCart,
        cartLoading,
        incrementCartItem,
        decrementCartItem,
        confirmCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

const ShopConsumer = CartContext.Consumer;

export { ShopConsumer, CartContext };
