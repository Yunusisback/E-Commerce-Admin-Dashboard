import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Settings from './Settings';
import { AppProvider } from '../context/AppContext'; 

// İkonları taklit et
vi.mock('lucide-react', () => ({
  User: () => <div data-testid="user-icon" />,
  Bell: () => <div data-testid="bell-icon" />,
}));

// 'ProfileSettings' 'useApp' hook'unu kullandığı için alt bileşenleri taklit et
vi.mock('../components/settings/ProfileSettings', () => ({
  default: () => <div data-testid="profile-settings-mock">Profil Ayarları Bileşeni</div>
}));
vi.mock('../components/settings/NotificationSettings', () => ({
  default: () => <div>Bildirim Ayarları Bileşeni</div>
}));

// 'Settings' sayfası 'useApp' hook'unu kullandığı için 'AppProvider' ile sarmala
const renderSettings = () => {
  return render(
    <AppProvider>
      <Settings />
    </AppProvider>
  );
};

describe('Settings Sayfası (Sekme Testi)', () => {

  const setupUser = () => userEvent.setup();

  it('ilk açıldığında varsayılan olarak "Profil Ayarları" sekmesini göstermeli', () => {
    renderSettings(); 
    
    // Varsayılan sekme içeriğinin göründüğünü doğrula
    expect(screen.getByText('Profil Ayarları Bileşeni')).toBeInTheDocument();
    // Diğer sekme içeriğinin görünmediğini doğrula
    expect(screen.queryByText('Bildirim Ayarları Bileşeni')).not.toBeInTheDocument();
    
    // Varsayılan sekme düğmesinin "aktif" stilde olduğunu doğrula (Kömür/Amber teması)
    const profileTabButton = screen.getByRole('button', { name: /Profil Ayarları/i });
    expect(profileTabButton.className).toContain('dark:border-amber-500');
  });

  it('"Bildirim Ayarları" sekmesine tıklandığında içeriği doğru değiştirmeli', async () => {
    const user = setupUser();
    renderSettings(); 

    expect(screen.getByText('Profil Ayarları Bileşeni')).toBeInTheDocument();

    // "Bildirim Ayarları" sekmesine tıkla
    const notificationTabButton = screen.getByRole('button', { name: /Bildirim Ayarları/i });
    await user.click(notificationTabButton);

    // İçeriğin değiştiğini doğrula
    expect(screen.queryByText('Profil Ayarları Bileşeni')).not.toBeInTheDocument();
    expect(screen.getByText('Bildirim Ayarları Bileşeni')).toBeInTheDocument();
    
    // Yeni sekmenin "aktif" stili aldığını doğrula
    expect(notificationTabButton.className).toContain('dark:border-amber-500');
  });
});