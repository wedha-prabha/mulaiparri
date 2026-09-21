import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { useCart } from '../context/CartContext';
import { 
  User, Bell, MapPin, ShieldCheck, LogOut, Check, Save, 
  Sparkles, History, Phone, Mail 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AccountPage() {
  const { user, updateProfile, logout } = useAuth();
  const { permission, requestPermission } = useNotification();
  const { showToast } = useCart();

  const [name, setName] = useState(user ? user.name : '');
  const [phone, setPhone] = useState(user ? user.phone || '' : '');
  const [address, setAddress] = useState(user?.address || {
    street: '14 Organic Garden Way',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600040'
  });

  const [notifPrefs, setNotifPrefs] = useState(user?.notificationPrefs || {
    orderConfirmation: true,
    statusUpdates: true,
    promotional: true,
    browserPush: permission === 'granted'
  });

  const [saving, setSaving] = useState(false);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold">Please Login</h2>
        <Link to="/login" className="btn-mulaiparri px-4 py-2 text-xs font-semibold">Sign In</Link>
      </div>
    );
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile({
        name,
        phone,
        address,
        notificationPrefs: notifPrefs
      });
      showToast('Profile & Notification Preferences Updated! 🌱');
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePushNotif = async () => {
    if (permission !== 'granted') {
      const res = await requestPermission();
      if (res === 'granted') {
        setNotifPrefs({ ...notifPrefs, browserPush: true });
      }
    } else {
      setNotifPrefs({ ...notifPrefs, browserPush: !notifPrefs.browserPush });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Account Header Card */}
      <div className="bg-gradient-to-r from-emerald-950 to-stone-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-lime-500 text-emerald-950 font-extrabold text-2xl flex items-center justify-center shadow-lg font-heading">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold font-heading">{user.name}</h1>
              {user.role === 'admin' && (
                <span className="bg-lime-500 text-emerald-950 font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase">
                  Admin
                </span>
              )}
            </div>
            <p className="text-xs text-emerald-200">{user.email}</p>
            <p className="text-[11px] text-emerald-400 mt-0.5">Member since {new Date(user.createdAt || Date.now()).getFullYear()}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/orders" className="btn-mulaiparri-accent px-4 py-2.5 text-xs font-semibold flex items-center gap-1.5">
            <History className="w-4 h-4" /> Order History
          </Link>
          <button onClick={logout} className="p-2.5 rounded-xl bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold flex items-center gap-1">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSaveProfile} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Profile Details & Shipping Address */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-emerald-950 font-heading border-b border-stone-100 pb-3 flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-700" /> Account Details & Address Book
          </h3>

          <div className="space-y-4 text-xs font-semibold">
            <div>
              <label className="block text-stone-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-700 outline-none font-normal"
              />
            </div>

            <div>
              <label className="block text-stone-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-700 outline-none font-normal"
              />
            </div>

            <div>
              <label className="block text-stone-700 mb-1">Saved Street Address</label>
              <input
                type="text"
                value={address.street}
                onChange={e => setAddress({ ...address, street: e.target.value })}
                className="w-full px-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-700 outline-none font-normal"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-stone-700 mb-1">City</label>
                <input
                  type="text"
                  value={address.city}
                  onChange={e => setAddress({ ...address, city: e.target.value })}
                  className="w-full px-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-700 outline-none font-normal"
                />
              </div>

              <div>
                <label className="block text-stone-700 mb-1">State</label>
                <input
                  type="text"
                  value={address.state}
                  onChange={e => setAddress({ ...address, state: e.target.value })}
                  className="w-full px-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-700 outline-none font-normal"
                />
              </div>

              <div>
                <label className="block text-stone-700 mb-1">Pincode</label>
                <input
                  type="text"
                  value={address.pincode}
                  onChange={e => setAddress({ ...address, pincode: e.target.value })}
                  className="w-full px-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-700 outline-none font-normal"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-emerald-950 font-heading border-b border-stone-100 pb-3 flex items-center gap-2">
              <Bell className="w-5 h-5 text-lime-600" /> Push Notification Settings
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 bg-stone-50 rounded-2xl">
                <div>
                  <span className="font-bold text-stone-800 block">Order Confirmations</span>
                  <span className="text-stone-400">Receive instant confirmation on Razorpay payment</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifPrefs.orderConfirmation}
                  onChange={e => setNotifPrefs({ ...notifPrefs, orderConfirmation: e.target.checked })}
                  className="w-4 h-4 accent-emerald-800"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-stone-50 rounded-2xl">
                <div>
                  <span className="font-bold text-stone-800 block">Harvest & Delivery Status</span>
                  <span className="text-stone-400">Alerts when microgreens are cut & out for delivery</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifPrefs.statusUpdates}
                  onChange={e => setNotifPrefs({ ...notifPrefs, statusUpdates: e.target.checked })}
                  className="w-4 h-4 accent-emerald-800"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-amber-50/70 border border-emerald-900/10 rounded-2xl">
                <div>
                  <span className="font-bold text-emerald-950 block">Browser Push Notifications</span>
                  <span className="text-stone-500">
                    {permission === 'granted' ? 'Active on this device' : 'Permission needed'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleTogglePushNotif}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    permission === 'granted' ? 'bg-emerald-900 text-lime-300' : 'bg-lime-500 text-emerald-950'
                  }`}
                >
                  {permission === 'granted' ? 'Enabled' : 'Enable'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full btn-mulaiparri py-3.5 text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Profile & Preferences'}</span>
            </button>
          </div>
        </div>

      </form>

    </div>
  );
}
