import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from './Sidebar';


vi.mock('lucide-react', () => ({
  LayoutDashboard: () => <div data-testid="icon-mock" />,
  ShoppingCart: () => <div data-testid="icon-mock" />,
  Package: () => <div data-testid="icon-mock" />,
  Users: () => <div data-testid="icon-mock" />,
  BarChart3: () => <div data-testid="icon-mock" />,
  Settings: () => <div data-testid="icon-mock" />,
  LogOut: () => <div data-testid="icon-mock" />,
}));

/**
 * 'Sidebar' bileşenini test etmek için, onu 'MemoryRouter' ile
 * sarmalayan bir yardımcı (helper) render fonksiyonu
 * @param {string} route - Testin hangi URL'de başlayacağını belirler (örn: '/orders')
 */
const renderSidebar = (route = '/') => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Sidebar />
    </MemoryRouter>
  );
};

describe('Sidebar Bileşeni', () => {

  // 1. Gerekli Kısım: Render Testi
  it('tüm menü linklerini ve Çıkış Yap düğmesini doğru render etmeli', () => {
    renderSidebar(); // Varsayılan '/' (Dashboard) sayfasında render et

    // Tüm linklerin (NavLink) ekranda olduğunu 'role: linkk ile kontrol et
    expect(screen.getByRole('link', { name: /Dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Siparişler/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ürünler/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Müşteriler/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Analizler/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ayarlar/i })).toBeInTheDocument();
    
    // 'Çıkış Yap' bir link değil,
    // düğme (button) olduğu için role button ile kontrol et
    expect(screen.getByRole('button', { name: /Çıkış Yap/i })).toBeInTheDocument();
  });

  // 2. Gerekli Kısım: 'isActive' (Aktif Link) Testi
  it('aktif sayfadayken doğru linke "aktif" stilini (mavi) uygulamalı', () => {
    // Testi '/orders' (Siparişler) sayfasındaymış gibi başlat
    renderSidebar('/orders');

    // "Siparişler" linkini bul
    const ordersLink = screen.getByRole('link', { name: /Siparişler/i });
    
    // "Dashboard" linkini bul
    const dashboardLink = screen.getByRole('link', { name: /Dashboard/i });

    // Beklenti: "Siparişler" linki 'isActive' stillerini (mavi) içermeli
    expect(ordersLink.className).toContain('bg-blue-50');
    expect(ordersLink.className).toContain('text-blue-600');

    // Beklenti: "Dashboard" linki pasif stilleri (gri) içermeli

    expect(dashboardLink.className).toContain('text-gray-700');
    expect(dashboardLink.className).not.toContain('bg-blue-50'); // Mavi OLMAMALI
  });

  // 3. Gerekli Kısım: 'isActive' (Varsayılan Sayfa) Testi
  it('varsayılan ("/") sayfadayken "Dashboard" linkini aktif (mavi) yapmalı', () => {
    // Testi '/' (Dashboard) sayfasındaymış gibi başlat
    renderSidebar('/');

    const ordersLink = screen.getByRole('link', { name: /Siparişler/i });
    const dashboardLink = screen.getByRole('link', { name: /Dashboard/i });

    // Beklenti: Dashboard" linki aktif (mavi) olmalı
    expect(dashboardLink.className).toContain('bg-blue-50');
    expect(dashboardLink.className).toContain('text-blue-600');

    // Beklenti: "Siparişler" linki pasif (gri) olmalı
    expect(ordersLink.className).toContain('text-gray-700');
  });

});