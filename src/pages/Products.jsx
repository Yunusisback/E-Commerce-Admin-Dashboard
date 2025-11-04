import { useState } from 'react';
import ProductsGrid from '../components/products/ProductsGrid';
import ProductFilters from '../components/products/ProductFilters';
import { allProducts } from '../data/mockData';

/**
 * "Ürünler" sayfasının ana konteyner (wrapper) bileşenidir
 * Bu bileşen, 'Orders' sayfasındakine benzer şekilde, filtreleme mantığını ve
 * statei (durumu) kendisi yönetir
 * 'Lifting State Up' (Statei Yukarı Taşıma) desenini uygular
 */

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  // Filtreleme Mantığı 
  /**
   * 'ProductFilters' alt bileşeninden (prop aracılığıyla) tetiklenir
   * Arama terimine göre ANA allProducts listesini filtreler
   * ve 'filteredProducts' state'ini günceller
   */
  const handleSearch = (searchTerm) => {
    const filtered = allProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Statei güncelle (bu 'ProductsGridin yeniden render olmasını tetikler)
    setFilteredProducts(filtered);
  };

  /**
   * 'ProductFilters' alt bileşeninden (prop aracılığıyla) tetiklenir.
   * Seçilen 'category' (kategori) değerine göre ANA 'allProducts' listesini filtreler
   */

  const handleCategoryFilter = (category) => {
    if (category === 'all') {
      // 'Tüm Kategoriler' seçilirse filtreyi temizle ve tüm listeyi göster
      setFilteredProducts(allProducts);
    } else {
      // Belirli bir kategoriye göre filtrele
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
            {/* Filtrelenmiş listenin uzunluğunu dinamik olarak gösterir */}
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