import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { productCategories } from '../../data/mockData'; 
import ProductFilters from './ProductFilters';

// 'mockData'dan gelen 'productCategories' verisini taklit et
vi.mock('../../data/mockData', () => ({
  productCategories: [
    { value: 'all', label: 'Tüm Kategoriler' },
    { value: 'Elektronik', label: 'Elektronik' },
    { value: 'Spor', label: 'Spor' },
  ]
}));

describe('ProductFilters Bileşeni', () => {

  const setupUser = () => userEvent.setup();

  it('arama çubuğuna yazıldığında "onSearch" prop\'unu doğru değerle çağırmalı', async () => {
    const user = setupUser();
    // 'onSearch' prop'unun çağrıldığını izlemek için sahte fonksiyon
    const mockOnSearch = vi.fn(); 
    
    render(<ProductFilters onSearch={mockOnSearch} onCategoryFilter={() => {}} />);

    const searchInput = screen.getByPlaceholderText(/Ürün ara.../i);
    await user.type(searchInput, 'Laptop');

    // 'user.type' harf harf yazar, bu yüzden son çağrıyı kontrol ediyoruz
    expect(mockOnSearch).toHaveBeenLastCalledWith('Laptop');
    expect(mockOnSearch).toHaveBeenCalledTimes(6); // 'Laptop' 6 karakterdir
  });

  it('kategori filtresinden bir seçenek seçildiğinde "onCategoryFilter" prop\'unu doğru değerle çağırmalı', async () => {
    const user = setupUser();
    // 'onCategoryFilter' prop'unun çağrıldığını izlemek için sahte fonksiyon
    const mockOnCategoryFilter = vi.fn(); 

    render(<ProductFilters onSearch={() => {}} onCategoryFilter={mockOnCategoryFilter} />);

    // HTML'deki <select> elementinin 'role'ü 'combobox'tur
    const categorySelect = screen.getByRole('combobox');

    // 'Elektronik' seçeneğini seç (bu veri mock'tan geliyor)
    await user.selectOptions(categorySelect, 'Elektronik');

    // 'Elektronik' değeriyle üst bileşenin 1 kez bilgilendirildiğini doğrula
    expect(mockOnCategoryFilter).toHaveBeenCalledOnce();
    expect(mockOnCategoryFilter).toHaveBeenCalledWith('Elektronik');
  });

  it('"Yeni Ürün" düğmesini ve filtreleri doğru render etmeli', () => {
    render(<ProductFilters onSearch={() => {}} onCategoryFilter={() => {}} />);

    // Tüm ana elemanların ekranda olduğunu doğrula
    expect(screen.getByRole('button', { name: /Yeni Ürün/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ürün ara.../i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});