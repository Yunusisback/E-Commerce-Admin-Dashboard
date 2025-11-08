import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Fragment } from 'react'; 
import Header from './Header';
import { AppProvider } from '../../context/AppContext'; 
import { useTheme } from '../../hooks/useTheme';

const mockToggleTheme = vi.fn();
vi.mock('../../hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'light', 
    toggleTheme: mockToggleTheme,
  }),
}));
vi.mock('lucide-react', () => ({
  Moon: () => <div data-testid="moon-icon" />,
  Sun: () => <div data-testid="sun-icon" />,
  Bell: (props) => <div data-testid="bell-icon" {...props} />,
  Search: () => <div data-testid="search-icon" />,
}));

//  @headlessui/react (Transition) mock'u GÜNCELLENDİ
// 'show' true ise içeriği göster, değilse 'null' döndür
vi.mock('@headlessui/react', () => ({
  Transition: ({ show, children }) => {
    return show ? children : null; 
  }
}));

const renderHeader = () => {
  return render(
    <AppProvider> 
      <Header />
    </AppProvider>
  );
};

describe('Header Bileşeni', () => {
  
  let user; 
  beforeEach(() => {
    user = userEvent.setup(); // Zamanlayıcı ayarı kaldırıldı
    mockToggleTheme.mockClear();
  });

  it('tema düğmesine tıklandığında useTheme() hookundan gelen toggleTheme fonksiyonunu çağırmalı', async () => {
    renderHeader(); 
    
    const moonIcon = screen.getByTestId('moon-icon');
    const themeButton = moonIcon.closest('button');
    await user.click(themeButton);
    expect(mockToggleTheme).toHaveBeenCalledOnce();
  });

  it('bildirim (zil) düğmesine tıklandığında paneli açmalı ve tekrar tıklandığında kapatmalı', async () => {
    renderHeader(); 

    expect(screen.queryByText('Bildirimler')).not.toBeInTheDocument();
    
    // 3.  Zil ikonunu bul
    const bellButton = screen.getByTestId('bell-icon').closest('button');
    
    // Paneli aç
    await user.click(bellButton);
    
    expect(screen.getByText('Bildirimler')).toBeInTheDocument();
    expect(screen.getByText(/Yeni sipariş alındı/i)).toBeInTheDocument();
    
    // Paneli kapat
    await user.click(bellButton);

    expect(screen.queryByText('Bildirimler')).not.toBeInTheDocument();
  });

  // 4.  "Click outside" testi, Header.jsx'teki boş useEffect'e
  // ve zamanlama sorunlarına göre güncellendi
  it('panel açıkken dışarıya tıklandığında paneli kapatmalı (useEffect mantığı)', async () => {
    renderHeader(); 

    const bellButton = screen.getByTestId('bell-icon').closest('button');
    // Paneli aç
    await user.click(bellButton);
    expect(screen.getByText('Bildirimler')).toBeInTheDocument(); 

    const searchInput = screen.getByPlaceholderText(/Ürün, sipariş veya müşteri ara.../i);
    
    // 'mousedown' event'ini manuel tetikle (Header.jsx'teki useEffect bunu dinliyor)
    fireEvent.mouseDown(searchInput);
    expect(screen.queryByText('Bildirimler')).not.toBeInTheDocument();
  });
});