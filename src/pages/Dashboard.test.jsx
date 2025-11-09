import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { mockData } from '../data/mockData'; 
import Dashboard from './Dashboard';
import { AppProvider } from '../context/AppContext'; 

vi.mock('../data/mockData', () => ({
  mockData: {
    kpis: { totalSales: 145890, totalOrders: 1247, averageOrderValue: 117, activeCustomers: 892 },
    salesTrend: new Array(30).fill({ date: '01 Eki', sales: 4200, orders: 45 }),
    categoryData: [], topProducts: [], recentOrders: []
  }
}));

// 'KPICard'ı taklit et, sadece 'title' ve 'value' prop'larını test et
vi.mock('../components/dashboard/KPICard', () => ({
  default: ({ title, value }) => (
    <div data-testid="kpi-card">
      <span>{title}</span>
      <span>₺{value.toLocaleString('tr-TR')}</span>
    </div>
  )
}));

// Diğer alt bileşenleri (teste gürültü yapmamaları için) taklit et
vi.mock('../components/dashboard/SalesChart', () => ({ default: () => <div /> }));
vi.mock('../components/dashboard/CategoryChart', () => ({ default: () => <div /> }));
vi.mock('../components/dashboard/TopProducts', () => ({ default: () => <div /> }));
vi.mock('../components/dashboard/RecentOrders', () => ({ default: () => <div /> }));
vi.mock('lucide-react', () => ({
  DollarSign: () => 'DollarSign', ShoppingBag: () => 'ShoppingBag',
  TrendingUp: () => 'TrendingUp', Users: () => 'Users',
}));

// 'Dashboard' sayfası 'useApp' hook'unu kullandığı için 'AppProvider' ile sarmala
const renderDashboard = () => {
  return render(
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
};

describe('Dashboard Sayfası (DateFilter Entegrasyon Testi)', () => {
  
  const setupUser = () => userEvent.setup();

  it('ilk açıldığında 30 günlük verileri göstermeli', () => {
    renderDashboard(); 
    // Varsayılan (30 Günlük) 'totalSales' değerini ara
    expect(screen.getByText('₺145.890')).toBeInTheDocument();
  });

  it('"7 Gün" filtresine tıklandığında KPI kartlarını güncellemeli', async () => {
    const user = setupUser();
    renderDashboard(); 
    expect(screen.getByText('₺145.890')).toBeInTheDocument();

    // "7 Gün" düğmesine tıkla
    const button7Days = screen.getByRole('button', { name: /7 Gün/i });
    await user.click(button7Days);

    // 'handleFilterChange' içindeki '7d' verisinin (₺45.230) ekrana gelmesini bekle
    expect(screen.getByText('₺45.230')).toBeInTheDocument();
    // Eski verinin kaybolduğunu doğrula
    expect(screen.queryByText('₺145.890')).not.toBeInTheDocument();
  });

  it('"Bugün" filtresine tıklandığında KPI kartlarını güncellemeli', async () => {
    const user = setupUser();
    renderDashboard(); 

    // "Bugün" düğmesine tıkla
    const buttonToday = screen.getByRole('button', { name: /Bugün/i });
    await user.click(buttonToday);

    // 'handleFilterChange' içindeki 'today' verisinin (₺8.500) gelmesini bekle
    expect(screen.getByText('₺8.500')).toBeInTheDocument();
    expect(screen.queryByText('₺145.890')).not.toBeInTheDocument();
  });

  it('filtreyi değiştirip "30 Gün"e geri dönünce verileri sıfırlamalı', async () => {
    const user = setupUser();
    renderDashboard(); 

    // Önce "7 Gün"e tıkla
    await user.click(screen.getByRole('button', { name: /7 Gün/i }));
    expect(screen.getByText('₺45.230')).toBeInTheDocument();

    // Sonra "30 Gün"e tıkla
    await user.click(screen.getByRole('button', { name: /30 Gün/i }));

    // Varsayılan (30 günlük) verinin geri geldiğini doğrula
    expect(screen.getByText('₺145.890')).toBeInTheDocument();
    expect(screen.queryByText('₺45.230')).not.toBeInTheDocument();
  });
});