import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Products from './Products';
import { AppProvider } from '../context/AppContext'; 
import { Fragment } from 'react'; 


vi.mock('../data/mockData', () => ({
  allProducts: [
    { id: 1, name: 'iPhone 16 Pro', category: 'Elektronik', price: 31000, stock: 45, sales: 124, image: 'url1.jpg', status: 'active' },
    { id: 8, name: 'Adidas Spor Ayakkabı', category: 'Spor', price: 2500, stock: 150, sales: 89, image: 'url2.jpg', status: 'active' },
    { id: 10, name: 'Ofis Koltuğu', category: 'Ev & Yaşam', price: 450, stock: 200, sales: 134, image: 'url3.jpg', status: 'active' },
  ],
  productCategories: [
    { value: 'all', label: 'Tüm Kategoriler' },
    { value: 'Elektronik', label: 'Elektronik' },
    { value: 'Spor', label: 'Spor' },
    { value: 'Ev & Yaşam', label: 'Ev & Yaşam' }
  ]
}));

// 'ProductCard'ı taklit et, sadece 'onEdit' ve 'onDelete' prop'larını test et
vi.mock('../components/products/ProductCard', () => ({
  default: ({ product, onEdit, onDelete }) => (
    <div data-testid="product-card">
      <span>{product.name}</span>
      <button onClick={() => onEdit(product)}>Düzenle</button>
      <button onClick={() => onDelete(product.id)}>Sil</button>
    </div>
  )
}));

// 'ProductFilters'ı taklit et, 'onAddProductClick' dahil
vi.mock('../components/products/ProductFilters', () => ({
  default: ({ onSearch, onCategoryFilter, onAddProductClick }) => (
    <div>
      <input 
        placeholder="Ürün ara..." 
        onChange={(e) => onSearch(e.target.value)} 
      />
      <select onChange={(e) => onCategoryFilter(e.target.value)}>
        <option value="all">Tüm Kategoriler</option>
        <option value="Spor">Spor</option>
      </select>
      <button onClick={onAddProductClick}>Yeni Ürün</button>
    </div>
  )
}));

// 'EditProductModal'ı taklit et
vi.mock('../components/products/EditProductModal.jsx', () => ({
  default: ({ isOpen, onClose, product, onSave }) => {
    if (!isOpen) return null;
    return (
      <div data-testid="edit-modal">
        <h3>Ürünü Düzenle: {product.name}</h3>
        <button onClick={() => {
          onSave({ ...product, name: 'GÜNCELLENMİŞ ÜRÜN', price: 999 });
          onClose(); 
        }}>Kaydet</button>
        <button onClick={onClose}>İptal</button>
      </div>
    );
  }
}));

// 'ConfirmationModal'ı (Silme Onayı) taklit et
vi.mock('../components/common/ConfirmationModal.jsx', () => ({
  default: ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;
    return (
      <div data-testid="delete-modal">
        <h3>{title}</h3><p>{message}</p>
        <button onClick={() => {
          onConfirm();
          onClose();
        }}>Sil</button>
        <button onClick={onClose}>İptal</button>
      </div>
    );
  }
}));

// 'AddProductModal'ı (Yeni Ürün) taklit et
vi.mock('../components/products/AddProductModal.jsx', () => ({
  default: ({ isOpen, onClose, onSave }) => {
    if (!isOpen) return null;
    return (
      <div data-testid="add-modal">
        <h3>Yeni Ürün Ekle</h3>
        <button onClick={() => {
          onSave({ name: 'Yeni Eklenen Test Ürünü', category: 'Test', price: 100, stock: 10 });
          onClose();
        }}>Ürünü Ekle</button>
        <button onClick={onClose}>İptal</button>
      </div>
    );
  }
}));

// Animasyonları (Transition) atla
vi.mock('@headlessui/react', () => ({
  Transition: ({ show, children }) => (show ? children : null),
  Dialog: ({ children }) => <div>{children}</div>,
  DialogPanel: ({ children }) => <div>{children}</div>,
  DialogTitle: ({ children }) => <h3>{children}</h3>,
}));

// 'Products' sayfası 'useApp' hook'unu kullandığı için 'AppProvider' ile sarmala
const renderProducts = () => {
  return render(
    <AppProvider>
      <Products />
    </AppProvider>
  );
};

