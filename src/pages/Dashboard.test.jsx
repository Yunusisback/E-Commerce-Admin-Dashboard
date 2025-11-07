import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { mockData } from '../data/mockData'; 
import Dashboard from './Dashboard';

vi.mock('../data/mockData', () => ({
  mockData: {
    kpis: {
      totalSales: 145890, // Varsayılan (30 Gün)
      totalOrders: 1247,
      averageOrderValue: 117,
      activeCustomers: 892
    },
    // SalesChartın çökmemesi için 30 elemanlı bir dizi
    salesTrend: new Array(30).fill({ date: '01 Eki', sales: 4200, orders: 45 }),
    categoryData: [],
    topProducts: [],
    recentOrders: []
  }
}));

// 2. KPICardı mockluyoruz
// 'KPICardın iç mantığını (formatlama vb.) değil
// sadece 'Dashboard'dan doğru 'value' prop'unu alıp almadığını test edeceğiz
vi.mock('../components/dashboard/KPICard', () => ({
  default: ({ title, value }) => (
    <div data-testid="kpi-card">
      <span>{title}</span>
      {/* formatCurrency'yi burada manuel simüle ediyoruz (örn: ₺145.890) */}
      <span>₺{value.toLocaleString('tr-TR')}</span>
    </div>
  )
}));

// 3. Diğer tüm alt bileşenleri mockluyoruz (bu testin odak noktası değiller)
vi.mock('../components/dashboard/SalesChart', () => ({
  default: () => <div data-testid="sales-chart-mock">Sales Chart</div>
}));
vi.mock('../components/dashboard/CategoryChart', () => ({
  default: () => <div data-testid="category-chart-mock">Category Chart</div>
}));
vi.mock('../components/dashboard/TopProducts', () => ({
  default: () => <div data-testid="top-products-mock">Top Products</div>
}));
vi.mock('../components/dashboard/RecentOrders', () => ({
  default: () => <div data-testid="recent-orders-mock">Recent Orders</div>
}));

// 4. lucide-react ikonlarını mockluyoruz
vi.mock('lucide-react', () => ({
  DollarSign: () => 'DollarSign',
  ShoppingBag: () => 'ShoppingBag',
  TrendingUp: () => 'TrendingUp',
  Users: () => 'Users',
}));


describe('Dashboard Sayfası (DateFilter Entegrasyon Testi)', () => {
  
  const setupUser = () => userEvent.setup();

  // Test 1: Varsayılan (30 Gün) durumu
  it('ilk açıldığında 30 günlük verileri göstermeli', () => {
    render(<Dashboard />);
    
    // Varsayılan (30 Günlük) 'totalSales' değerini (₺145.890) arıyoruz
    expect(screen.getByText('₺145.890')).toBeInTheDocument();
  });

  // Test 2: "7 Gün" Etkileşimi
  it('"7 Gün" filtresine tıklandığında KPI kartlarını güncellemeli', async () => {
    const user = setupUser();
    render(<Dashboard />);

    // Önce 30 günlük verinin (₺145.890) ekranda olduğunu doğrula
    expect(screen.getByText('₺145.890')).toBeInTheDocument();

    // "7 Gün" düğmesine tıkla
    const button7Days = screen.getByRole('button', { name: /7 Gün/i });
    await user.click(button7Days);

    // Şimdi Dashboard.jsx'teki 'handleFilterChange' içindeki
    // '7d' verisinin (₺45.230) ekrana gelmesini bekle
    expect(screen.getByText('₺45.230')).toBeInTheDocument();
    
    // Eski 30 günlük verinin (₺145.890) artık ekranda OLMADIĞINI doğrula
    expect(screen.queryByText('₺145.890')).not.toBeInTheDocument();
  });

  // Test 3: "Bugün" Etkileşimi
  it('"Bugün" filtresine tıklandığında KPI kartlarını güncellemeli', async () => {
    const user = setupUser();
    render(<Dashboard />);

    // "Bugün" düğmesine tıkla
    const buttonToday = screen.getByRole('button', { name: /Bugün/i });
    await user.click(buttonToday);

    // 'handleFilterChange' içindeki 'today' verisinin (₺8.500) gelmesini bekle
    expect(screen.getByText('₺8.500')).toBeInTheDocument();
    expect(screen.queryByText('₺145.890')).not.toBeInTheDocument();
  });

  // Test 4: Sıfırlama (30 Güne Dönüş)
  it('filtreyi değiştirip "30 Gün"e geri dönünce verileri sıfırlamalı', async () => {
    const user = setupUser();
    render(<Dashboard />);

    // 1. "7 Gün"e tıkla
    await user.click(screen.getByRole('button', { name: /7 Gün/i }));
    // 7 günlük verinin (₺45.230) geldiğini doğrula
    expect(screen.getByText('₺45.230')).toBeInTheDocument();

    // 2. "30 Gün"e geri tıkla
    await user.click(screen.getByRole('button', { name: /30 Gün/i }));

    // 3. Varsayılan 30 günlük verinin (₺145.890) geri geldiğini doğrula
    expect(screen.getByText('₺145.890')).toBeInTheDocument();
    expect(screen.queryByText('₺45.230')).not.toBeInTheDocument();
  });
});