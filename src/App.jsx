import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';

import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import NotificationBanner from './components/NotificationBanner';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function ToastContainer() {
  const { toastMessage } = useCart();
  if (!toastMessage) return null;
  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-50 bg-emerald-950 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl border border-emerald-700/60 animate-in slide-in-from-bottom flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping"></span>
      <span>{toastMessage}</span>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NotificationProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-[#FAF6F0] selection:bg-emerald-200 selection:text-emerald-900">
              <NotificationBanner />
              <Navbar />
              
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-success/:id" element={<OrderSuccessPage />} />
                  <Route path="/orders" element={<OrderHistoryPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
              </main>

              <Footer />
              <MobileBottomNav />
              <ToastContainer />
            </div>
          </Router>
        </NotificationProvider>
      </CartProvider>
    </AuthProvider>
  );
}
