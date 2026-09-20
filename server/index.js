import express from 'express';
import cors from 'cors';
import path from 'path';

import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import paymentRoutes from './routes/payments.js';
import orderRoutes from './routes/orders.js';
import notificationRoutes from './routes/notifications.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/notifications', notificationRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'Mulaiparri Organic Microgreens API',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Serve frontend static build in production
const DIST_DIR = path.resolve(process.cwd(), 'dist');
app.use(express.static(DIST_DIR));
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  res.sendFile(path.join(DIST_DIR, 'index.html'), (err) => {
    if (err) {
      res.send('Mulaiparri API Server is running on port ' + PORT);
    }
  });
});

app.listen(PORT, () => {
  console.log(`🌱 Mulaiparri Backend Server running on http://localhost:${PORT}`);
});
