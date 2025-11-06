
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductCard from './ProductCard';

// 'lucide-react' ikonlarını sahte (mock) ikonlarla değiştiriyoruz
vi.mock('lucide-react', async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    Edit: (props) => <div data-testid="edit-icon" {...props} />,
    Trash2: (props) => <div data-testid="trash-icon" {...props} />,
    TrendingUp: (props) => <div data-testid="trending-up-icon" {...props} />,
  };
});

// Testlerde kullanılacak standart bir sahte ürün verisi
const mockProduct = {
  id: 1,
  name: 'Test Ürünü: Laptop',
  category: 'Elektronik',
  price: 15000,
  stock: 50,
  sales: 120,
  image: '💻', // Emoji
  status: 'active' // Varsayılan durum
};

describe('ProductCard Bileşeni', () => {

  // 1. Gerekli Kısım: Standart Render ve Veri Gösterimi
  it('ürün bilgilerini, formatlanmış fiyatı ve "Stokta" durumunu doğru göstermeli', () => {
    render(<ProductCard product={mockProduct} />);

    // Ürün adı ekranda mı?
    expect(screen.getByText('Test Ürünü: Laptop')).toBeInTheDocument();
    
    // Fiyat (formatCurrency(15000) -> ₺15.000) ekranda mı?
    expect(screen.getByText('₺15.000')).toBeInTheDocument();

    // Satış (formatNumber(120) -> "120 satış") ekranda mı?
    expect(screen.getByText(/120 satış/i)).toBeInTheDocument();
    
    // Varsayılan ('active') durum için "Stokta" metni ekranda mı?
    const badge = screen.getByText('Stokta');
    expect(badge).toBeInTheDocument();
    // ve etiketi yeşil mi?
    expect(badge.className).toContain('bg-green-100');

    // Eylem düğmeleri ekrannda mı?
    expect(screen.getByRole('button', { name: /Düzenle/i })).toBeInTheDocument();
    // "Sil" düğmesi (sadece ikon) ekranda mı?
    expect(screen.getByTestId('trash-icon')).toBeInTheDocument();
  });

  // 2. Gerekli Kısım: Koşullu Mantık (Az Stok)
  it('durum "low-stock" olduğunda "Az Stok" etiketini (sarı) göstermeli', () => {
    // 'status'u 'low-stock' olarak değiştirilmiş yeni bir ürün oluştur
    const lowStockProduct = { ...mockProduct, status: 'low-stock' };
    
    render(<ProductCard product={lowStockProduct} />);

    // "Az Stok" metni ekranda mı?
    const badge = screen.getByText('Az Stok');
    expect(badge).toBeInTheDocument();

    // Etiket sarı mı?
    expect(badge.className).toContain('bg-yellow-100');
    expect(badge.className).not.toContain('bg-green-100'); 
  });

  // 3. Gerekli Kısım: Koşullu Mantık (Stokta Yok)
  it('durum "out-of-stock" olduğunda "Stokta Yok" etiketini (kırmızı) göstermeli', () => {
    // 'status'u 'out-of-stock' olarak değiştirilmiş yeni bir ürün oluştur
    const outOfStockProduct = { ...mockProduct, status: 'out-of-stock' };
    
    render(<ProductCard product={outOfStockProduct} />);

    // "Stokta Yok" metni ekranda mı?
    const badge = screen.getByText('Stokta Yok');
    expect(badge).toBeInTheDocument();

    // Etiket kırmızı mı?
    expect(badge.className).toContain('bg-red-100');
    expect(badge.className).not.toContain('bg-green-100'); 
  });

});