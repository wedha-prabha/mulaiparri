import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { 
  History, Clock, CheckCircle2, Truck, Package, ShieldCheck, 
  ChevronRight, RefreshCw, AlertCircle, Sparkles 
} from 'lucide-react';

export default function OrderHistoryPage() {
  const { user } = useAuth();
  const { addToCart, showToast } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    setLoading(true);
    const userId = user ? user.id : 'demo-guest';
    fetch(`/api/orders`)
      .then(res => res.json())
      .then(data => {
        if (data.orders) setOrders(data.orders);
      })
      .catch(err => console.error('Error fetching order history:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const handleAdminStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update status');
      showToast(`Status updated to ${newStatus}`);
      fetchOrders();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleReorder = (orderItems) => {
    orderItems.forEach(item => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80'
      }, item.selectedSize, item.quantity);
    });
    showToast('Items added to cart for reorder!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-1">
            Customer Purchase Record
          </span>
          <h1 className="text-3xl font-extrabold text-emerald-950 font-heading flex items-center gap-2">
            <History className="w-7 h-7 text-emerald-700" />
            <span>Order History & Trackers</span>
          </h1>
        </div>
        <button onClick={fetchOrders} className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-emerald-950 font-semibold bg-white px-3 py-1.5 border rounded-xl">
          <RefreshCw className="w-3.5 h-3.5" /> Refresh Orders
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map(n => (
            <div key={n} className="h-48 rounded-3xl animate-shimmer"></div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-md mx-auto space-y-4">
          <Package className="w-12 h-12 text-stone-400 mx-auto" />
          <h3 className="text-lg font-bold text-emerald-950 font-heading">No Past Orders Found</h3>
          <p className="text-xs text-stone-500">You haven't placed any microgreen orders yet.</p>
          <Link to="/shop" className="btn-mulaiparri inline-flex px-6 py-2.5 text-xs font-semibold">
            Shop Microgreens
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-6">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-emerald-950 font-heading">Order #{order.id}</h3>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                      order.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      Payment: {order.paymentStatus}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400">
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                </div>

                {/* Status Badge & Admin Change Dropdown */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-stone-400 block">Harvest Status</span>
                    <span className="text-xs font-bold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-900/10">
                      {order.status}
                    </span>
                  </div>

                  {/* Admin status switcher for instant demonstration */}
                  <div className="text-left">
                    <label className="text-[10px] text-stone-400 block font-semibold">Admin Status Changer:</label>
                    <select
                      value={order.status}
                      onChange={(e) => handleAdminStatusChange(order.id, e.target.value)}
                      className="text-[11px] bg-stone-100 border border-stone-300 rounded-lg px-2 py-1 font-semibold text-stone-700 outline-none"
                    >
                      <option value="Harvest Scheduled">Harvest Scheduled</option>
                      <option value="Cut & Packed">Cut & Packed</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Status Step Bar */}
              <div className="bg-stone-50/70 p-4 rounded-2xl border border-stone-200">
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                  <div className={`space-y-1 ${order.status === 'Harvest Scheduled' || order.status === 'Cut & Packed' || order.status === 'Out for Delivery' || order.status === 'Delivered' ? 'text-emerald-900' : 'opacity-40'}`}>
                    <div className="w-7 h-7 rounded-full bg-emerald-900 text-white flex items-center justify-center mx-auto text-xs">1</div>
                    <span>Harvest Scheduled</span>
                  </div>
                  <div className={`space-y-1 ${order.status === 'Cut & Packed' || order.status === 'Out for Delivery' || order.status === 'Delivered' ? 'text-emerald-900' : 'opacity-40'}`}>
                    <div className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center mx-auto text-xs">2</div>
                    <span>Cut & Packed</span>
                  </div>
                  <div className={`space-y-1 ${order.status === 'Out for Delivery' || order.status === 'Delivered' ? 'text-emerald-900' : 'opacity-40'}`}>
                    <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center mx-auto text-xs">3</div>
                    <span>Out for Delivery</span>
                  </div>
                  <div className={`space-y-1 ${order.status === 'Delivered' ? 'text-emerald-900' : 'opacity-40'}`}>
                    <div className="w-7 h-7 rounded-full bg-lime-600 text-white flex items-center justify-center mx-auto text-xs">4</div>
                    <span>Delivered</span>
                  </div>
                </div>
              </div>

              {/* Items in Order */}
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-stone-50">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      <span className="font-semibold text-stone-800">{item.name} ({item.selectedSize})</span>
                      <span className="text-stone-400">× {item.quantity}</span>
                    </div>
                    <span className="font-bold text-emerald-950">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Footer Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-stone-100">
                <div className="text-xs">
                  <span className="text-stone-400">Total Paid:</span> <strong className="text-base text-emerald-950 ml-1">₹{order.totalAmount}</strong>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleReorder(order.items)}
                    className="btn-mulaiparri px-4 py-2 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Re-Order Items
                  </button>
                  <Link
                    to={`/order-success/${order.id}`}
                    className="px-3 py-2 text-xs font-semibold text-emerald-800 border border-emerald-800/30 hover:bg-emerald-50 rounded-xl"
                  >
                    View Receipt
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
