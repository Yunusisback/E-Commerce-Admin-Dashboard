import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from './Sidebar';

// 'lucide-react' ikonlarını mockla 
vi.mock('lucide-react', () => ({
  LayoutDashboard: () => <div data-testid="icon-mock" />,
  ShoppingCart: () => <div data-testid="icon-mock" />,
  Package: () => <div data-testid="icon-mock" />,
  Users: () => <div data-testid="icon-mock" />,
  BarChart3: () => <div data-testid="icon-mock" />,
  Settings: () => <div data-testid="icon-mock" />,
  LogOut: () => <div data-testid="icon-mock" />,
}));

// 'Sidebar'ı 'MemoryRouter' ile sarmalayan yardımcı render fonksiyonu
// Bu, 'NavLink' bileşeninin çalışması için gereklidir
const renderSidebar = (route = '/') => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Sidebar />
    </MemoryRouter>
  );
};

describe('Sidebar Bileşeni', () => {

  it('tüm menü linklerini ve Çıkış Yap düğmesini doğru render etmeli', () => {
    renderSidebar();

    // Tüm navigasyon linklerinin ekranda olduğunu doğrula
    expect(screen.getByRole('link', { name: /Dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Siparişler/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ürünler/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Müşteriler/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Analizler/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ayarlar/i })).toBeInTheDocument();
    
    // 'Çıkış Yap' düğmesinin ekranda olduğunu doğrula
    expect(screen.getByRole('button', { name: /Çıkış Yap/i })).toBeInTheDocument();
  });

  it('aktif sayfadayken doğru linke "aktif" stilini (mavi) uygulamalı', () => {
    // Testi '/orders' (Siparişler) sayfasındaymış gibi başlat
    renderSidebar('/orders');

    const ordersLink = screen.getByRole('link', { name: /Siparişler/i });
    const dashboardLink = screen.getByRole('link', { name: /Dashboard/i });

    // 'Siparişler' linkinin 'isActive' stillerini (mavi) içerdiğini doğrula
    expect(ordersLink.className).toContain('bg-blue-50');
    expect(ordersLink.className).toContain('text-blue-600');

    // 'Dashboard' linkinin pasif stilleri (gri) içerdiğini doğrula
    expect(dashboardLink.className).toContain('text-gray-700');
    expect(dashboardLink.className).not.toContain('bg-blue-50');
  });

  it('varsayılan ("/") sayfadayken "Dashboard" linkini aktif (mavi) yapmalı', () => {
    // Testi '/' (Dashboard) sayfasındaymış gibi başlat
    renderSidebar('/');

    const ordersLink = screen.getByRole('link', { name: /Siparişler/i });
    const dashboardLink = screen.getByRole('link', { name: /Dashboard/i });

    // 'Dashboard' linki aktif (mavi) olmalı
    expect(dashboardLink.className).toContain('bg-blue-50');
    expect(dashboardLink.className).toContain('text-blue-600');

    // 'Siparişler' linki pasif (gri) olmalı
    expect(ordersLink.className).toContain('text-gray-700');
  });

});