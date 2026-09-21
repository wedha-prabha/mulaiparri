import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  Leaf, Sparkles, ArrowRight, ShieldCheck, HeartPulse, Zap, Sun, 
  CheckCircle, Star, ShoppingBag, Plus, Clock, Droplets, Compass
} from 'lucide-react';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/products?isFeatured=true')
      .then(res => res.json())
      .then(data => {
        if (data.products) setFeaturedProducts(data.products.slice(0, 4));
      })
      .catch(err => console.error('Error fetching featured products:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 md:py-24 bg-gradient-to-b from-amber-50/50 via-emerald-50/30 to-amber-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/10 border border-emerald-800/20 text-emerald-950 text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>Harvested Daily in Chennai & Coimbatore</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-emerald-950 leading-[1.15] font-heading">
                Living Microgreens <br />
                <span className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-lime-600 bg-clip-text text-transparent">
                  Cut Fresh For Your Plate.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
                Experience <strong>Mulaiparri (முளைப்பாரி)</strong> — nutrient-dense organic microgreens with up to 40x higher antioxidants than mature greens. Harvested to order and delivered in eco-containers or live growing trays.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/shop"
                  className="btn-mulaiparri px-7 py-3.5 text-base flex items-center gap-2 shadow-lg shadow-emerald-900/20"
                >
                  <span>Explore Microgreens</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  to="/about"
                  className="px-6 py-3.5 rounded-xl border-2 border-emerald-900/20 text-emerald-950 font-semibold hover:bg-emerald-900/5 transition-colors text-base"
                >
                  Why Mulaiparri?
                </Link>
              </div>

              {/* Badges bar */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-emerald-950/10 max-w-lg">
                <div>
                  <div className="text-2xl font-extrabold text-emerald-950 font-heading">40x</div>
                  <div className="text-xs text-stone-500 font-medium">Nutrient Concentration</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-emerald-950 font-heading">24 hrs</div>
                  <div className="text-xs text-stone-500 font-medium">Farm to Fork Delivery</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-emerald-950 font-heading">100%</div>
                  <div className="text-xs text-stone-500 font-medium">Chemical-Free Hydro</div>
                </div>
              </div>
            </div>

            {/* Hero Image / Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-600 to-lime-500 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80"
                    alt="Fresh Organic Microgreens"
                    className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                    <span className="px-3 py-1 rounded-full bg-lime-500 text-emerald-950 text-xs font-bold uppercase tracking-wider">
                      Live Harvest Available
                    </span>
                    <h3 className="text-xl font-bold font-heading">Broccoli & Sunflower Sprout Trays</h3>
                    <p className="text-xs text-emerald-200">Grown with purified RO water and non-GMO heirloom seeds.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Intro to Mulaiparri Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 to-stone-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-lime-400 text-xs uppercase tracking-widest font-bold">
                <Compass className="w-4 h-4" />
                <span>The Heritage of Sprouting</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">
                What is Mulaiparri (முளைப்பாரி)?
              </h2>
              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
                In Tamil tradition, <em>Mulaiparri</em> represents the ancient practice of germinated grain sprouts cultivated in earthen pots during harvest festivals as a symbol of life, vitality, and prosperity.
              </p>
              <p className="text-emerald-200/80 text-xs sm:text-sm leading-relaxed">
                We combine this revered heritage with modern vertical hydroponic urban farming to deliver living microgreens packed with enzyme power straight to your kitchen table.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <Link
                to="/about"
                className="btn-mulaiparri-accent px-6 py-3.5 text-sm font-bold flex items-center gap-2"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Microgreens Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-1">
              Fresh From Our Greenhouses
            </span>
            <h2 className="text-3xl font-extrabold text-emerald-950 font-heading">
              Featured Microgreen Varieties
            </h2>
          </div>
          <Link to="/shop" className="text-emerald-800 hover:text-emerald-900 font-semibold text-sm flex items-center gap-1">
            View All Microgreens ({featuredProducts.length}+) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="h-80 rounded-2xl animate-shimmer"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="organic-card group flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="relative h-48 overflow-hidden bg-stone-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-emerald-900/90 backdrop-blur-sm text-lime-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {product.badge || product.category}
                    </span>
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-emerald-950 text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {product.rating}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    {product.tamilName && (
                      <span className="text-[11px] font-medium text-emerald-700 block">
                        {product.tamilName}
                      </span>
                    )}
                    <h3 className="font-bold text-emerald-950 text-base font-heading group-hover:text-emerald-700 transition-colors">
                      <Link to={`/product/${product.id}`}>{product.name}</Link>
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {product.flavor}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-stone-100 mt-2">
                  <div>
                    <span className="text-xs text-stone-400 block">Starting from</span>
                    <span className="text-lg font-extrabold text-emerald-950">₹{product.price}</span>
                    <span className="text-xs text-stone-500"> / {product.unit}</span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="p-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white transition-colors"
                    title="Quick Add to Cart"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Why Microgreens Benefits Section */}
      <section className="bg-stone-100/70 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
              Nutritional Powerhouses
            </span>
            <h2 className="text-3xl font-extrabold text-emerald-950 font-heading">
              Why Eat Mulaiparri Microgreens Daily?
            </h2>
            <p className="text-stone-600 text-sm">
              Scientific research shows microgreens harvested at 7-14 days contain concentrated levels of vitamins C, E, K, and minerals compared to full-grown vegetables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white p-8 rounded-2xl border border-emerald-950/5 shadow-sm space-y-4 hover-lift">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950 font-heading">40x Antioxidant Punch</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Broccoli microgreens are exceptionally rich in Sulforaphane, a powerful compound researched for cellular protection and heart health.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-emerald-950/5 shadow-sm space-y-4 hover-lift">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Droplets className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950 font-heading">100% Pesticide Free</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Grown in controlled indoor environments using purified water and coconut coir substrate. Zero chemical sprays, heavy metals, or synthetic fertilizers.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-emerald-950/5 shadow-sm space-y-4 hover-lift">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950 font-heading">Live Growing Trays</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Order live growing trays to keep microgreens alive on your kitchen countertop. Cut only what you need right before eating for maximum freshness.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Shopping CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-lime-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-lime-400 font-bold text-xs uppercase tracking-widest">First Harvest Offer</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">Get 20% Off Your First Microgreen Pack!</h3>
            <p className="text-emerald-200 text-xs sm:text-sm">Use coupon code <code className="bg-lime-500 text-emerald-950 px-2 py-0.5 rounded font-bold">FRESH20</code> during Razorpay checkout.</p>
          </div>
          <Link
            to="/shop"
            className="btn-mulaiparri-accent px-8 py-4 text-sm font-bold shadow-lg shrink-0"
          >
            Start Shopping Now
          </Link>
        </div>
      </section>

    </div>
  );
}
