import React from 'react';
import { Link } from 'react-router-down'; // Wait, let's import from 'react-router-dom'!
import { Link as RouterLink } from 'react-router-dom';
import { Leaf, Sun, Droplets, ShieldCheck, HeartPulse, Award, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-amber-50 via-emerald-50/40 to-amber-50/20 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
            Our Heritage & Urban Farm Mission
          </span>
          <h1 className="text-4xl font-extrabold text-emerald-950 font-heading">
            Connecting Tamil Sprout Wisdom to Modern Living
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Mulaiparri (முளைப்பாரி) brings living microgreens directly from clean indoor hydroponic farms to urban households in South India.
          </p>
        </div>
      </section>

      {/* Story Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-4">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
              The Tradition of Germinated Seeds
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-heading">
              Rooted in Mulaiparri Festival Heritage
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              For generations across Tamil Nadu, women nurtured nine sacred grains in earthen pots filled with coconut fiber and organic silt. Known as <em>Mulaiparri</em>, these sprouted greens were celebrated for bringing abundance, health, and vitality.
            </p>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We honor this sacred tradition by growing non-GMO heirloom microgreens under precision lighting using reverse osmosis purified water and coconut coir. No chemical pesticides, ever.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1592417817098-8f3d6eb19657?auto=format&fit=crop&w=1000&q=80"
              alt="Hydroponic Microgreen Farm"
              className="w-full h-80 object-cover"
            />
          </div>

        </div>
      </section>

      {/* Farm Standards */}
      <section className="bg-emerald-950 text-emerald-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-extrabold text-white font-heading">
              Our 4-Step Organic Promise
            </h2>
            <p className="text-xs text-emerald-300">From non-GMO seed selection to eco-friendly 24h delivery</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="bg-emerald-900/60 p-6 rounded-2xl border border-emerald-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-lime-500 text-emerald-950 font-bold flex items-center justify-center text-sm">1</div>
              <h4 className="font-bold text-white text-base font-heading">Heirloom Seeds</h4>
              <p className="text-xs text-emerald-300/80">Untreated, non-GMO seeds sourced from organic certified growers.</p>
            </div>

            <div className="bg-emerald-900/60 p-6 rounded-2xl border border-emerald-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-lime-500 text-emerald-950 font-bold flex items-center justify-center text-sm">2</div>
              <h4 className="font-bold text-white text-base font-heading">Hydro RO Water</h4>
              <p className="text-xs text-emerald-300/80">Pure filtered water with natural minerals, free of chlorine & pathogens.</p>
            </div>

            <div className="bg-emerald-900/60 p-6 rounded-2xl border border-emerald-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-lime-500 text-emerald-950 font-bold flex items-center justify-center text-sm">3</div>
              <h4 className="font-bold text-white text-base font-heading">Same-Day Cut</h4>
              <p className="text-xs text-emerald-300/80">Microgreens are harvested at 7am on your delivery date for peak crispness.</p>
            </div>

            <div className="bg-emerald-900/60 p-6 rounded-2xl border border-emerald-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-lime-500 text-emerald-950 font-bold flex items-center justify-center text-sm">4</div>
              <h4 className="font-bold text-white text-base font-heading">Eco-Packaging</h4>
              <p className="text-xs text-emerald-300/80">Packed in biodegradable plant-based clamshell containers or live trays.</p>
            </div>

          </div>

          <div className="text-center pt-4">
            <RouterLink to="/shop" className="btn-mulaiparri-accent inline-flex items-center gap-2 px-6 py-3 text-xs font-bold shadow-lg">
              <span>Taste the Freshness</span>
              <ArrowRight className="w-4 h-4" />
            </RouterLink>
          </div>

        </div>
      </section>

    </div>
  );
}
