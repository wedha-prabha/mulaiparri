import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// Get cart for user
router.get('/:userId', (req, res) => {
  try {
    const items = db.getCart(req.params.userId);
    res.json({ items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update cart for user
router.post('/:userId', (req, res) => {
  try {
    const { items } = req.body;
    const saved = db.saveCart(req.params.userId, items || []);
    res.json({ items: saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
