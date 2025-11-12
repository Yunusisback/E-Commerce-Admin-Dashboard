import { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext'; 
import ProductsGrid from '../components/products/ProductsGrid';
import FilterBar from '../components/common/FilterBar'; 
import { allProducts as initialProducts, productCategories } from '../data/mockData'; 
import EditProductModal from '../components/products/EditProductModal'; 
import ConfirmationModal from '../components/common/ConfirmationModal';
import AddProductModal from '../components/products/AddProductModal'; 
import { Plus } from 'lucide-react'; 

const Products = () => {
  const { setPageTitle } = useApp();
  useEffect(() => {
    setPageTitle('Ürünler'); 
  }, [setPageTitle]);

 

  // 1. Ana veri 
  const [allProducts, setAllProducts] = useState(initialProducts);
  
  // 2. Filtreleme stateleri
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // 3. Modal stateleri 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null); 
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  
  const filteredProducts = useMemo(() => {
    let products = allProducts;

    // Kategoriye göre filtrele
    if (categoryFilter !== 'all') {
      products = products.filter(product => product.category === categoryFilter);
    }
    
    // Arama terimine göre filtrele
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      products = products.filter(product => 
        product.name.toLowerCase().includes(lowerSearch) ||
        product.category.toLowerCase().includes(lowerSearch)
      );
    }

    return products;
  }, [allProducts, searchTerm, categoryFilter]); // Sadece bu 3 değer değiştiğinde yeniden hesaplanır


  const handleOpenDeleteModal = (productId) => {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
      setProductToDelete(product);
      setIsDeleteModalOpen(true); 
    }
  };

  const handleConfirmDelete = () => {
    if (!productToDelete) return; 
    setAllProducts(prevProducts => 
      prevProducts.filter(p => p.id !== productToDelete.id)
    );
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product); 
    setIsEditModalOpen(true);     
  };

  const handleSaveEdit = (updatedProduct) => {
    setAllProducts(prevProducts => 
      prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveAdd = (newProductData) => {
    const newProduct = {
      ...newProductData,
      id: `p${Date.now()}` // Benzersiz ID
    };
    setAllProducts(prevProducts => [newProduct, ...prevProducts]);
    setIsAddModalOpen(false);
  };
  
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
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

      {/* Filtreleme ve yeni ürün butonu  */}
      <FilterBar
        searchPlaceholder="Ürün ara..."
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterValue={categoryFilter}
        onFilterChange={setCategoryFilter}
        filterOptions={productCategories}
      >
        {/* children propu olarak Yeni Ürün butonu  */}
        <button 
          onClick={handleOpenAddModal} 
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-amber-600 dark:hover:bg-amber-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Yeni Ürün</span>
        </button>
      </FilterBar>
      
      {/* Ürünler grid  */}
      <ProductsGrid 
        products={filteredProducts} 
        onEdit={handleOpenEditModal} 
        onDelete={handleOpenDeleteModal}
      />

      {/* Düzenleme modalı */}
      {editingProduct && (
        <EditProductModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          product={editingProduct}
          onSave={handleSaveEdit}
        />
      )}

      {/* Silme onay modalı */}
      {productToDelete && (
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Ürünü Sil"
          message={`'${productToDelete.name}' adlı ürünü kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`}
          confirmText="Sil"
          cancelText="İptal"
        />
      )}
      
      {/* Yeni ürün ekleme modalı */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveAdd}
      />
    </div>
  );
};

export default Products;