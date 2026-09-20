import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// Get notification logs for user
router.get('/logs/:userId', (req, res) => {
  try {
    const d = db.get();
    const logs = (d.notificationLogs || []).filter(n => n.userId === req.params.userId || n.userId === 'guest');
    res.json({ logs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register push token or browser subscription
router.post('/subscribe', (req, res) => {
  try {
    const { userId, subscription, platform } = req.body;
    db.addNotificationLog({
      type: 'DEVICE_SUBSCRIBED',
      userId: userId || 'guest',
      title: 'Push Notifications Enabled',
      body: `Successfully subscribed for harvest & delivery alerts on ${platform || 'Browser'}.`
    });
    res.json({ success: true, message: 'Notification subscription saved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
