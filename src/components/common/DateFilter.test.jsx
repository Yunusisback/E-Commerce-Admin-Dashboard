import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest'; 


// Test edilecek bileşen
import DateFilter from './DateFilter';

describe('DateFilter Bileşeni', () => {

  // 1. Render Testi (Basit)
  it('tüm filtre düğmelerini doğru şekilde render etmeli', () => {
    render(<DateFilter />);
    
    // Ekranda bu metinlere sahip düğmelerin olduğunu kontrol et
    expect(screen.getByRole('button', { name: /Bugün/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /7 Gün/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /30 Gün/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Yıllık/i })).toBeInTheDocument();
  });

  // 2. Etkileşim Testi (Önemli Kısım)
  it('bir düğmeye tıklandığında onFilterChange prop\'unu doğru değerle çağırmalı', async () => {
  
    // userEvent kurulumu (gerçek kullanıcı etkileşimini simüle eder)
    const user = userEvent.setup();
    
    // 1. Taklit (Mock) Fonksiyon Oluşturma
    // onFilterChange prop'u yerine geçecek bir casus (spy) fonksiyon
    const mockOnFilterChange = vi.fn();

    // 2. Render
    // Bileşeni casus fonksiyonumuzu prop olarak geçirerek render et
    render(<DateFilter onFilterChange={mockOnFilterChange} />);

    // 3. Etkileşim
    // "7 Gün" yazan düğmeyi bul
    const button7Days = screen.getByRole('button', { name: /7 Gün/i });
    
    // Bu düğmeye tıkla
    await user.click(button7Days);

    // 4. Doğrulama (Assert)
    // Beklentimiz: 'mockOnFilterChange' fonksiyonu 1 kez çağrılmalı
    expect(mockOnFilterChange).toHaveBeenCalledOnce();
    
    // Beklentimiz: Bu fonksiyon '7d' parametresi ile çağrılmalı
    expect(mockOnFilterChange).toHaveBeenCalledWith('7d');
  });

  // 3. Koşullu Render Testi (Aktif Stil)
  it('varsayılan olarak "30 Gün" düğmesini aktif olarak göstermeli', () => {
    render(<DateFilter />);

    // '30 Gün' düğmesinin aktif stili (bg-blue-600) içerdiğini kontrol et
    // Not: Sınıf adlarını test etmek kırılgandır, ancak bu "aktif" durumu test etmenin
    // en basit yollarından biridir
    const button30Days = screen.getByRole('button', { name: /30 Gün/i });
    expect(button30Days.className).toContain('bg-blue-600');

    // '7 Gün' düğmesinin aktif stili içermediğini (pasif olduğunu) kontrol et
    const button7Days = screen.getByRole('button', { name: /7 Gün/i });
    expect(button7Days.className).not.toContain('bg-blue-600');
  });

  
});