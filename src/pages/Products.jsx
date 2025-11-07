

import { useState } from 'react';
import ProductsGrid from '../components/products/ProductsGrid';
import ProductFilters from '../components/products/ProductFilters';
import { allProducts as initialProducts } from '../data/mockData';
import EditProductModal from '../components/products/EditProductModal'; 

/**
 * "Ürünler" sayfasının ana konteyner (wrapper) bileşenidir.
 * Silme ve Düzenleme mantığını yönetir.
 */

const Products = () => {
  // 3. Ana ürün listesini 'state'e alıyoruz ki SİLEBİLELİM
  const [allProducts, setAllProducts] = useState(initialProducts);
  
  // 4. Filtrelenmiş liste, artık 'allProducts' state'inden türetiliyor
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  // 5. Modal (Düzenleme formu) için gerekli state'ler
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // Hangi ürünün düzenlendiğini tutar

  

  // Artık 'initialProducts' (sabit veri) yerine, 'allProducts' (değişebilen state) 
  // üzerinden filtreleme yapılıyor
  
  const handleSearch = (searchTerm) => {
    const filtered = allProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCategoryFilter = (category) => {
    if (category === 'all') {
      setFilteredProducts(allProducts); // Filtreyi temizle
    } else {
      const filtered = allProducts.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };



  /**
   * "Sil" düğmesi tıklandığında çalışır.
   * Bu fonksiyon ProductsGrid -> ProductCard'a prop olarak iletilir.
   */

  const handleDelete = (productId) => {
    // Kullanıcıya onaylatmak her zaman iyidir
    if (window.confirm("Bu ürünü silmek istediğinizden emin misiniz?")) {
      
      // Hem ana listeyi (allProducts) hem de filtrelenmiş listeyi (filteredProducts) güncelle
      const updatedProducts = allProducts.filter(p => p.id !== productId);
      setAllProducts(updatedProducts);
      
      const updatedFilteredProducts = filteredProducts.filter(p => p.id !== productId);
      setFilteredProducts(updatedFilteredProducts);
      
      console.log("Ürün silindi:", productId);
      // TODO: API'ye silme isteği gönder
    }
  };

  /**
   * "Düzenle" düğmesi tıklandığında çalışır
   * Bu fonksiyon ProductsGrid -> ProductCard'a prop olarak iletilir
   */
  const handleOpenEditModal = (product) => {
    setEditingProduct(product); // Hangi ürünün düzenleneceğini state'e ata
    setIsModalOpen(true);     // Modalı aç
  };

  /**
   * Modal'ın "Kaydet" düğmesi tıklandığında çalışır.
   * Bu fonksiyon EditProductModal'a prop olarak iletilir
   */
  const handleSaveEdit = (updatedProduct) => {
    // 'allProducts' state'indeki eski ürünü yenisiyle değiştir
    const updatedList = allProducts.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setAllProducts(updatedList);
    
    // 'filteredProducts' state'ini de güncelle
    const updatedFilteredList = filteredProducts.map(p =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setFilteredProducts(updatedFilteredList);

    console.log("Ürün güncellendi:", updatedProduct);
    // TODO: API'ye güncelleme isteği gönder
  };

  // Modalı kapatan basit fonksiyon
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
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
      
      {/* 7. ADIM: ProductsGrid'e yeni fonksiyonları (prop) ilet */}
      <ProductsGrid 
        products={filteredProducts} 
        onEdit={handleOpenEditModal} 
        onDelete={handleDelete} 
      />

      {/* 8. ADIM: Modalı render et (ama sadece düzenlenecek ürün seçiliyse) */}
      {editingProduct && (
        <EditProductModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={editingProduct}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default Products;