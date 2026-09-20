import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, User, Search, Menu, X, Leaf, History, LogOut, Sparkles, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItemsCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 glass-header border-b border-emerald-950/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-900 via-emerald-800 to-lime-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Leaf className="w-6 h-6 text-lime-300" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-emerald-950 block leading-tight font-heading">
                Mulaiparri<span className="text-lime-600">.</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700/80 block">
                முளைப்பாரி • Microgreens
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
            <input
              type="text"
              placeholder="Search Broccoli, Radish, Sunflower microgreens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-amber-50/60 border border-emerald-900/15 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-all placeholder:text-stone-400"
            />
            <Search className="w-4 h-4 text-emerald-800/60 absolute left-3.5" />
          </form>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-stone-700">
            <Link to="/" className={`hover:text-emerald-800 transition-colors ${isActive('/') ? 'text-emerald-800 font-bold border-b-2 border-emerald-800 pb-1' : ''}`}>
              Home
            </Link>
            <Link to="/shop" className={`hover:text-emerald-800 transition-colors ${isActive('/shop') ? 'text-emerald-800 font-bold border-b-2 border-emerald-800 pb-1' : ''}`}>
              Shop Microgreens
            </Link>
            <Link to="/about" className={`hover:text-emerald-800 transition-colors ${isActive('/about') ? 'text-emerald-800 font-bold border-b-2 border-emerald-800 pb-1' : ''}`}>
              Our Farms
            </Link>
            <Link to="/contact" className={`hover:text-emerald-800 transition-colors ${isActive('/contact') ? 'text-emerald-800 font-bold border-b-2 border-emerald-800 pb-1' : ''}`}>
              Contact
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-full hover:bg-emerald-100/60 text-emerald-950 transition-colors flex items-center justify-center"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-6 h-6 text-emerald-900" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-lime-500 text-emerald-950 font-extrabold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {totalItemsCount}
                </span>
              )}
            </Link>

            {/* User Account / Auth */}
            {user ? (
              <div className="relative group">
                <Link
                  to="/account"
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-emerald-900/10 border border-emerald-800/20 hover:bg-emerald-900/15 transition-all text-xs font-semibold text-emerald-950"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-mulaiparri px-4 py-2 text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-sm"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-emerald-950 hover:bg-emerald-100/60 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-emerald-900/10 px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search microgreens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-amber-50/80 border border-emerald-900/15 rounded-xl text-sm focus:outline-none"
            />
            <Search className="w-4 h-4 text-emerald-800/60 absolute left-3.5 top-3" />
          </form>

          <nav className="flex flex-col space-y-2 text-sm font-semibold text-stone-700">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-emerald-50 text-emerald-950">Home</Link>
            <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-emerald-50 text-emerald-950">Shop Catalog</Link>
            <Link to="/orders" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-emerald-50 text-emerald-950 flex items-center gap-2">
              <History className="w-4 h-4 text-emerald-700" /> My Orders & History
            </Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-emerald-50 text-emerald-950">Our Organic Process</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-emerald-50 text-emerald-950">Contact & Support</Link>

            {user ? (
              <div className="pt-2 border-t border-stone-200">
                <Link to="/account" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-emerald-50 text-emerald-950 flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-700" /> Account Settings
                </Link>
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Logout ({user.email})
                </button>
              </div>
            ) : (
              <div className="pt-2 border-t border-stone-200 flex gap-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center py-2 rounded-xl bg-emerald-900 text-white font-semibold">Login</Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center py-2 rounded-xl border border-emerald-900 text-emerald-950 font-semibold">Register</Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
