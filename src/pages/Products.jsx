import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext'; 
import ProductsGrid from '../components/products/ProductsGrid';
import ProductFilters from '../components/products/ProductFilters';
import { allProducts as initialProducts } from '../data/mockData'; 
import EditProductModal from '../components/products/EditProductModal'; 
import ConfirmationModal from '../components/common/ConfirmationModal';
import AddProductModal from '../components/products/AddProductModal'; 


const Products = () => {
  const { setPageTitle } = useApp();

  useEffect(() => {
    setPageTitle('Ürünler'); 
  }, [setPageTitle]);

  // Ürün verileri
  const [allProducts, setAllProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  
  // Düzenleme modalı durumu
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); 

  // Silme modalı durumu
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null); 

  // Yeni ürün modalı durumu
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Arama filtreleme
  const handleSearch = (searchTerm) => {
    const filtered = allProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Kategori filtreleme
  const handleCategoryFilter = (category) => {
    if (category === 'all') {
      setFilteredProducts(allProducts); 
    } else {
      const filtered = allProducts.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  // Silme işlemleri
  const handleOpenDeleteModal = (productId) => {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
      setProductToDelete(product);
      setIsDeleteModalOpen(true); 
    }
  };

  const handleConfirmDelete = () => {
    if (!productToDelete) return; 
    const updatedProducts = allProducts.filter(p => p.id !== productToDelete.id);
    setAllProducts(updatedProducts);
    const updatedFilteredProducts = filteredProducts.filter(p => p.id !== productToDelete.id);
    setFilteredProducts(updatedFilteredProducts);
    console.log("Ürün silindi:", productToDelete.id);
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  // Düzenleme işlemleri
  const handleOpenEditModal = (product) => {
    setEditingProduct(product); 
    setIsEditModalOpen(true);     
  };

  const handleSaveEdit = (updatedProduct) => {
    const updatedList = allProducts.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setAllProducts(updatedList);
    const updatedFilteredList = filteredProducts.map(p =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setFilteredProducts(updatedFilteredList);
    console.log("Ürün güncellendi:", updatedProduct);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  // Yeni ürün ekleme
  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveAdd = (newProductData) => {
    const newProduct = {
      ...newProductData,
      id: `p${Date.now()}` // Benzersiz ID
    };

    const updatedList = [newProduct, ...allProducts];
    setAllProducts(updatedList);
    
    const updatedFilteredList = [newProduct, ...filteredProducts];
    setFilteredProducts(updatedFilteredList);

    console.log("Yeni ürün eklendi:", newProduct);
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

      {/* Filtreleme ve yeni ürün butonu */}
      <ProductFilters 
        onSearch={handleSearch} 
        onCategoryFilter={handleCategoryFilter}
        onAddProductClick={handleOpenAddModal} 
      />
      
      {/* Ürünler grid */}
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