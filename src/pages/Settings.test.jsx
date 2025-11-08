import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Settings from './Settings';


vi.mock('lucide-react', () => ({
  User: () => <div data-testid="user-icon" />,
  Bell: () => <div data-testid="bell-icon" />,
}));

// 2. Alt bileşenleri mock'luyoruz (içeriklerini değil,
//    sadece doğru zamanda görünüp/kaybolduklarını test edeceğiz)
vi.mock('../components/settings/ProfileSettings', () => ({
  default: () => <div>Profil Ayarları Bileşeni</div>
}));
vi.mock('../components/settings/NotificationSettings', () => ({
  default: () => <div>Bildirim Ayarları Bileşeni</div>
}));

describe('Settings Sayfası (Sekme Testi)', () => {

  const setupUser = () => userEvent.setup();

  // 1. Gerekli Kısım: Varsayılan Durum 
  it('ilk açıldığında varsayılan olarak "Profil Ayarları" sekmesini göstermeli', () => {
    render(<Settings />);
    
    // Beklenti: "Profil" içeriği ekranda olmalı
    expect(screen.getByText('Profil Ayarları Bileşeni')).toBeInTheDocument();
    
    // Beklenti: "Bildirim" içeriği ekranda OLMAMALI
    expect(screen.queryByText('Bildirim Ayarları Bileşeni')).not.toBeInTheDocument();

    // Beklenti: "Profil Ayarları" düğmesi "aktif" (mavi) stilde olmalı
    const profileTabButton = screen.getByRole('button', { name: /Profil Ayarları/i });
    expect(profileTabButton.className).toContain('border-blue-600');
  });

  // 2. Gerekli Kısım: Sekme Değiştirme Etkileşimi
  it('"Bildirim Ayarları" sekmesine tıklandığında içeriği doğru değiştirmeli', async () => {
    const user = setupUser();
    render(<Settings />);

    // Başlangıç Kontrolü (Varsayılan) 
    expect(screen.getByText('Profil Ayarları Bileşeni')).toBeInTheDocument();
    expect(screen.queryByText('Bildirim Ayarları Bileşeni')).not.toBeInTheDocument();

    //  Eylem: "Bildirim Ayarları" düğmesine tıkla 
    const notificationTabButton = screen.getByRole('button', { name: /Bildirim Ayarları/i });
    await user.click(notificationTabButton);

    //  Sonuç Kontrolü (Değişim) 
    
    // Beklenti: "Profil" içeriği kaybolmalı
    expect(screen.queryByText('Profil Ayarları Bileşeni')).not.toBeInTheDocument();

    // Beklenti: "Bildirim" içeriği görünür olmalı
    expect(screen.getByText('Bildirim Ayarları Bileşeni')).toBeInTheDocument();

    // Beklenti: "Bildirim Ayarları" düğmesi "aktif" (mavi) stili almalı
    expect(notificationTabButton.className).toContain('border-blue-600');
    
    // Beklenti "Profil Ayarları" düğmesi "pasif" stile dönmeli
    const profileTabButton = screen.getByRole('button', { name: /Profil Ayarları/i });
    expect(profileTabButton.className).not.toContain('border-blue-600');
  });
});