import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ContactPage() {
  const { showToast } = useCart();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Inquiry submitted! Our farm team will contact you shortly. 🌱');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Get In Touch</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-heading">
          Farm Support & Bulk Inquiries
        </h1>
        <p className="text-stone-500 text-xs sm:text-sm">
          Have questions about microgreens subscriptions, live trays, or restaurant bulk orders?
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Information */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 to-stone-900 text-white p-8 rounded-3xl space-y-8 shadow-xl">
          <h3 className="text-xl font-bold font-heading border-b border-emerald-800/80 pb-4">
            Farm Contact Details
          </h3>

          <div className="space-y-6 text-xs text-emerald-200">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-lime-500 text-emerald-950 flex items-center justify-center shrink-0 font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-white block text-sm">Anna Nagar Urban Farm</strong>
                <span>14 Organic Garden Way, Anna Nagar East, Chennai, Tamil Nadu 600040</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-lime-500 text-emerald-950 flex items-center justify-center shrink-0 font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-white block text-sm">Customer Helpline</strong>
                <span>+91 98765 43210 / +91 44 2626 9090</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-lime-500 text-emerald-950 flex items-center justify-center shrink-0 font-bold">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-white block text-sm">Email Address</strong>
                <span>support@mulaiparri.com</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-emerald-800/80 text-[11px] text-lime-400 font-medium">
            🌱 Farm visits available by appointment: Monday - Saturday 9:00 AM - 6:00 PM
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-emerald-950 font-heading border-b border-stone-100 pb-3 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-700" /> Send Us a Message
          </h3>

          {submitted ? (
            <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-900/10">
              <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
              <h4 className="text-lg font-bold text-emerald-950 font-heading">Thank You! Message Received</h4>
              <p className="text-xs text-stone-600">Our customer care team will respond within 2 business hours.</p>
              <button onClick={() => setSubmitted(false)} className="btn-mulaiparri px-4 py-2 text-xs font-semibold">
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Wedha Prabha"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-700 outline-none font-normal"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-700 outline-none font-normal"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-700 outline-none font-normal"
                />
              </div>

              <div>
                <label className="block text-stone-700 mb-1">Message / Inquiry Details</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Tell us about your microgreens requirements or subscription questions..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-700 outline-none font-normal"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full btn-mulaiparri py-3.5 text-xs font-bold shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-lime-400" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}
