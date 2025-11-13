import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest'; 
import { Fragment } from 'react'; 
import { AppProvider } from '../../context/AppContext'; 
import ProfileSettings from './ProfileSettings';
import Header from '../layout/Header'; 

// 'setTimeout' mock'la
global.setTimeout = vi.fn((callback) => {
  callback();
  return undefined; 
});

// 'useTheme' hook'unu mock'la
vi.mock('../../hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: vi.fn(), 
  }),
}));

// GÜNCELLENMİŞ MOCK: Header'ın ihtiyaç duyduğu tüm ikonlar
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
  };
});

// GÜNCELLENMİŞ Headless UI mock'u
vi.mock('@headlessui/react', async (importOriginal) => {
  const mod = await importOriginal();
  
  // Menu'yü bir bileşen VE alt özelliklere sahip bir obje olarak mock'la
  const MockMenu = ({ children, as }) => (<div as={as} data-testid="headless-menu">{children}</div>);
  MockMenu.Button = ({ children, ...props }) => <button {...props}>{children}</button>;
  MockMenu.Items = ({ children, ...props }) => <div {...props}>{children}</div>;
  MockMenu.Item = ({ children }) => <div>{children}</div>;

  return {
    ...mod,
    Transition: ({ show, children, as }) => {
      if (as === Fragment) {
        if (show === undefined || show) return children;
        return null;
      }
      return show ? <div>{children}</div> : null;
    },
    TransitionChild: ({ children, as }) => { 
      if (as === Fragment) return children;
      return <div>{children}</div>;
    },
    Dialog: ({ children }) => <div>{children}</div>,
    DialogPanel: ({ children }) => <div>{children}</div>,
    DialogTitle: ({ children }) => <h3>{children}</h3>,
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


describe('ProfileSettings ve Header Entegrasyonu', () => {

  let user;
  
  beforeEach(() => {
    user = userEvent.setup();
    global.setTimeout.mockClear(); 
  });

  const renderTestComponents = () => {
    return render(
      <AppProvider>
        <Header />
        <ProfileSettings />
      </AppProvider>
    );
  };

  it('ProfileSettings\'te "Profili Güncelle"ye basıldığında Header\'ın güncellenmesi', async () => {
    renderTestComponents(); 
    
    // Varsayılan kullanıcı adını Context'ten al
    expect(screen.getByText('Thomas')).toBeInTheDocument();
    
    const nameInput = screen.getByLabelText(/Ad Soyad/i);
    await user.clear(nameInput);
    await user.type(nameInput, 'Admin User08');
    
    const submitButton = screen.getByRole('button', { name: /Profili Güncelle/i });
    await user.click(submitButton);

    expect(screen.getByText(/Profil Kaydedildi!/i)).toBeInTheDocument();
    // Header'ın güncellendiğini kontrol et
    expect(screen.getByText('Admin User08')).toBeInTheDocument();
    expect(screen.queryByText('Thomas')).not.toBeInTheDocument();
    
    expect(screen.getByRole('button', { name: /Profili Güncelle/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Kaydediliyor.../i })).not.toBeInTheDocument();
  });

  it('"Parolayı Değiştir" düğmesine tıklandığında mesaj göstermeli ve alanları temizlemeli', async () => {
    renderTestComponents(); 

    expect(screen.queryByText(/Parola Değiştirildi!/i)).not.toBeInTheDocument();

    const currentPassInput = screen.getByLabelText(/Mevcut Parola/i);
    await user.type(currentPassInput, '1234');
    
    const newPassInput = screen.getByLabelText('Yeni Parola'); 
    const confirmPassInput = screen.getByLabelText('Yeni Parola (Tekrar)');
    
    await user.type(newPassInput, '5678');
    await user.type(confirmPassInput, '5678');

    expect(currentPassInput.value).toBe('1234');
    expect(newPassInput.value).toBe('5678');

    const submitButton = screen.getByRole('button', { name: /Parolayı Değiştir/i });
    await user.click(submitButton);

    expect(screen.getByText(/Parola Değiştirildi!/i)).toBeInTheDocument();
    
    expect(screen.getByLabelText(/Mevcut Parola/i).value).toBe('');
    expect(screen.getByLabelText('Yeni Parola').value).toBe('');
    expect(screen.getByLabelText('Yeni Parola (Tekrar)').value).toBe('');
    
    expect(screen.getByRole('button', { name: /Parolayı Değiştir/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Değiştiriliyor.../i })).not.toBeInTheDocument();
  });
});