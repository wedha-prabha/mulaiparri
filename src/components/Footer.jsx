import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Phone, Mail, MapPin, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100 pt-16 pb-24 md:pb-12 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Props Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-emerald-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/80 flex items-center justify-center text-lime-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Harvested on Order</h4>
              <p className="text-emerald-400/80 text-xs">Delivered within 24 hours of cut</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/80 flex items-center justify-center text-lime-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">100% Organic & Non-GMO</h4>
              <p className="text-emerald-400/80 text-xs">Zero chemical pesticides or sprays</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/80 flex items-center justify-center text-lime-400">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Live Tray Option</h4>
              <p className="text-emerald-400/80 text-xs">Harvest fresh at home straight from tray</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/80 flex items-center justify-center text-lime-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Razorpay Secure Checkout</h4>
              <p className="text-emerald-400/80 text-xs">UPI, Credit/Debit Cards, NetBanking</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-lime-500 flex items-center justify-center text-emerald-950 font-bold">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight font-heading">
                Mulaiparri<span className="text-lime-400">.</span>
              </span>
            </div>
            <p className="text-emerald-300/80 text-xs leading-relaxed">
              Mulaiparri (முளைப்பாரி) brings Tamil heritage sprout traditions into modern urban hydroponic farming. Microgreens harvested at peak nutrient density.
            </p>
            <div className="text-xs text-lime-400 font-medium">
              🌱 Hydro-Organic Certified Farms • Chennai & Coimbatore
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base font-heading">Explore Microgreens</h4>
            <ul className="space-y-2.5 text-emerald-300/80 text-xs">
              <li><Link to="/shop?category=Nutrient-Dense" className="hover:text-lime-400 transition-colors">Broccoli Microgreens</Link></li>
              <li><Link to="/shop?category=Spicy" className="hover:text-lime-400 transition-colors">Red Rambo Radish</Link></li>
              <li><Link to="/shop?category=Smoothies" className="hover:text-lime-400 transition-colors">Sunflower Shoots</Link></li>
              <li><Link to="/shop?category=Mild" className="hover:text-lime-400 transition-colors">Sweet Pea Tendrils</Link></li>
              <li><Link to="/shop?category=Smoothies" className="hover:text-lime-400 transition-colors">Live Wheatgrass Trays</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base font-heading">Customer & Orders</h4>
            <ul className="space-y-2.5 text-emerald-300/80 text-xs">
              <li><Link to="/orders" className="hover:text-lime-400 transition-colors">Track Order Status</Link></li>
              <li><Link to="/account" className="hover:text-lime-400 transition-colors">Notification Preferences</Link></li>
              <li><Link to="/about" className="hover:text-lime-400 transition-colors">Our Harvesting Process</Link></li>
              <li><Link to="/contact" className="hover:text-lime-400 transition-colors">Bulk & Subscription Enquiries</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base font-heading">Farm Contact</h4>
            <ul className="space-y-3 text-emerald-300/80 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                <span>14 Organic Garden Way, Anna Nagar East, Chennai - 600040</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-lime-400 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-lime-400 shrink-0" />
                <span>support@mulaiparri.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-400/70 gap-4">
          <p>© {new Date().getFullYear()} Mulaiparri Microgreens Platform. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Powered by Razorpay Secure Payments</span>
            <span>•</span>
            <span>Android & iOS Native Ready</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
