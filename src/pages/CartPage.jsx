import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, 
  Tag, ShieldCheck, Truck, Sparkles 
} from 'lucide-react';

export default function CartPage() {
  const { 
    items, updateQuantity, removeFromCart, clearCart, 
    subtotal, discountAmount, deliveryFee, totalAmount, 
    coupon, applyCoupon 
  } = useCart();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-900/10 flex items-center justify-center mx-auto text-emerald-800">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-emerald-950 font-heading">Your Cart is Empty</h2>
          <p className="text-xs text-stone-500">Explore our organic microgreens and order freshly harvested trays!</p>
        </div>
        <Link to="/shop" className="btn-mulaiparri inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold shadow-lg">
          <span>Explore Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-emerald-950 font-heading">Shopping Cart</h1>
          <p className="text-xs text-stone-500">Review your selected organic microgreen packs</p>
        </div>
        <button onClick={clearCart} className="text-xs text-stone-400 hover:text-red-600 underline">
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div key={item.cartKey} className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4 sm:gap-6">
              
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0 bg-stone-100"
              />

              <div className="flex-1 min-w-0 space-y-1">
                {item.tamilName && (
                  <span className="text-[10px] text-emerald-700 font-semibold block">{item.tamilName}</span>
                )}
                <h3 className="font-bold text-emerald-950 text-base font-heading truncate">
                  <Link to={`/product/${item.id}`}>{item.name}</Link>
                </h3>
                <span className="inline-block bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-900/10">
                  Size: {item.selectedSize}
                </span>

                <div className="pt-2 flex items-center gap-4">
                  <div className="inline-flex items-center border border-stone-200 rounded-lg bg-stone-50 p-0.5">
                    <button
                      onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                      className="p-1 text-stone-600 hover:bg-stone-200 rounded"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                      className="p-1 text-stone-600 hover:bg-stone-200 rounded"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.cartKey)}
                    className="text-stone-400 hover:text-red-600 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-lg font-extrabold text-emerald-950 block">₹{item.price * item.quantity}</span>
                <span className="text-[10px] text-stone-400">₹{item.price} each</span>
              </div>

            </div>
          ))}

          <Link to="/shop" className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 hover:text-emerald-900 pt-2">
            <ArrowLeft className="w-4 h-4" /> Add More Microgreens
          </Link>
        </div>

        {/* Order Summary & Coupon Card */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Coupon Entry */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5 font-heading">
              <Tag className="w-4 h-4 text-lime-600" /> Apply Coupon Code
            </h4>
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter FRESH20"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-xl text-xs uppercase font-bold focus:ring-2 focus:ring-emerald-700 outline-none"
              />
              <button type="submit" className="btn-mulaiparri px-4 py-2 text-xs font-semibold">
                Apply
              </button>
            </form>
            {coupon && (
              <p className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                ✓ Coupon {coupon.code} active ({coupon.discountPercent}% OFF)
              </p>
            )}
            {couponError && <p className="text-xs text-red-500">{couponError}</p>}
          </div>

          {/* Summary Breakdown */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-emerald-950 font-heading border-b border-stone-100 pb-3">
              Order Summary
            </h3>

            <div className="space-y-2.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-800">₹{subtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Discount ({coupon?.code})</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="font-semibold text-stone-800">
                  {deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${deliveryFee}`}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
              <span className="text-sm font-bold text-emerald-950">Grand Total</span>
              <span className="text-2xl font-extrabold text-emerald-950">₹{totalAmount}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full btn-mulaiparri-accent py-4 text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Proceed to Razorpay Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Razorpay 256-bit Encrypted SSL</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
