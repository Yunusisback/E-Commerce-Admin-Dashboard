import { useState } from 'react';
import ProductsGrid from '../components/products/ProductsGrid';
import ProductFilters from '../components/products/ProductFilters';
import { allProducts } from '../data/mockData';

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  const handleSearch = (searchTerm) => {
    const filtered = allProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCategoryFilter = (category) => {
    if (category === 'all') {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Ürünler</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Toplam {filteredProducts.length} ürün
          </p>
        </div>
      </div>

      <ProductFilters onSearch={handleSearch} onCategoryFilter={handleCategoryFilter} />
      
      <ProductsGrid products={filteredProducts} />
    </div>
  );
};

export default Products;