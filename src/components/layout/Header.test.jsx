
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Fragment } from 'react'; 
import Header from './Header';
import { useTheme } from '../../hooks/useTheme';


const mockToggleTheme = vi.fn();
vi.mock('../../hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'light', // Testler 'light' modda başlasın
    toggleTheme: mockToggleTheme, // Tıklandığında bu sahte fonksiyon çağrılacak
  }),
}));

// 2. lucide react ikonlarını mockluyoruz (teste gürültü yapmasınlar)
vi.mock('lucide-react', () => ({
  Moon: () => <div data-testid="moon-icon" />,
  Sun: () => <div data-testid="sun-icon" />,
  Bell: (props) => <div data-testid="bell-icon" {...props} />, // 'props'u alması önemli
  Search: () => <div data-testid="search-icon" />,
}));

// 3. @headlessui/react Transition bileşenini mockluyoruz
// Animasyonları beklememek için: 'show' true ise çocukları (children) göster, değilse gösterme.
vi.mock('@headlessui/react', () => ({
  Transition: ({ show, children, as }) => {
    // 'as={Fragment}' kullandığımız için ekstra div eklemiyoruz
    return show ? children : null;
  }
}));

describe('Header Bileşeni', () => {
  
  let user; // userEvent'i her testten önce kurmak için

  beforeEach(() => {
    user = userEvent.setup();
    // Her testten önce sahte fonksiyonun sayacını sıfırla
    mockToggleTheme.mockClear();
  });

  // 1. Gerekli Kısım: Tema (Dark Mode) Düğmesi Etkileşimi
  it('tema düğmesine tıklandığında useTheme() hookundan gelen toggleTheme fonksiyonunu çağırmalı', async () => {
    render(<Header />);
    
    // 'light' modda (mock'ta öyle ayarladık) 'moon-icon' görünür olmalı
    const moonIcon = screen.getByTestId('moon-icon');
    // İkonun en yakın 'button' ebeveynini (parent) bul
    const themeButton = moonIcon.closest('button');
    
    // Düğmeye tıkla
    await user.click(themeButton);
    
    // 'useTheme' hook'undan gelen sahte fonksiyonun 1 kez çağrıldığını doğrula
    expect(mockToggleTheme).toHaveBeenCalledOnce();
  });

  // 2. Gerekli Kısım: Bildirim Panelinin Açılması ve Kapanması
  it('bildirim (zil) düğmesine tıklandığında paneli açmalı ve tekrar tıklandığında kapatmalı', async () => {
    render(<Header />);

    
    // Başlangıçta "Bildirimler" panelinin görünmez olduğunu doğrula
    expect(screen.queryByText('Bildirimler')).not.toBeInTheDocument();

    // Zil ikonunun ebeveyn düğmesini bul
    const bellButton = screen.getByTestId('bell-icon').closest('button');
    
    // Zile tıkla
    await user.click(bellButton);

    // Panelin ("Bildirimler" başlığı) ve içindeki yazının (mock veri)
    // görünür hale geldiğini doğrula
    expect(screen.getByText('Bildirimler')).toBeInTheDocument();
    expect(screen.getByText(/Yeni sipariş alındı/i)).toBeInTheDocument();

    // --- Kapatma Testi ---
    
    // Aynı zile TEKRAR tıkla
    await user.click(bellButton);

    // Panelin ("Bildirimler" başlığı) tekrar görünmez olduğunu doğrula
    expect(screen.queryByText('Bildirimler')).not.toBeInTheDocument();
  });

  // 3. Gerekli Kısım: "Dışarıya Tıklama" (Click Outside) useEffect Testi
  it('panel açıkken dışarıya tıklandığında paneli kapatmalı', async () => {
    render(<Header />);

    // 1. Paneli aç
    const bellButton = screen.getByTestId('bell-icon').closest('button');
    await user.click(bellButton);
    expect(screen.getByText('Bildirimler')).toBeInTheDocument(); // Açık olduğunu onayla

    // 2. "Dışarıya" tıkla (Örn: Arama çubuğu)
    const searchInput = screen.getByPlaceholderText(/Ürün, sipariş veya müşteri ara.../i);
    await user.click(searchInput);

    // 3. Panelin kapandığını doğrula
    expect(screen.queryByText('Bildirimler')).not.toBeInTheDocument();
  });

});