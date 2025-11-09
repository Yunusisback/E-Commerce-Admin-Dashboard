import { Search, Filter, Plus } from 'lucide-react';
import { useState } from 'react';
import { productCategories } from '../../data/mockData';

// Ürün filtreleri bileşeni
const ProductFilters = ({ onSearch, onCategoryFilter, onAddProductClick }) => {

  // Arama terimi durumu
  const [searchTerm, setSearchTerm] = useState('');
  
  // Seçili kategori durumu
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Arama işleyicisi
  const handleSearch = (value) => {
    setSearchTerm(value);
    if (onSearch) onSearch(value);
  };

  // Kategori değişikliği işleyicisi
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    if (onCategoryFilter) onCategoryFilter(newCategory);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">

      {/* Arama çubuğu */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Ürün ara..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-500"
        />
      </div>
      
      {/* Kategori filtresi */}
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-gray-400" />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="px-4 py-2 bg-white dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-500"
        >
          {productCategories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Yeni ürün ekleme butonu */}
      <button 
        onClick={onAddProductClick} 
        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-amber-600 dark:hover:bg-amber-700 text-white rounded-lg transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">Yeni Ürün</span>
      </button>
    </div>
  );
}; 

export default ProductFilters;