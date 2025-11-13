import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductCard from './ProductCard';

// 'lucide react' ikonlarını sahte ikonlarla değiştir
vi.mock('lucide-react', async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    Edit: (props) => <div data-testid="edit-icon" {...props} />,
    Trash2: (props) => <div data-testid="trash-icon" {...props} />,
    TrendingUp: (props) => <div data-testid="trending-up-icon" {...props} />,
  };
});

// Test için 'mockData.js' ile senkronize sahte bir ürün objesi
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

// 'ProductCard'ın 'onEdit' ve 'onDelete' prop'ları için sahte fonksiyonlar
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

    // Beklentiler: Prop'ların doğru render edildiğini doğrula
    expect(screen.getByText('iPhone 16 Pro')).toBeInTheDocument();
    expect(screen.getByText('₺31.000')).toBeInTheDocument();
    expect(screen.getByText(/124 satış/i)).toBeInTheDocument();
    
    // 'status: active' için doğru metin ve stilin uygulandığını doğrula
    const badge = screen.getByText('Stokta');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('bg-green-100'); 
  });

  it('durum "low-stock" olduğunda "Az Stok" etiketini (sarı) göstermeli', () => {
    const lowStockProduct = { ...mockProduct, status: 'low-stock' };
    
    render(
      <ProductCard 
        product={lowStockProduct} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    // 'status: low-stock' için doğru metin ve stilin uygulandığını doğrula
    const badge = screen.getByText('Az Stok');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('bg-yellow-100');
  });

  it('durum "out-of-stock" olduğunda "Stokta Yok" etiketini (kırmızı) göstermeli', () => {
    const outOfStockProduct = { ...mockProduct, status: 'out-of-stock' };
    
    render(
      <ProductCard 
        product={outOfStockProduct} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    // 'status: out-of-stock' için doğru metin ve stilin uygulandığını doğrula
    const badge = screen.getByText('Stokta Yok');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('bg-red-100');
  });
});