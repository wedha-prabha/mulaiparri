import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { 
  Search, Filter, Plus, Star, ShoppingBag, ShieldCheck, Edit3, Trash2, 
  X, Check, Sparkles, AlertCircle 
} from 'lucide-react';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState('popular');
  const { addToCart, showToast } = useCart();
  const { user } = useAuth();

  // Admin Product Creation & Editing Drawer State
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    tamilName: '',
    category: 'Nutrient-Dense',
    flavor: '',
    description: '',
    price: 180,
    unit: '100g',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    stock: 30
  });

  const categories = ['All', 'Nutrient-Dense', 'Spicy', 'Mild', 'Smoothies'];

  const fetchProducts = () => {
    setLoading(true);
    let url = `/api/products?category=${encodeURIComponent(selectedCategory)}&sort=${sortBy}`;
    if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.products) setProducts(data.products);
      })
      .catch(err => console.error('Error loading products:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleOpenAdminModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        tamilName: product.tamilName || '',
        category: product.category || 'Nutrient-Dense',
        flavor: product.flavor || '',
        description: product.description || '',
        price: product.price,
        unit: product.unit || '100g',
        image: product.image,
        stock: product.stock || 25
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        tamilName: '',
        category: 'Nutrient-Dense',
        flavor: 'Fresh, mild & crisp',
        description: 'Organically cultivated microgreens harvested to order.',
        price: 150,
        unit: '100g',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
        stock: 30
      });
    }
    setShowAdminModal(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const endpoint = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save product');

      showToast(editingProduct ? 'Product updated successfully!' : 'New Microgreen product added!');
      setShowAdminModal(false);
      fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      showToast('Product deleted');
      fetchProducts();
    } catch (err) {
      alert('Error deleting product');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-1">
            Organic Microgreen Catalog
          </span>
          <h1 className="text-3xl font-extrabold text-emerald-950 font-heading">
            Shop Fresh Microgreens
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">
            All varieties are harvested live on your order date. Zero chemical sprays.
          </p>
        </div>

        {/* Admin Capability Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleOpenAdminModal()}
            className="btn-mulaiparri px-4 py-2.5 text-xs font-semibold flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Product (Admin)</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
        
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="w-full lg:w-80 relative">
          <input
            type="text"
            placeholder="Search by name or flavor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-amber-50/50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
        </form>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-900 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="w-full lg:w-auto flex items-center gap-2 justify-end">
          <span className="text-xs text-stone-500 font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-stone-100 border border-stone-200 text-stone-800 text-xs rounded-xl px-3 py-1.5 focus:outline-none font-medium"
          >
            <option value="popular">Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="h-96 rounded-2xl animate-shimmer"></div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4 max-w-md mx-auto">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-emerald-950 font-heading">No Microgreens Found</h3>
          <p className="text-xs text-stone-500">Try adjusting your search query or filter category.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="btn-mulaiparri px-4 py-2 text-xs font-semibold"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="organic-card group flex flex-col justify-between overflow-hidden relative">
              
              <div>
                <div className="relative h-56 overflow-hidden bg-stone-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-emerald-900/90 backdrop-blur-sm text-lime-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {product.badge || product.category}
                  </span>
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-emerald-950 text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {product.rating || 4.9}
                  </span>

                  {/* Admin Edit Controls */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenAdminModal(product)}
                      className="p-1.5 rounded-lg bg-white/90 text-stone-700 hover:text-emerald-800 shadow-md"
                      title="Edit Product"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-1.5 rounded-lg bg-white/90 text-red-600 hover:text-red-700 shadow-md"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  {product.tamilName && (
                    <span className="text-xs font-semibold text-emerald-700 block">
                      {product.tamilName}
                    </span>
                  )}
                  <h3 className="font-bold text-emerald-950 text-lg font-heading group-hover:text-emerald-700 transition-colors">
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {(product.benefits || []).slice(0, 2).map((b, i) => (
                      <span key={i} className="text-[10px] bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded-md border border-emerald-900/10">
                        ✓ {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-stone-100 mt-4">
                <div>
                  <span className="text-xs text-stone-400 block">Price</span>
                  <span className="text-xl font-extrabold text-emerald-950">₹{product.price}</span>
                  <span className="text-xs text-stone-500"> / {product.unit}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/product/${product.id}`}
                    className="px-3 py-2 text-xs font-semibold text-emerald-800 border border-emerald-800/30 hover:bg-emerald-50 rounded-xl"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => addToCart(product)}
                    className="btn-mulaiparri px-3 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Admin Product Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <h3 className="text-xl font-extrabold text-emerald-950 font-heading flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-lime-600" />
                <span>{editingProduct ? 'Edit Microgreen Product' : 'Add New Microgreen Product'}</span>
              </h3>
              <button onClick={() => setShowAdminModal(false)} className="p-1 rounded-full hover:bg-stone-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Product Name (English)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Organic Chia Microgreens"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-700 outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Tamil Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. சியா முளைக்கீரை"
                  value={formData.tamilName}
                  onChange={e => setFormData({ ...formData, tamilName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-700 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-700 outline-none"
                  >
                    <option value="Nutrient-Dense">Nutrient-Dense</option>
                    <option value="Spicy">Spicy</option>
                    <option value="Mild">Mild</option>
                    <option value="Smoothies">Smoothies</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Default Pack Unit</label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={e => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Initial Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={e => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Flavor Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Nutty, fresh crunch"
                  value={formData.flavor}
                  onChange={e => setFormData({ ...formData, flavor: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-700 outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-700 outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-700 outline-none"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAdminModal(false)}
                  className="flex-1 py-2.5 border rounded-xl text-stone-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-mulaiparri py-2.5 font-semibold text-white"
                >
                  Save Microgreen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
