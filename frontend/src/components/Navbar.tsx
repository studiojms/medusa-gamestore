import { Switch } from '@headlessui/react';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext, ICartContext } from '../context/context';
import CartSidebar from './CartSidebar';

function Navbar() {
  const { cart, cartOpen, setCartOpen } = useContext<ICartContext>(CartContext);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (localStorage.theme) {
      const savedTheme = JSON.parse(localStorage.theme);
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light');
    root.classList.remove('dark');
    root.classList.add(theme);

    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <header className="border-b sticky top-0 z-20 bg-white dark:bg-slate-800 dark:text-white dark:border-slate-600">
      <div className="flex items-center justify-between max-w-6xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl">
        <Link to="/" className="cursor-pointer">
          <span className="text-lg pt-1 font-bold">Medusa Gamestore</span>
        </Link>
        <div>
          <a className="text-md font-bold cursor-pointer pr-5" onClick={() => setCartOpen(!cartOpen)}>
            Cart ({cart?.items?.length || 0})
          </a>
          <Switch
            checked={theme === 'dark'}
            onChange={toggleTheme}
            className={`${theme === 'dark' ? 'bg-gray-100' : 'bg-gray-900'}
            relative inline-flex h-[16px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Use dark mode</span>
            <span
              aria-hidden="true"
              className={`${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}
              pointer-events-none inline-block h-[12px] w-[12px] transform rounded-full bg-white dark:bg-slate-800 shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
          {cart && <CartSidebar cart={cart} />}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
