import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProductPageDetails from './components/ProductPageDetails';
import ShopProvider from './context/context';

import HomePage from './pages/HomePage';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <div className="flex flex-col justify-between min-h-screen dark:bg-slate-800 dark:text-white">
          <Navbar />
          <Suspense fallback={<div>Loading</div>}>
            <Routes>
              <Route path="/">
                <Route index element={<HomePage />} />
                <Route path="products/:productId" element={<ProductPageDetails />} />
                <Route path="*" element={<div className="dark:bg-slate-800">There's nothing here...</div>} />
              </Route>
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </ShopProvider>
    </BrowserRouter>
  );
}

export default App;
