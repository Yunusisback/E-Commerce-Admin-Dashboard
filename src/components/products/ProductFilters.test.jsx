
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { productCategories } from '../../data/mockData'; 
import ProductFilters from './ProductFilters';




vi.mock('../../data/mockData', () => ({
  productCategories: [
    { value: 'all', label: 'Tüm Kategoriler' },
    { value: 'Elektronik', label: 'Elektronik' },
    { value: 'Spor', label: 'Spor' },
  ]
}));

describe('ProductFilters Bileşeni', () => {

  // Testlerde 'userEvent' (kullanıcı simülasyonu) kullanmak için kurulum
  const setupUser = () => userEvent.setup();

  // 1. Gerekli Kısım: Arama çubuğu (input) etkileşimi
  it('arama çubuğuna yazıldığında "onSearch" prop\'unu doğru değerle çağırmalı', async () => {
    const user = setupUser();
    const mockOnSearch = vi.fn(); // 'onSearch' için sahte fonksiyon
    
    render(<ProductFilters onSearch={mockOnSearch} onCategoryFilter={() => {}} />);

    // Arama çubuğunu placeholder metni ile bul
    const searchInput = screen.getByPlaceholderText(/Ürün ara.../i);

    // Arama çubuğuna "Laptop" yaz
    await user.type(searchInput, 'Laptop');

    // Beklenti: 'onSearch' fonksiyonu en son "Laptop" değeriyle çağrılmalı
    expect(mockOnSearch).toHaveBeenLastCalledWith('Laptop');
    expect(mockOnSearch).toHaveBeenCalledTimes(6); // 'Laptop' 6 karakterdir
  });

  // 2. Gerekli Kısım: Kategori filtresi (select) etkileşimi
  it('kategori filtresinden bir seçenek seçildiğinde "onCategoryFilter" prop\'unu doğru değerle çağırmalı', async () => {
    const user = setupUser();
    const mockOnCategoryFilter = vi.fn(); // 'onCategoryFilter' için sahte fonksiyon

    render(<ProductFilters onSearch={() => {}} onCategoryFilter={mockOnCategoryFilter} />);

    // 'select' elementini (rolü 'combobox') bul
    const categorySelect = screen.getByRole('combobox');

    // 'select' elementinden "Elektronik" seçeneğini seç
    // (Bu veri mock'ladığımız 'productCategories'den geliyor)
    await user.selectOptions(categorySelect, 'Elektronik');

    // Beklenti: 'mockOnCategoryFilter' 1 kez çağrılmalı
    expect(mockOnCategoryFilter).toHaveBeenCalledOnce();
    // Beklenti: 'mockOnCategoryFilter' "Elektronik" değeriyle çağrılmalı
    expect(mockOnCategoryFilter).toHaveBeenCalledWith('Elektronik');
  });

  // 3. Render Testi (Basit)
  it('"Yeni Ürün" düğmesini ve filtreleri doğru render etmeli', () => {
    render(<ProductFilters onSearch={() => {}} onCategoryFilter={() => {}} />);

    // "Yeni Ürün" düğmesi ekranda mı? (Önemli)
    expect(screen.getByRole('button', { name: /Yeni Ürün/i })).toBeInTheDocument();
    
    // Arama çubuğu ekranda mı?
    expect(screen.getByPlaceholderText(/Ürün ara.../i)).toBeInTheDocument();
    
    // Kategori filtresi ekranda mı?
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});