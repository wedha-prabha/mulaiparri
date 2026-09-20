import React from 'react';
import { useNotification } from '../context/NotificationContext';
import { Bell, X, Sparkles, CheckCircle2 } from 'lucide-react';

export default function NotificationBanner() {
  const { permission, showPromptBanner, requestPermission, dismissPrompt } = useNotification();

  if (!showPromptBanner || permission === 'granted') return null;

  return (
    <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-stone-900 text-white px-4 py-3 shadow-lg relative border-b border-emerald-700/50 transition-all duration-300 z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-700/60 flex items-center justify-center shrink-0 text-emerald-300">
            <Bell className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <p className="font-medium text-emerald-100 flex items-center gap-1.5">
              <span>Stay Updated on Fresh Harvests & Deliveries</span>
              <Sparkles className="w-4 h-4 text-lime-400" />
            </p>
            <p className="text-emerald-300/80 text-xs hidden sm:block">
              Get real-time push notifications when your microgreens are harvested, cut & out for delivery.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={requestPermission}
            className="px-4 py-1.5 rounded-full bg-lime-500 hover:bg-lime-400 text-emerald-950 font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-md"
          >
            <CheckCircle2 className="w-4 h-4" />
            Enable Live Alerts
          </button>
          <button
            onClick={dismissPrompt}
            className="p-1.5 text-emerald-300 hover:text-white rounded-full hover:bg-emerald-800/60 transition-colors"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
