import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest'; 
import { Fragment } from 'react'; 
import { AppProvider } from '../../context/AppContext'; 
import ProfileSettings from './ProfileSettings';
import Header from '../layout/Header'; 




// 'setTimeout' çağrıldığında, bekleme (1000ms), fonksiyonu (callback) hemen çalıştır
global.setTimeout = vi.fn((callback) => {
  callback();
  return undefined; 
});



vi.mock('../../hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: vi.fn(), 
  }),
}));
vi.mock('lucide-react', () => ({
  Moon: () => <div data-testid="moon-icon" />,
  Sun: () => <div data-testid="sun-icon" />,
  Bell: (props) => <div data-testid="bell-icon" {...props} />,
  Search: () => <div data-testid="search-icon" />,
}));
vi.mock('@headlessui/react', () => ({
  Transition: ({ show, as, children }) => {
    if (as === Fragment) return show ? children : null;
    return show ? <div data-testid="transition-mock">{children}</div> : null;
  },
  "Transition.Child": ({ as, children }) => {
    if (as === Fragment) return children;
    return <div>{children}</div>;
  },
}));

const renderTestComponents = () => {
  return render(
    <AppProvider>
      <Header />
      <ProfileSettings />
    </AppProvider>
  );
};


describe('ProfileSettings ve Header Entegrasyonu', () => {

  let user;
  
  beforeEach(() => {
  
    user = userEvent.setup();
    // setTimeout'un kaç kez çağrıldığını sıfırla
    global.setTimeout.mockClear(); 
  });

  it('ProfileSettings\'te "Profili Güncelle"ye basıldığında Header\'ın güncellenmesi', async () => {
    renderTestComponents(); 
    
    expect(screen.getByText('Admin User')).toBeInTheDocument();
    const nameInput = screen.getByLabelText(/Ad Soyad/i);
    await user.clear(nameInput);
    await user.type(nameInput, 'Admin User08');
    const submitButton = screen.getByRole('button', { name: /Profili Güncelle/i });
    await user.click(submitButton);
    


    // Beklenti: "Kaydedildi!" mesajı ekrana gelmeli
    expect(screen.getByText(/Profil Kaydedildi!/i)).toBeInTheDocument();
    
    // Beklenti: Header güncellenmeli
    expect(screen.getByText('Admin User08')).toBeInTheDocument();
    expect(screen.queryByText('Admin User')).not.toBeInTheDocument();
    
    // Beklenti: Düğme normale dönmeli
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



    // Beklenti: "Parola Değiştirildi!" mesajı ekrana gelmeli
    expect(screen.getByText(/Parola Değiştirildi!/i)).toBeInTheDocument();
    
    // Beklenti: Input alanları TEMİZLENMELİ
    expect(screen.getByLabelText(/Mevcut Parola/i).value).toBe('');
    expect(screen.getByLabelText('Yeni Parola').value).toBe('');
    expect(screen.getByLabelText('Yeni Parola (Tekrar)').value).toBe('');
    
    // Beklenti: Düğme normale dönmeli
    expect(screen.getByRole('button', { name: /Parolayı Değiştir/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Değiştiriliyor.../i })).not.toBeInTheDocument();
  });
});