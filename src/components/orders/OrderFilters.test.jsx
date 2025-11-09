import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import OrderFilters from './OrderFilters';

describe('OrderFilters Bileşeni', () => {

  // 'userEvent'in 'setup' metodunu her testte tekrar çağırmamak için
  const setupUser = () => userEvent.setup();

  it('arama çubuğuna yazıldığında "onSearch" prop\'unu doğru değerle çağırmalı', async () => {
    const user = setupUser();
    // 'onSearch' prop'unun çağrıldığını izlemek için sahte fonksiyon
    const mockOnSearch = vi.fn();
    
    render(<OrderFilters onSearch={mockOnSearch} onStatusFilter={() => {}} />);

    const searchInput = screen.getByPlaceholderText(/Sipariş no, müşteri veya ürün ara.../i);
    await user.type(searchInput, 'ORD-123');

    // 'user.type' harf harf yazar, bu yüzden son çağrıyı kontrol ediyoruz
    expect(mockOnSearch).toHaveBeenLastCalledWith('ORD-123');
    expect(mockOnSearch).toHaveBeenCalledTimes(7);
  });

  it('durum filtresinden bir seçenek seçildiğinde "onStatusFilter" prop\'unu doğru değerle çağırmalı', async () => {
    const user = setupUser();
    // 'onStatusFilter' prop'unun çağrıldığını izlemek için sahte fonksiyon
    const mockOnStatusFilter = vi.fn();

    render(<OrderFilters onSearch={() => {}} onStatusFilter={mockOnStatusFilter} />);

    // HTML'deki <select> elementinin 'role'ü 'combobox'tur
    const statusSelect = screen.getByRole('combobox');
    await user.selectOptions(statusSelect, 'Kargoda');

    // 'Kargoda' değeriyle üst bileşenin 1 kez bilgilendirildiğini doğrula
    expect(mockOnStatusFilter).toHaveBeenCalledOnce();
    expect(mockOnStatusFilter).toHaveBeenCalledWith('Kargoda');
  });

  it('tüm filtre elemanlarını doğru şekilde render etmeli', () => {
    render(<OrderFilters onSearch={() => {}} onStatusFilter={() => {}} />);

    // Arama çubuğu ve 'select' kutusunun ekranda olduğunu doğrula
    expect(screen.getByPlaceholderText(/Sipariş no, müşteri veya ürün ara.../i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    
    // 'select' içindeki <option> etiketlerinin render edildiğini doğrula
    expect(screen.getByRole('option', { name: 'Tümü' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'İptal' })).toBeInTheDocument();
  });
});