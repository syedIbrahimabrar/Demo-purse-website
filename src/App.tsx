/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ScrollToTop } from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CollectionsPage } from './pages/CollectionsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] font-sans antialiased text-[#131B24] flex flex-col selection:bg-[#131B24] selection:text-[#F8F6F2]">
      <ScrollToTop />
      <CartDrawer />

      {/* 
        On non-homepage routes, display the persistent luxury Navbar at top.
        On the homepage, the existing approved HeroSection houses the top navigation.
      */}
      {!isHomePage && <Navbar />}

      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Global Dark Navy Luxury Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <MainLayout />
      </CartProvider>
    </BrowserRouter>
  );
}
