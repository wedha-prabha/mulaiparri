import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// Create new order
router.post('/', (req, res) => {
  try {
    const { userId, items, shippingAddress, paymentMethod, totalAmount, subtotal, deliveryFee, tax } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one microgreen product' });
    }

    const newOrder = db.createOrder({
      userId: userId || 'guest-' + Date.now(),
      items,
      shippingAddress: shippingAddress || {
        street: '12 Green Street',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600001'
      },
      paymentMethod: paymentMethod || 'Razorpay',
      totalAmount: totalAmount || items.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 40,
      subtotal: subtotal || items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      deliveryFee: deliveryFee || 40,
      tax: tax || 0,
      estimatedHarvestDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      })
    });

    // Add initial push notification log for order creation
    db.addNotificationLog({
      type: 'ORDER_PLACED',
      userId: newOrder.userId,
      title: 'Harvest Scheduled! 🌱',
      body: `Your order #${newOrder.id} has been placed. Microgreens harvest scheduled for tomorrow morning.`
    });

    res.status(201).json({ order: newOrder, message: 'Order placed successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user purchase history
router.get('/user/:userId', (req, res) => {
  try {
    const orders = db.getOrdersByUser(req.params.userId);
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single order details
router.get('/:id', (req, res) => {
  try {
    const order = db.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Get all platform orders
router.get('/', (req, res) => {
  try {
    const orders = db.getAllOrders();
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update order status (Harvest Scheduled -> Cut & Packed -> Out for Delivery -> Delivered)
router.patch('/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Harvest Scheduled', 'Cut & Packed', 'Out for Delivery', 'Delivered', 'Cancelled'];
    
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const updated = db.updateOrder(req.params.id, { status });
    if (!updated) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Trigger push notification log for status change
    let statusMsg = `Your Mulaiparri order #${updated.id} is now ${status.toLowerCase()}.`;
    if (status === 'Cut & Packed') statusMsg = `Fresh cuts complete! Your microgreens #${updated.id} are cut & packed in eco-containers. 🌿`;
    if (status === 'Out for Delivery') statusMsg = `Delivery runner on the way with your live microgreens #${updated.id}! 🚚`;
    if (status === 'Delivered') statusMsg = `Delivered! Enjoy your organic Mulaiparri microgreens. ✨`;

    db.addNotificationLog({
      type: 'ORDER_STATUS_UPDATE',
      userId: updated.userId,
      title: `Order Status: ${status}`,
      body: statusMsg
    });

    res.json({ order: updated, message: `Order status updated to ${status}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
