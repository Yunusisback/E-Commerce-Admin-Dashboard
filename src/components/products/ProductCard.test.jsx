import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductCard from './ProductCard';



// 'lucide-react' ikonlarını mock'luyoruz
vi.mock('lucide-react', async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    Edit: (props) => <div data-testid="edit-icon" {...props} />,
    Trash2: (props) => <div data-testid="trash-icon" {...props} />,
    TrendingUp: (props) => <div data-testid="trending-up-icon" {...props} />,
  };
});

// 1.  mockProduct, sizin mockData.js'inizdeki 
// (iPhone 16 Pro) verisiyle güncellendi
const mockProduct = {
  id: 1,
  name: 'iPhone 16 Pro',
  category: 'Elektronik',
  price: 31000,
  stock: 45,
  sales: 124,
  image: 'https://st-troy.mncdn.com/Content/media/ProductImg/original/mynf3tua-iphone-16-pro-128gb-desert-titanium-638617384632302005.jpg?width=785', 
  status: 'active'
};

const mockOnEdit = vi.fn();
const mockOnDelete = vi.fn();

describe('ProductCard Bileşeni', () => {

  it('ürün bilgilerini, formatlanmış fiyatı ve "Stokta" durumunu doğru göstermeli', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    // 2.  Assertions (beklentiler) güncel mock veriye göre düzeltildi
    expect(screen.getByText('iPhone 16 Pro')).toBeInTheDocument();
    expect(screen.getByText('₺31.000')).toBeInTheDocument();
    expect(screen.getByText(/124 satış/i)).toBeInTheDocument();
    
    // 3.  'it.skip'ler kaldırıldı ve 'status' kontrolü düzeltildi
    // (Bileşeninizdeki fonksiyonları doldurduğunuz için bu test artık geçmeli)
    const badge = screen.getByText('Stokta');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('bg-green-100'); 
  });

  // 4.  'it.skip' (atla) kaldırıldı
  it('durum "low-stock" olduğunda "Az Stok" etiketini (sarı) göstermeli', () => {
    const lowStockProduct = { ...mockProduct, status: 'low-stock' };
    
    render(
      <ProductCard 
        product={lowStockProduct} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    const badge = screen.getByText('Az Stok');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('bg-yellow-100');
  });

  // 4.  'it.skip' (atla) kaldırıldı
  it('durum "out-of-stock" olduğunda "Stokta Yok" etiketini (kırmızı) göstermeli', () => {
    const outOfStockProduct = { ...mockProduct, status: 'out-of-stock' };
    
    render(
      <ProductCard 
        product={outOfStockProduct} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    const badge = screen.getByText('Stokta Yok');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('bg-red-100');
  });
});