import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('mulaiparri_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [coupon, setCoupon] = useState(null); // { code: 'FRESH20', discountPercent: 20 }
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('mulaiparri_cart', JSON.stringify(items));
    if (user) {
      fetch(`/api/cart/${user.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
      }).catch(err => console.error('Cart sync error:', err));
    }
  }, [items, user]);

  const showToast = (text) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToCart = (product, selectedSize = null, qty = 1) => {
    const packSize = selectedSize || (product.availableSizes ? product.availableSizes[0].size : '100g');
    const packPrice = selectedSize && product.availableSizes 
      ? (product.availableSizes.find(s => s.size === selectedSize)?.price || product.price)
      : product.price;

    const cartKey = `${product.id}-${packSize}`;

    setItems(prev => {
      const existingIndex = prev.findIndex(item => item.cartKey === cartKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [...prev, {
          cartKey,
          id: product.id,
          name: product.name,
          tamilName: product.tamilName || '',
          price: packPrice,
          selectedSize: packSize,
          image: product.image,
          quantity: qty,
          harvestCycleDays: product.harvestCycleDays || 7
        }];
      }
    });

    showToast(`Added ${product.name} (${packSize}) to cart! 🌱`);
  };

  const updateQuantity = (cartKey, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartKey);
      return;
    }
    setItems(prev => prev.map(item => item.cartKey === cartKey ? { ...item, quantity: newQty } : item));
  };

  const removeFromCart = (cartKey) => {
    setItems(prev => prev.filter(item => item.cartKey !== cartKey));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'FRESH20' || cleanCode === 'MULAIPARRI20') {
      setCoupon({ code: cleanCode, discountPercent: 20 });
      showToast('20% Organic Discount Applied! 🌿');
      return { success: true, message: '20% Discount Applied!' };
    } else if (cleanCode === 'FIRST50') {
      setCoupon({ code: cleanCode, discountPercent: 15 });
      showToast('15% First Harvest Discount Applied!');
      return { success: true, message: '15% First Harvest Discount Applied!' };
    } else {
      return { success: false, message: 'Invalid coupon code. Try FRESH20' };
    }
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = coupon ? Math.round((subtotal * coupon.discountPercent) / 100) : 0;
  const deliveryFee = subtotal > 499 ? 0 : 40;
  const totalAmount = Math.max(0, subtotal - discountAmount + (items.length > 0 ? deliveryFee : 0));
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      subtotal,
      discountAmount,
      deliveryFee,
      totalAmount,
      totalItemsCount,
      coupon,
      applyCoupon,
      toastMessage,
      showToast
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
