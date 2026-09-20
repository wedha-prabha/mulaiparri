import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const DATA_DIR = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_FILE = path.join(DATA_DIR, 'mulaiparri.json');

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Organic Broccoli Microgreens',
    tamilName: 'பிராக்கோலி முளைக்கீரை',
    category: 'Nutrient-Dense',
    flavor: 'Mild, fresh, slightly peppered',
    badge: 'Best Seller',
    description: 'Packed with up to 40x more Sulforaphane than mature broccoli heads. Crispy, delicate green shoots that elevate any salad, smoothie, or grain bowl.',
    benefits: ['High Sulforaphane', 'Boosts Immunity', 'Anti-Inflammatory', 'Rich in Vitamin C & K'],
    price: 180,
    unit: '100g',
    availableSizes: [
      { size: '50g', price: 100 },
      { size: '100g', price: 180 },
      { size: '250g', price: 400 },
      { size: 'Live Growing Tray', price: 350 }
    ],
    harvestCycleDays: 8,
    stock: 45,
    rating: 4.9,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    tags: ['Salads', 'Smoothies', 'Superfood'],
    isFeatured: true
  },
  {
    id: 'prod-2',
    name: 'Red Rambo Radish Microgreens',
    tamilName: 'சிவப்பு முள்ளங்கி முளைக்கீரை',
    category: 'Spicy',
    flavor: 'Zesty, peppery, intense radish kick',
    badge: 'Chef Favorite',
    description: 'Vibrant deep purple stems with emerald leaves delivering an exciting, peppery kick to sandwiches, avocado toasts, and tacos.',
    benefits: ['Digestive Enzyme Rich', 'High Vitamin E', 'Natural Detoxifier', 'Zesty Flavor'],
    price: 160,
    unit: '100g',
    availableSizes: [
      { size: '50g', price: 90 },
      { size: '100g', price: 160 },
      { size: '250g', price: 360 },
      { size: 'Live Growing Tray', price: 320 }
    ],
    harvestCycleDays: 6,
    stock: 30,
    rating: 4.8,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1515023115689-669611ff8604?auto=format&fit=crop&w=800&q=80',
    tags: ['Garnish', 'Spicy', 'Burgers'],
    isFeatured: true
  },
  {
    id: 'prod-3',
    name: 'Crunchy Sunflower Shoots',
    tamilName: 'சூரியகாந்தி முளைக்கீரை',
    category: 'Smoothies',
    flavor: 'Nutty, juicy, succulent crunch',
    badge: 'Popular',
    description: 'Thick, fleshy greens with a delightfully nutty taste. High in complete plant protein and essential fatty acids.',
    benefits: ['Complete Plant Protein', 'Rich in Zinc & Iron', 'Supports Heart Health', 'Great Snack'],
    price: 190,
    unit: '100g',
    availableSizes: [
      { size: '50g', price: 105 },
      { size: '100g', price: 190 },
      { size: '250g', price: 420 },
      { size: 'Live Growing Tray', price: 380 }
    ],
    harvestCycleDays: 10,
    stock: 50,
    rating: 4.95,
    reviewsCount: 162,
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19657?auto=format&fit=crop&w=800&q=80',
    tags: ['Protein', 'Crunchy', 'Snacks'],
    isFeatured: true
  },
  {
    id: 'prod-4',
    name: 'Sweet Pea Shoots & Tendrils',
    tamilName: 'பட்டாணி முளைக்கீரை',
    category: 'Mild',
    flavor: 'Sweet, crisp, fresh snap pea taste',
    badge: 'Fresh Harvest',
    description: 'Beautiful curly tendrils with a delicate sweet pea flavor. Perfect for stir-fries, pasta garnish, or snacking straight out of the box.',
    benefits: ['High Fiber', 'Vitamin A & C', 'Low Calorie', 'Antioxidant Boost'],
    price: 170,
    unit: '100g',
    availableSizes: [
      { size: '50g', price: 95 },
      { size: '100g', price: 170 },
      { size: '250g', price: 380 },
      { size: 'Live Growing Tray', price: 340 }
    ],
    harvestCycleDays: 9,
    stock: 25,
    rating: 4.85,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    tags: ['Pasta', 'Stir Fry', 'Garnish'],
    isFeatured: true
  },
  {
    id: 'prod-5',
    name: 'Fresh Organic Wheatgrass Live Tray',
    tamilName: 'கோதுமை புல் தட்டு',
    category: 'Smoothies',
    flavor: 'Earthy, sweet green, cleansing',
    badge: 'Detox Special',
    description: 'Live tray of pristine wheatgrass grown hydro-organically. Extract potent chlorophyll-dense cold pressed shots daily for revitalizing energy.',
    benefits: ['70% Chlorophyll', 'Heavy Metal Detox', 'Alkalizes Body', 'Sustained Energy'],
    price: 290,
    unit: 'Live Tray',
    availableSizes: [
      { size: '1 Live Tray', price: 290 },
      { size: '2 Live Trays', price: 540 }
    ],
    harvestCycleDays: 12,
    stock: 20,
    rating: 4.9,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    tags: ['Juice', 'Detox', 'Wellness'],
    isFeatured: true
  },
  {
    id: 'prod-6',
    name: 'Red Cabbage Microgreens',
    tamilName: 'சிவப்பு முட்டைக்கோஸ் முளைக்கீரை',
    category: 'Nutrient-Dense',
    flavor: 'Mildly sweet, tender, vibrant',
    badge: 'Super Color',
    description: 'Contains 40x more Vitamin E and 6x more Vitamin C than full-grown red cabbage. Rich in anthocyanins giving it a stunning magenta stem.',
    benefits: ['Anthocyanins Anti-Oxidant', 'Vitamin E Powerhouse', 'Heart & Eye Health', 'Gorgeous Presentation'],
    price: 175,
    unit: '100g',
    availableSizes: [
      { size: '50g', price: 95 },
      { size: '100g', price: 175 },
      { size: '250g', price: 390 }
    ],
    harvestCycleDays: 7,
    stock: 35,
    rating: 4.75,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1515023115689-669611ff8604?auto=format&fit=crop&w=800&q=80',
    tags: ['Salads', 'Garnish', 'Anti-Oxidant'],
    isFeatured: false
  }
];

