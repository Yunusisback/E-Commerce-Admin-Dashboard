import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Fragment } from 'react'; 
import Header from './Header';
import { AppProvider, useApp } from '../../context/AppContext'; 
import { useTheme } from '../../hooks/useTheme';

const mockToggleTheme = vi.fn();
vi.mock('../../hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'light', 
    toggleTheme: mockToggleTheme,
  }),
}));

// mock
vi.mock('lucide-react', async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    Moon: () => <div data-testid="moon-icon" />,
    Sun: () => <div data-testid="sun-icon" />,
    Bell: (props) => <div data-testid="bell-icon" {...props} />,
    Menu: (props) => <div data-testid="menu-icon" {...props} />, 
    Mail: (props) => <div data-testid="mail-icon" {...props} />, 
    Settings: (props) => <div data-testid="settings-icon" {...props} />, 
    LogOut: (props) => <div data-testid="logout-icon" {...props} />, 
    ChevronDown: (props) => <div data-testid="chevron-down-icon" {...props} />,
    User: (props) => <div data-testid="user-icon" {...props} />, 
    Search: () => <div data-testid="search-icon" />, 
  };
});

//  Headless UI mocku
vi.mock('@headlessui/react', async (importOriginal) => {
  const mod = await importOriginal();
  
  // Menu'yü bir bileşen VE alt özelliklere sahip bir obje olarak mock'la
  const MockMenu = ({ children, as }) => (<div as={as} data-testid="headless-menu">{children}</div>);
  MockMenu.Button = ({ children, ...props }) => <button {...props}>{children}</button>;
  MockMenu.Items = ({ children, ...props }) => <div {...props}>{children}</div>;
  MockMenu.Item = ({ children }) => {
    if (typeof children === 'function') {
      return <div>{children({ active: false })}</div>; 
    }
    return <div>{children}</div>;
  };

  return {
    ...mod,
    // Transition mocku
    Transition: ({ show, children, as }) => {
      if (as === Fragment) {
        if (show === undefined || show) return children;
        return null;
      }
      return show ? <div>{children}</div> : null;
    },
    // Menu mocku 
    Menu: MockMenu,
  };
});

// react-router-dom Link'i mock'la
vi.mock('react-router-dom', async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    Link: ({ children, to }) => <a href={to}>{children}</a>,
  };
});

// AppContexti mockla (Header'ın tek başına çalışabilmesi için)
vi.mock('../../context/AppContext', async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod, // AppProviderı koru
    useApp: vi.fn(() => ({ // useApp i mockla
      user: { name: 'Thomas', email: 'thomas@gmail.com', avatar: 'avatar.jpg' },
      pageTitle: 'Test Sayfası',
      toggleSidebar: vi.fn(),
    })),
  };
});

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
    
    // Her testten önce useApp mock'unu varsayılan değere döndür
    vi.mocked(useApp).mockImplementation(() => ({
      user: { name: 'Thomas', email: 'thomas@gmail.com', avatar: 'avatar.jpg' },
      pageTitle: 'Test Sayfası',
      toggleSidebar: vi.fn(),
    }));
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
    
    const bellButton = screen.getByTestId('bell-icon').closest('button');
    
    await user.click(bellButton);
    expect(screen.getByText('Bildirimler')).toBeInTheDocument();
    expect(screen.getByText(/Yeni sipariş alındı/i)).toBeInTheDocument();
    
    await user.click(bellButton);
    expect(screen.queryByText('Bildirimler')).not.toBeInTheDocument();
  });

  it('panel açıkken dışarıya tıklandığında paneli kapatmalı (useEffect mantığı)', async () => {
    renderHeader(); 

    const bellButton = screen.getByTestId('bell-icon').closest('button');
    await user.click(bellButton);
    expect(screen.getByText('Bildirimler')).toBeInTheDocument(); 

    fireEvent.mouseDown(document.body);
    
    expect(screen.queryByText('Bildirimler')).not.toBeInTheDocument();
  });


  it('kullanıcı avatarına tıklandığında dropdown menüyü açmalı', async () => {
    renderHeader();

    // Mock'umuz 'MenuItem' fonksiyonunu çağırıp render ettiği için 'Profil' DOM'da olmalı
    expect(screen.getByText('Profil')).toBeInTheDocument();
    expect(screen.getByText('Ayarlar')).toBeInTheDocument();

    // Tıklamayı test edelim
    const avatarButton = screen.getByRole('button', { name: /Thomas/i });
    await user.click(avatarButton);

    // Tıklamadan sonra menü öğelerinin hala DOM'da olduğunu doğrula
    expect(screen.getByText('Profil')).toBeInTheDocument();
    expect(screen.getByText('Ayarlar')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Çıkış Yap/i })).toBeInTheDocument();
  });
});