describe('Products Sayfası (Entegrasyon Testi)', () => {
  
  let user;
  beforeEach(() => {
    user = userEvent.setup();
  });

  it('arama çubuğuna yazıldığında ürün listesini (grid) doğru filtrelemeli', async () => {
    renderProducts();
    await user.type(screen.getByPlaceholderText(/Ürün ara.../i), 'iPhone');
    expect(screen.getByText('iPhone 16 Pro')).toBeInTheDocument();
    expect(screen.queryByText('Adidas Spor Ayakkabı')).not.toBeInTheDocument();
  });

  it('kategori filtresi seçildiğinde ürün listesini (grid) doğru filtrelemeli', async () => {
    renderProducts();
    await user.selectOptions(screen.getByRole('combobox'), 'Spor');
    expect(screen.getByText('Adidas Spor Ayakkabı')).toBeInTheDocument();
    expect(screen.queryByText('iPhone 16 Pro')).not.toBeInTheDocument();
  });

  it('kategori filtresi "Tüm Kategoriler" seçildiğinde listeyi sıfırlamalı', async () => {
    renderProducts();
    await user.selectOptions(screen.getByRole('combobox'), 'Spor');
    expect(screen.getAllByTestId('product-card')).toHaveLength(1);
    await user.selectOptions(screen.getByRole('combobox'), 'Tüm Kategoriler');
    expect(screen.getAllByTestId('product-card')).toHaveLength(3);
  });

  it('"Sil" düğmesine tıklandığında onay modalını açmalı ve onaylayınca silmeli', async () => {
    renderProducts(); 
    expect(screen.getByText('iPhone 16 Pro')).toBeInTheDocument();
    expect(screen.queryByTestId('delete-modal')).not.toBeInTheDocument(); 

    // 'ProductCard' mock'undaki "Sil" düğmesine tıkla
    const deleteButtons = screen.getAllByRole('button', { name: /Sil/i });
    await user.click(deleteButtons[0]);

    // Onay modalının açıldığını doğrula
    expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
    
    // 'screen.getByRole' birden fazla "Sil" (hem kartta hem modalda) bulduğu için 'within' kullan
    const deleteModal = screen.getByTestId('delete-modal');
    const confirmDeleteButton = within(deleteModal).getByRole('button', { name: 'Sil', exact: true });
    
    await user.click(confirmDeleteButton);

    // Modalın kapandığını ve ürünün silindiğini doğrula
    expect(screen.queryByTestId('delete-modal')).not.toBeInTheDocument();
    expect(screen.queryByText('iPhone 16 Pro')).not.toBeInTheDocument();
  });

  it('"Düzenle" düğmesine tıklandığında modalı açmalı ve kaydettiğinde listeyi güncellemeli', async () => {
    renderProducts(); 
    const editButtons = screen.getAllByRole('button', { name: /Düzenle/i });
    await user.click(editButtons[1]); // Adidas'ı düzenle
    
    // Modalın açıldığını ve "Kaydet"e basıldığını doğrula
    expect(screen.getByTestId('edit-modal')).toBeInTheDocument();
    const saveButton = screen.getByRole('button', { name: /Kaydet/i });
    await user.click(saveButton);

    // Modalın kapandığını ve ürünün güncellendiğini doğrula
    expect(screen.queryByTestId('edit-modal')).not.toBeInTheDocument(); 
    expect(screen.getByText('GÜNCELLENMİŞ ÜRÜN')).toBeInTheDocument();
    expect(screen.queryByText('Adidas Spor Ayakkabı')).not.toBeInTheDocument();
  });

  it('"Yeni Ürün" düğmesine tıklandığında "Yeni Ürün Ekle" modalını açmalı ve kaydedince listeye eklemeli', async () => {
    renderProducts(); 
    expect(screen.getAllByTestId('product-card')).toHaveLength(3); 
    
    // "Yeni Ürün" düğmesine tıkla
    const addButton = screen.getByRole('button', { name: /Yeni Ürün/i });
    await user.click(addButton);

    // "Ekle" modalının açıldığını ve "Ekle"ye basıldığını doğrula
    expect(screen.getByTestId('add-modal')).toBeInTheDocument();
    const saveAddButton = screen.getByRole('button', { name: /Ürünü Ekle/i });
    await user.click(saveAddButton);

    // Modalın kapandığını ve yeni ürünün listeye eklendiğini doğrula
    expect(screen.queryByTestId('add-modal')).not.toBeInTheDocument();
    expect(screen.getByText('Yeni Eklenen Test Ürünü')).toBeInTheDocument();
    expect(screen.getAllByTestId('product-card')).toHaveLength(4);
  });
});