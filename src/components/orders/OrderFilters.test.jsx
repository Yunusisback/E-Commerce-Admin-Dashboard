import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';


// Test edilecek bileşen
import OrderFilters from './OrderFilters';

describe('OrderFilters Bileşeni', () => {

  // Testlerde userEvent (kullanıcı simülasyonu) kullanmak için kurulum
  const setupUser = () => userEvent.setup();

  // 1 Gerekli Kısım: Arama çubuğu (input) etkileşimi
  it('arama çubuğuna yazıldığında "onSearch" prop\'unu doğru değerle çağırmalı', async () => {
    const user = setupUser();
    // 'onSearch' propu için sahte (mock) bir fonksiyon oluştur
    const mockOnSearch = vi.fn();
    
    render(<OrderFilters onSearch={mockOnSearch} onStatusFilter={() => {}} />);

    // Arama çubuğunu placeholder metni ile bul
    const searchInput = screen.getByPlaceholderText(/Sipariş no, müşteri veya ürün ara.../i);

    // Arama çubuğuna "ORD-123" yaz
    await user.type(searchInput, 'ORD-123');

    // Beklenti: 'mockOnSearch' fonksiyonu 'ORD-123' değeriyle çağrılmalı
    // Not: user.type harf harf yazar, bu yüzden 'O', 'OR', 'ORD' ... 'ORD-123'
    // olarak 7 kez çağrılır. Biz son çağrının doğru olup olmadığına bakıyoruz.
    expect(mockOnSearch).toHaveBeenLastCalledWith('ORD-123');
    expect(mockOnSearch).toHaveBeenCalledTimes(7); // 'ORD-123' 7 karakterdir
  });

  // 2. Gerekli Kısım: Durum filtresi (select) etkileşimi
  it('durum filtresinden bir seçenek seçildiğinde "onStatusFilter" prop\'unu doğru değerle çağırmalı', async () => {
    const user = setupUser();
    // 'onStatusFilter' prop'u için sahte (mock) bir fonksiyon oluştur
    const mockOnStatusFilter = vi.fn();

    render(<OrderFilters onSearch={() => {}} onStatusFilter={mockOnStatusFilter} />);

    // 'select' elementini o anki varsayılan değeri ('Tümü') ile bul
    // Not: Rol 'combobox'tur, 'select' değil.
    const statusSelect = screen.getByRole('combobox');

    // 'select' elementinden "Kargoda" seçeneğini seç
    await user.selectOptions(statusSelect, 'Kargoda');

    // Beklenti: 'mockOnStatusFilter' fonksiyonu 1 kez çağrılmalı
    expect(mockOnStatusFilter).toHaveBeenCalledOnce();
    // Beklenti: 'mockOnStatusFilter' fonksiyonu "Kargoda" değeriyle çağrılmalı
    expect(mockOnStatusFilter).toHaveBeenCalledWith('Kargoda');
  });

  // 3. Render Testi (Basit)
  it('tüm filtre elemanlarını doğru şekilde render etmeli', () => {
    render(<OrderFilters onSearch={() => {}} onStatusFilter={() => {}} />);

    // Arama çubuğu ekranda mı?
    expect(screen.getByPlaceholderText(/Sipariş no, müşteri veya ürün ara.../i)).toBeInTheDocument();
    
    // Durum filtresi (select) ekranda mı?
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    
    // Filtre seçenekleri içinde mi? (Örn: 'Tümü' ve 'İptal')
    expect(screen.getByRole('option', { name: 'Tümü' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'İptal' })).toBeInTheDocument();
  });
});