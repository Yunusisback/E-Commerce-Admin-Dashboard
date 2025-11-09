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
vi.mock('@headlessui/react', () => ({
  // Animasyonları atla, sadece 'show' durumuna göre içeriği göster/gizle
  Transition: ({ show, children }) => {
    return show ? children : null; 
  }
}));

// Test için 'Header' bileşenini 'AppProvider' ile sarmala
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
    user = userEvent.setup(); 
    mockToggleTheme.mockClear();
  });

  it('tema düğmesine tıklandığında useTheme() hookundan gelen toggleTheme fonksiyonunu çağırmalı', async () => {
    renderHeader(); 
    
    const moonIcon = screen.getByTestId('moon-icon');
    const themeButton = moonIcon.closest('button');
    await user.click(themeButton);

    // 'toggleTheme' fonksiyonunun 1 kez çağrıldığını doğrula
    expect(mockToggleTheme).toHaveBeenCalledOnce();
  });

  it('bildirim (zil) düğmesine tıklandığında paneli açmalı ve tekrar tıklandığında kapatmalı', async () => {
    renderHeader(); 

    // Panel başlangıçta kapalı olmalı
    expect(screen.queryByText('Bildirimler')).not.toBeInTheDocument();
    
    const bellButton = screen.getByTestId('bell-icon').closest('button');
    
    // Zile tıkla (Paneli aç)
    await user.click(bellButton);
    expect(screen.getByText('Bildirimler')).toBeInTheDocument();
    expect(screen.getByText(/Yeni sipariş alındı/i)).toBeInTheDocument();
    
    // Zile tekrar tıkla (Paneli kapat)
    await user.click(bellButton);
    expect(screen.queryByText('Bildirimler')).not.toBeInTheDocument();
  });

  it('panel açıkken dışarıya tıklandığında paneli kapatmalı (useEffect mantığı)', async () => {
    renderHeader(); 

    const bellButton = screen.getByTestId('bell-icon').closest('button');
    await user.click(bellButton);
    expect(screen.getByText('Bildirimler')).toBeInTheDocument(); 

    // 'Header.jsx' içindeki 'useEffect'in 'mousedown' event'ini tetikle
    fireEvent.mouseDown(document.body);
    
    // Panelin kapandığını doğrula
    expect(screen.queryByText('Bildirimler')).not.toBeInTheDocument();
  });
});