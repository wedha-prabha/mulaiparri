import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Leaf, Clock, Truck, ShieldCheck, ArrowRight, Printer } from 'lucide-react';

export default function OrderSuccessPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.order) setOrder(data.order);
      })
      .catch(err => console.error('Error fetching order confirmation:', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="max-w-xl mx-auto px-4 py-20 h-96 animate-shimmer rounded-3xl"></div>;
  }

  if (!order) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold">Order Not Found</h2>
        <Link to="/orders" className="btn-mulaiparri px-4 py-2 text-xs">View My Orders</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      
      {/* Success Hero Header */}
      <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xl text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10 text-emerald-700" />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Order Confirmed & Paid</span>
          <h1 className="text-3xl font-extrabold text-emerald-950 font-heading">
            Thank You! Order #{order.id}
          </h1>
          <p className="text-xs text-stone-500">
            Payment verified via Razorpay ({order.razorpayPaymentId || 'Verified'})
          </p>
        </div>

        {/* Live Status Tracker Bar */}
        <div className="pt-6 border-t border-stone-100">
          <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-4">Live Harvest Progress</h4>
          <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
            <div className="space-y-1">
              <div className="w-8 h-8 rounded-full bg-emerald-900 text-white flex items-center justify-center mx-auto">1</div>
              <span className="text-emerald-900">Harvest Scheduled</span>
            </div>
            <div className="space-y-1 opacity-50">
              <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center mx-auto">2</div>
              <span>Cut & Packed</span>
            </div>
            <div className="space-y-1 opacity-50">
              <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center mx-auto">3</div>
              <span>Out for Delivery</span>
            </div>
            <div className="space-y-1 opacity-50">
              <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center mx-auto">4</div>
              <span>Delivered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary Receipt */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <h3 className="text-lg font-bold text-emerald-950 font-heading">Receipt Summary</h3>
          <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-emerald-900 font-semibold">
            <Printer className="w-4 h-4" /> Print Receipt
          </button>
        </div>

        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-emerald-950 block">{item.name}</span>
                <span className="text-stone-400">Size: {item.selectedSize} × {item.quantity}</span>
              </div>
              <span className="font-bold text-emerald-950">₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-stone-200 text-xs space-y-1 text-right">
          <div><span className="text-stone-500">Total Amount Paid:</span> <strong className="text-base text-emerald-950 ml-2">₹{order.totalAmount}</strong></div>
          <div className="text-[11px] text-stone-400">Estimated Delivery: {order.estimatedHarvestDate}</div>
        </div>

        <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row gap-3">
          <Link to="/orders" className="flex-1 btn-mulaiparri py-3 text-xs font-semibold text-center">
            View All Order History
          </Link>
          <Link to="/shop" className="flex-1 py-3 text-xs font-semibold text-center border border-stone-300 rounded-xl text-stone-700 hover:bg-stone-50">
            Continue Shopping
          </Link>
        </div>
      </div>

    </div>
  );
}
