import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  Star, ShoppingBag, ArrowLeft, ShieldCheck, Clock, Droplets, 
  Leaf, CheckCircle2, Plus, Minus, Share2, Sparkles 
} from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.product) {
          setProduct(data.product);
          if (data.product.availableSizes && data.product.availableSizes.length > 0) {
            setSelectedSize(data.product.availableSizes[0].size);
          }
        }
      })
      .catch(err => console.error('Error loading product details:', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8 animate-shimmer h-96 rounded-3xl"></div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-stone-800">Product Not Found</h2>
        <Link to="/shop" className="btn-mulaiparri px-4 py-2 text-xs">Back to Shop</Link>
      </div>
    );
  }

  const currentPrice = selectedSize && product.availableSizes
    ? (product.availableSizes.find(s => s.size === selectedSize)?.price || product.price)
    : product.price;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Back Button */}
      <Link to="/shop" className="inline-flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-emerald-950">
        <ArrowLeft className="w-4 h-4" /> Back to Microgreen Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Product Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative rounded-3xl overflow-hidden border border-stone-200 shadow-lg bg-stone-100 h-96 sm:h-[450px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-emerald-900 text-lime-300 font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
              {product.badge || 'Hydro-Organic'}
            </span>
            <span className="absolute top-4 right-4 bg-white/95 text-emerald-950 font-bold text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {product.rating} ({product.reviewsCount} reviews)
            </span>
          </div>

          <div className="p-4 bg-amber-50/60 rounded-2xl border border-emerald-900/10 flex items-center justify-between text-xs text-stone-600">
            <span className="flex items-center gap-1.5 font-medium text-emerald-900">
              <Clock className="w-4 h-4 text-emerald-700" /> Harvest Cycle: {product.harvestCycleDays || 8} Days
            </span>
            <span className="flex items-center gap-1.5 font-medium text-emerald-900">
              <Droplets className="w-4 h-4 text-emerald-700" /> 100% Hydroponic RO Water
            </span>
          </div>
        </div>

        {/* Right Column: Product Details & Size Selector */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="space-y-2 border-b border-stone-200 pb-6">
            {product.tamilName && (
              <span className="text-sm font-semibold text-emerald-700 block">
                {product.tamilName}
              </span>
            )}
            <h1 className="text-3xl font-extrabold text-emerald-950 font-heading">
              {product.name}
            </h1>
            <p className="text-sm font-medium text-stone-500">
              Flavor profile: <strong className="text-emerald-900">{product.flavor}</strong>
            </p>

            <div className="pt-2 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-emerald-950">₹{currentPrice * quantity}</span>
              <span className="text-xs text-stone-400">Tax included • Free shipping above ₹499</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {product.description}
          </p>

          {/* Pack Size Selector */}
          {product.availableSizes && product.availableSizes.length > 0 && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                Select Pack Size / Format:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {product.availableSizes.map(sizeObj => (
                  <button
                    key={sizeObj.size}
                    type="button"
                    onClick={() => setSelectedSize(sizeObj.size)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center transition-all ${
                      selectedSize === sizeObj.size
                        ? 'border-emerald-800 bg-emerald-900 text-white shadow-md'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <span>{sizeObj.size}</span>
                    <span className={`text-[10px] ${selectedSize === sizeObj.size ? 'text-lime-300' : 'text-stone-400'}`}>
                      ₹{sizeObj.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
              Quantity:
            </label>
            <div className="inline-flex items-center border border-stone-300 rounded-xl bg-white p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 text-stone-600 hover:bg-stone-100 rounded-lg"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-bold text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 text-stone-600 hover:bg-stone-100 rounded-lg"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 btn-mulaiparri py-4 text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Add to Cart (₹{currentPrice * quantity})</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 btn-mulaiparri-accent py-4 text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Buy Now with Razorpay</span>
            </button>
          </div>

          {/* Health Benefits Pills */}
          {product.benefits && (
            <div className="pt-6 border-t border-stone-200 space-y-3">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">Nutritional Highlights:</h4>
              <div className="grid grid-cols-2 gap-2">
                {product.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-stone-700 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-900/10">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
