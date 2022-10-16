import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext, ICartContext } from '../context/context';
import CartSidebar from './CartSidebar';

function Navbar() {
  const { cart, cartOpen, setCartOpen } = useContext<ICartContext>(CartContext);

  let cartQuantity = cart?.items?.length || 0;

  return (
    <header className="border-b sticky top-0 z-20 bg-white dark:bg-slate-800 dark:text-white dark:border-slate-600">
      <div className="flex items-center justify-between max-w-6xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl">
        <Link to="/" className="cursor-pointer">
          <span className="text-lg pt-1 font-bold">Medusa Gamestore</span>
        </Link>
        <a className="text-md font-bold cursor-pointer" onClick={() => setCartOpen(!cartOpen)}>
          Cart ({cartQuantity})
        </a>
        {cart && <CartSidebar cart={cart} />}
      </div>
    </header>
  );
}

export default Navbar;
