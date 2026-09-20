import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// List all products with search & category filters
router.get('/', (req, res) => {
  try {
    const { category, search, sort, isFeatured } = req.query;
    let products = db.getProducts();

    if (category && category !== 'All') {
      products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.tamilName && p.tamilName.includes(q)) ||
        p.description.toLowerCase().includes(q) ||
        p.flavor.toLowerCase().includes(q)
      );
    }

    if (isFeatured === 'true') {
      products = products.filter(p => p.isFeatured);
    }

    if (sort === 'price-low') {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      products.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      products.sort((a, b) => b.rating - a.rating);
    }

    res.json({ products, total: products.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get product details
router.get('/:id', (req, res) => {
  try {
    const product = db.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Create new product
router.post('/', (req, res) => {
  try {
    const { name, tamilName, category, flavor, description, price, unit, image, benefits, stock, availableSizes } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({ error: 'Name, price, and category are required' });
    }

    const newProduct = db.createProduct({
      name,
      tamilName: tamilName || '',
      category,
      flavor: flavor || 'Fresh & organic',
      description: description || 'Fresh microgreens grown with organic methods.',
      price: Number(price),
      unit: unit || '100g',
      image: image || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      benefits: benefits || ['Organic Harvest', 'Nutrient Rich'],
      stock: Number(stock) || 20,
      availableSizes: availableSizes || [{ size: unit || '100g', price: Number(price) }],
      harvestCycleDays: 8,
      tags: ['Fresh', category],
      isFeatured: true
    });

    res.status(201).json({ product: newProduct, message: 'Microgreen product created successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update existing product
router.put('/:id', (req, res) => {
  try {
    const updated = db.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ product: updated, message: 'Product updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Delete product
router.delete('/:id', (req, res) => {
  try {
    const deleted = db.deleteProduct(req.params.id);
    res.json({ success: deleted, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
