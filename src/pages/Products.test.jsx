import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { allProducts, productCategories } from '../data/mockData'; 
import Products from './Products';


vi.mock('../data/mockData', () => ({
  // 'Products' sayfasının ihtiyaç duyduğu 'allProducts' verisi
  allProducts: [
    { id: 1, name: 'iPhone 15 Pro', category: 'Elektronik', price: 31000, stock: 45, sales: 124, image: '📱', status: 'active' },
    { id: 8, name: 'Adidas Spor Ayakkabı', category: 'Spor', price: 2500, stock: 150, sales: 89, image: '👟', status: 'active' },
    { id: 10, name: 'Yoga Matı', category: 'Spor', price: 450, stock: 200, sales: 134, image: '🧘', status: 'active' },
  ],
  // 'ProductFilters'ın ihtiyaç duyduğu 'productCategories' verisi
  productCategories: [
    { value: 'all', label: 'Tüm Kategoriler' },
    { value: 'Elektronik', label: 'Elektronik' },
    { value: 'Spor', label: 'Spor' },
  ]
}));

// 'ProductCard' bileşenini mock'luyoruz, çünkü tüm 'ProductCard'ın mantığını değil,
// sadece 'ProductsGrid'in doğru kartı render edip etmediğini test etmek istiyoruz.
// Bu, testi hızlandırır ve 'ProductCard'ın içindeki 'lucide-react' gibi
// bağımlılıklardan kurtarır.
vi.mock('../components/products/ProductCard', () => ({
  default: ({ product }) => (
    // Ekranda sadece ürün adını bir 'data-testid' ile basalım
    <div data-testid="product-card">{product.name}</div>
  )
}));

describe('Products Sayfası (Entegrasyon Testi)', () => {
  
  const setupUser = () => userEvent.setup();

  // 1. Gerekli Kısım: Arama Filtresi Entegrasyonu
  it('arama çubuğuna yazıldığında ürün listesini (grid) doğru filtrelemeli', async () => {
    const user = setupUser();
    render(<Products />);

    // Başlangıç Kontrolü: 3 ürünün de ekranda olduğunu doğrula
    expect(screen.getByText('iPhone 15 Pro')).toBeInTheDocument();
    expect(screen.getByText('Adidas Spor Ayakkabı')).toBeInTheDocument();
    expect(screen.getByText('Yoga Matı')).toBeInTheDocument();
    
    // Arama çubuğunu bul ve "iPhone" yaz
    const searchInput = screen.getByPlaceholderText(/Ürün ara.../i);
    await user.type(searchInput, 'iPhone');

    // Filtreleme Sonrası Kontrol:
    // 1. "iPhone" ekranda kalmalı
    expect(screen.getByText('iPhone 15 Pro')).toBeInTheDocument();
    // 2. Diğer ürünler ekrandan kaybolmalı
    expect(screen.queryByText('Adidas Spor Ayakkabı')).not.toBeInTheDocument();
    expect(screen.queryByText('Yoga Matı')).not.toBeInTheDocument();
  });

  // 2. Gerekli Kısım: Kategori Filtresi Entegrasyonu
  it('kategori filtresi seçildiğinde ürün listesini (grid) doğru filtrelemeli', async () => {
    const user = setupUser();
    render(<Products />);

    // Başlangıç Kontrolü: 3 ürün de ekranda
    expect(screen.getAllByTestId('product-card')).toHaveLength(3);
    
    // Kategori 'select' menüsünü bul ve "Spor"u seç
    const categorySelect = screen.getByRole('combobox');
    await user.selectOptions(categorySelect, 'Spor');

    // Filtreleme Sonrası Kontrol:
    // 1. Spor ürünleri (2 adet) ekranda kalmalı
    expect(screen.getByText('Adidas Spor Ayakkabı')).toBeInTheDocument();
    expect(screen.getByText('Yoga Matı')).toBeInTheDocument();
    // 2. "iPhone" (Elektronik) ekrandan kaybolmalı
    expect(screen.queryByText('iPhone 15 Pro')).not.toBeInTheDocument();
    // 3. Toplam kart sayısı 2 olmalı
    expect(screen.getAllByTestId('product-card')).toHaveLength(2);
  });

  // 3. Gerekli Kısım: Filtreyi Sıfırlama
  it('kategori filtresi "Tüm Kategoriler" seçildiğinde listeyi sıfırlamalı', async () => {
    const user = setupUser();
    render(<Products />);

    // Önce "Spor" kategorisini seç
    const categorySelect = screen.getByRole('combobox');
    await user.selectOptions(categorySelect, 'Spor');
    // Ekranda 2 ürün olduğunu doğrula
    expect(screen.getAllByTestId('product-card')).toHaveLength(2);

    // Şimdi "Tüm Kategoriler"i seçerek filtreyi sıfırla
    await user.selectOptions(categorySelect, 'Tüm Kategoriler');
    
    // Sıfırlama Sonrası Kontrol:
    // 3 ürünün de tekrar ekranda olduğunu doğrula
    expect(screen.getAllByTestId('product-card')).toHaveLength(3);
    expect(screen.getByText('iPhone 15 Pro')).toBeInTheDocument();
  });
});