function getDb() {
  if (!fs.existsSync(DB_FILE)) {
    const salt = bcrypt.genSaltSync(10);
    const demoPasswordHash = bcrypt.hashSync('Password123!', salt);
    
    const initialDb = {
      users: [
        {
          id: 'user-demo-1',
          name: 'Wedha Prabha',
          email: 'wedha@mulaiparri.com',
          passwordHash: demoPasswordHash,
          role: 'admin',
          phone: '+91 98765 43210',
          address: {
            street: '14 Organic Garden Way, Anna Nagar',
            city: 'Chennai',
            state: 'Tamil Nadu',
            pincode: '600040'
          },
          notificationPrefs: {
            orderConfirmation: true,
            statusUpdates: true,
            promotional: true,
            browserPush: true
          },
          createdAt: new Date().toISOString()
        }
      ],
      products: INITIAL_PRODUCTS,
      carts: {}, // userId -> cart items array
      orders: [],
      payments: [],
      notificationLogs: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
    return initialDb;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading db file, reinitializing', e);
    return { users: [], products: INITIAL_PRODUCTS, carts: {}, orders: [], payments: [], notificationLogs: [] };
  }
}

function saveDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export const db = {
  get: getDb,
  save: saveDb,

  // Users
  findUserByEmail: (email) => {
    const d = getDb();
    return d.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },
  findUserById: (id) => {
    const d = getDb();
    return d.users.find(u => u.id === id);
  },
  createUser: (userData) => {
    const d = getDb();
    const newUser = {
      id: 'user-' + Date.now(),
      ...userData,
      role: userData.role || 'customer',
      notificationPrefs: {
        orderConfirmation: true,
        statusUpdates: true,
        promotional: true,
        browserPush: false
      },
      createdAt: new Date().toISOString()
    };
    d.users.push(newUser);
    saveDb(d);
    return newUser;
  },
  updateUser: (id, updates) => {
    const d = getDb();
    const idx = d.users.findIndex(u => u.id === id);
    if (idx !== -1) {
      d.users[idx] = { ...d.users[idx], ...updates };
      saveDb(d);
      return d.users[idx];
    }
    return null;
  },

  // Products
  getProducts: () => {
    const d = getDb();
    return d.products;
  },
  getProductById: (id) => {
    const d = getDb();
    return d.products.find(p => p.id === id);
  },
  createProduct: (productData) => {
    const d = getDb();
    const newProduct = {
      id: 'prod-' + Date.now(),
      rating: 5.0,
      reviewsCount: 1,
      availableSizes: productData.availableSizes || [{ size: '100g', price: productData.price }],
      ...productData
    };
    d.products.unshift(newProduct);
    saveDb(d);
    return newProduct;
  },
  updateProduct: (id, updates) => {
    const d = getDb();
    const idx = d.products.findIndex(p => p.id === id);
    if (idx !== -1) {
      d.products[idx] = { ...d.products[idx], ...updates };
      saveDb(d);
      return d.products[idx];
    }
    return null;
  },
  deleteProduct: (id) => {
    const d = getDb();
    d.products = d.products.filter(p => p.id !== id);
    saveDb(d);
    return true;
  },

  // Carts
  getCart: (userId) => {
    const d = getDb();
    return d.carts[userId] || [];
  },
  saveCart: (userId, items) => {
    const d = getDb();
    d.carts[userId] = items;
    saveDb(d);
    return items;
  },

  // Orders
  createOrder: (orderData) => {
    const d = getDb();
    const newOrder = {
      id: 'MP-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      status: 'Harvest Scheduled', // Harvest Scheduled -> Cut & Packed -> Out for Delivery -> Delivered
      paymentStatus: 'Pending', // Pending -> Paid -> Failed
      ...orderData
    };
    d.orders.unshift(newOrder);
    saveDb(d);
    return newOrder;
  },
  getOrdersByUser: (userId) => {
    const d = getDb();
    return d.orders.filter(o => o.userId === userId);
  },
  getOrderById: (orderId) => {
    const d = getDb();
    return d.orders.find(o => o.id === orderId);
  },
  updateOrder: (orderId, updates) => {
    const d = getDb();
    const idx = d.orders.findIndex(o => o.id === orderId);
    if (idx !== -1) {
      d.orders[idx] = { ...d.orders[idx], ...updates };
      saveDb(d);
      return d.orders[idx];
    }
    return null;
  },
  getAllOrders: () => {
    const d = getDb();
    return d.orders;
  },

  // Notifications Log
  addNotificationLog: (log) => {
    const d = getDb();
    const newLog = {
      id: 'notif-' + Date.now(),
      createdAt: new Date().toISOString(),
      ...log
    };
    d.notificationLogs.unshift(newLog);
    saveDb(d);
    return newLog;
  }
};
