import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const { user, updateProfile } = useAuth();
  const [permission, setPermission] = useState(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'default';
  });
  const [showPromptBanner, setShowPromptBanner] = useState(false);
  const [notificationLogs, setNotificationLogs] = useState([]);

  useEffect(() => {
    // Check if permission prompt banner should be displayed
    const dismissed = localStorage.getItem('mulaiparri_notif_prompt_dismissed');
    if (permission === 'default' && !dismissed) {
      // Delay prompt banner slightly for smooth UX
      const timer = setTimeout(() => setShowPromptBanner(true), 2500);
      return () => clearTimeout(timer);
    }
  }, [permission]);

  useEffect(() => {
    if (user) {
      fetch(`/api/notifications/logs/${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.logs) setNotificationLogs(data.logs);
        })
        .catch(err => console.error('Error fetching notification logs:', err));
    }
  }, [user]);

  const requestPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      alert('Push notifications are simulated for mobile web / native preview in this browser.');
      return 'granted';
    }

    try {
      const res = await Notification.requestPermission();
      setPermission(res);
      setShowPromptBanner(false);

      if (res === 'granted') {
        // Send subscription registration to backend
        fetch('/api/notifications/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user ? user.id : 'guest', platform: 'Web Browser' })
        });

        if (user) {
          updateProfile({
            notificationPrefs: { ...(user.notificationPrefs || {}), browserPush: true }
          });
        }

        sendLocalNotification('Notifications Enabled! 🌱', 'You will receive live harvest and delivery status alerts.');
      } else if (res === 'denied') {
        localStorage.setItem('mulaiparri_notif_prompt_dismissed', 'true');
      }
      return res;
    } catch (err) {
      console.error('Notification permission error:', err);
      return 'denied';
    }
  };

  const dismissPrompt = () => {
    setShowPromptBanner(false);
    localStorage.setItem('mulaiparri_notif_prompt_dismissed', 'true');
  };

  const sendLocalNotification = (title, body) => {
    if (permission === 'granted' && typeof window !== 'undefined' && 'Notification' in window) {
      try {
        new Notification(title, {
          body,
          icon: '/sprout.svg',
          badge: '/sprout.svg'
        });
      } catch (e) {
        console.log('Browser notification fallback', title, body);
      }
    }
  };

  return (
    <NotificationContext.Provider value={{
      permission,
      showPromptBanner,
      requestPermission,
      dismissPrompt,
      notificationLogs,
      sendLocalNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
