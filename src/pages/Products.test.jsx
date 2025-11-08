import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { allProducts, productCategories } from '../data/mockData'; 
import Products from './Products';
import { Fragment } from 'react'; 




// 1. mockData (Aynı, test için bu verileri kullanıyoruz)
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

// 2. ProductCard Mock'u (Aynı)
vi.mock('../components/products/ProductCard', () => ({
  default: ({ product, onEdit, onDelete }) => (
    <div data-testid="product-card">
      <span>{product.name}</span>
      <span>{product.price}</span>
      <button onClick={() => onEdit(product)}>Düzenle</button>
      <button onClick={() => onDelete(product.id)}>Sil</button>
    </div>
  )
}));

// 3. EditProductModal Mocku (DÜZELTİLDİ)
vi.mock('../components/products/EditProductModal.jsx', () => ({
  default: ({ isOpen, onClose, product, onSave }) => {
    if (!isOpen) return null;
    return (
      <div data-testid="edit-modal">
        <h3>Ürünü Düzenle: {product.name}</h3>
        <button 
          onClick={() => {
            onSave({ ...product, name: 'GÜNCELLENMİŞ ÜRÜN', price: 999 });
            onClose(); // Modalı kapatması için bu satır eklendi
          }}
        >
          Kaydet
        </button>
        <button onClick={onClose}>İptal</button>
      </div>
    );
  }
}));

// 4. HeadlessUI Mocku (Aynı)
vi.mock('@headlessui/react', () => ({
  Transition: ({ show, as, children }) => {
    if (as === Fragment) return show ? children : null;
    return show ? <div data-testid="transition-mock">{children}</div> : null;
  },
  "Transition.Child": ({ as, children }) => {
    if (as === Fragment) return children;
    return <div>{children}</div>;
  },
  Dialog: ({ children, as = 'div', onClose }) => {
    const Component = as;
    return <Component data-testid="dialog-mock">{children}</Component>;
  },
  "Dialog.Panel": ({ children }) => <div>{children}</div>,
  "Dialog.Title": ({ children, as = 'h3' }) => {
    const Component = as;
    return <Component>{children}</Component>;
  },
}));

// 5. window.confirm Mock'u (Aynı)
global.window.confirm = vi.fn(() => true);


describe('Products Sayfası (Entegrasyon Testi)', () => {
  
  const setupUser = () => userEvent.setup();

  beforeEach(() => {
    global.window.confirm.mockClear();
  });

  //  (Önceki Filtre Testleri - Aynı) 
  it('arama çubuğuna yazıldığında ürün listesini (grid) doğru filtrelemeli', async () => {
    const user = setupUser();
    render(<Products />);
    expect(screen.getByText('iPhone 16 Pro')).toBeInTheDocument();
    expect(screen.getByText('Adidas Spor Ayakkabı')).toBeInTheDocument();
    expect(screen.getByText('Ofis Koltuğu')).toBeInTheDocument();
    const searchInput = screen.getByPlaceholderText(/Ürün ara.../i);
    await user.type(searchInput, 'iPhone');
    expect(screen.getByText('iPhone 16 Pro')).toBeInTheDocument();
    expect(screen.queryByText('Adidas Spor Ayakkabı')).not.toBeInTheDocument();
  });

  it('kategori filtresi seçildiğinde ürün listesini (grid) doğru filtrelemeli', async () => {
    const user = setupUser();
    render(<Products />);
    expect(screen.getAllByTestId('product-card')).toHaveLength(3);
    const categorySelect = screen.getByRole('combobox');
    await user.selectOptions(categorySelect, 'Spor');
    expect(screen.getByText('Adidas Spor Ayakkabı')).toBeInTheDocument();
    expect(screen.queryByText('iPhone 16 Pro')).not.toBeInTheDocument();
    expect(screen.getAllByTestId('product-card')).toHaveLength(1);
  });

  it('kategori filtresi "Tüm Kategoriler" seçildiğinde listeyi sıfırlamalı', async () => {
    const user = setupUser();
    render(<Products />);
    const categorySelect = screen.getByRole('combobox');
    await user.selectOptions(categorySelect, 'Spor');
    expect(screen.getAllByTestId('product-card')).toHaveLength(1);
    await user.selectOptions(categorySelect, 'Tüm Kategoriler');
    expect(screen.getAllByTestId('product-card')).toHaveLength(3);
  });

  //  YENİ TESTLER (DÜZENLEME VE SİLME) 

  it('"Sil" düğmesine tıklandığında ürünü listeden kaldırmalı', async () => {
    const user = setupUser();
    render(<Products />);
    expect(screen.getByText('iPhone 16 Pro')).toBeInTheDocument();
    const deleteButtons = screen.getAllByRole('button', { name: /Sil/i });
    await user.click(deleteButtons[0]);
    expect(global.window.confirm).toHaveBeenCalledOnce();
    expect(screen.queryByText('iPhone 16 Pro')).not.toBeInTheDocument();
    expect(screen.getByText('Adidas Spor Ayakkabı')).toBeInTheDocument();
  });

  it('"Düzenle" düğmesine tıklandığında modalı açmalı ve kaydettiğinde listeyi güncellemeli', async () => {
    const user = setupUser();
    render(<Products />);
    expect(screen.queryByTestId('edit-modal')).not.toBeInTheDocument();
    const editButtons = screen.getAllByRole('button', { name: /Düzenle/i });
    await user.click(editButtons[1]); // Adidas'ı düzenle
    expect(screen.getByTestId('edit-modal')).toBeInTheDocument();
    expect(screen.getByText('Ürünü Düzenle: Adidas Spor Ayakkabı')).toBeInTheDocument();
    const saveButton = screen.getByRole('button', { name: /Kaydet/i });
    await user.click(saveButton);
    expect(screen.queryByTestId('edit-modal')).not.toBeInTheDocument(); 
    expect(screen.getByText('GÜNCELLENMİŞ ÜRÜN')).toBeInTheDocument();
    expect(screen.queryByText('Adidas Spor Ayakkabı')).not.toBeInTheDocument();
    expect(screen.getByText('iPhone 16 Pro')).toBeInTheDocument();
  });
});