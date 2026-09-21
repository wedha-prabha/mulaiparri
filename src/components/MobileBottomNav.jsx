import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Home, ShoppingBag, History, User, Store } from 'lucide-react';

export default function MobileBottomNav() {
  const location = useLocation();
  const { totalItemsCount } = useCart();
  const { user } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-emerald-950/10 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-2">
      <div className="flex items-center justify-around">
        
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
            isActive('/') ? 'text-emerald-900 font-bold bg-emerald-50' : 'text-stone-500 hover:text-emerald-800'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Home</span>
        </Link>

        <Link
          to="/shop"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
            isActive('/shop') ? 'text-emerald-900 font-bold bg-emerald-50' : 'text-stone-500 hover:text-emerald-800'
          }`}
        >
          <Store className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Shop</span>
        </Link>

        <Link
          to="/cart"
          className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
            isActive('/cart') ? 'text-emerald-900 font-bold bg-emerald-50' : 'text-stone-500 hover:text-emerald-800'
          }`}
        >
          <ShoppingBag className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Cart</span>
          {totalItemsCount > 0 && (
            <span className="absolute top-0 right-2 bg-lime-500 text-emerald-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
              {totalItemsCount}
            </span>
          )}
        </Link>

        <Link
          to="/orders"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
            isActive('/orders') ? 'text-emerald-900 font-bold bg-emerald-50' : 'text-stone-500 hover:text-emerald-800'
          }`}
        >
          <History className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Orders</span>
        </Link>

        <Link
          to={user ? "/account" : "/login"}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
            isActive('/account') || isActive('/login') ? 'text-emerald-900 font-bold bg-emerald-50' : 'text-stone-500 hover:text-emerald-800'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">{user ? 'Account' : 'Login'}</span>
        </Link>

      </div>
    </div>
  );
}
