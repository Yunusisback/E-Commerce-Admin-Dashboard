import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Orders from './Orders';
import { AppProvider } from '../context/AppContext'; 

// İkonları taklit et
vi.mock('lucide-react', async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    Search: (props) => <div data-testid="search-icon" {...props} />,
    Filter: (props) => <div data-testid="filter-icon" {...props} />,
    Eye: () => <div data-testid="eye-icon" />,
    Download: () => <div data-testid="download-icon" />,
  };
});

// 'mockData'yı (test verisi) taklit et
vi.mock('../data/mockData', () => ({
  allOrders: [
    { id: '#ORD-101', customer: 'Ahmet Yılmaz', product: 'iPhone 16 Pro', status: 'Teslim Edildi', amount: 31000, email: 'a@a.com', date: '...' },
    { id: '#ORD-102', customer: 'Ayşe Demir', product: 'Samsung Galaxy S25', status: 'Kargoda', amount: 28000, email: 'b@b.com', date: '...' },
    { id: '#ORD-103', customer: 'Mehmet Kaya', product: 'AirPods Pro', status: 'Hazırlanıyor', amount: 7500, email: 'c@c.com', date: '...' },
  ],
  orderStats: { pending: 15, processing: 28, shipped: 45, delivered: 156, cancelled: 8 }
}));

// Alt bileşenleri (teste gürültü yapmamaları için) taklit et
vi.mock('../components/orders/OrderStats', () => ({
  default: () => <div data-testid="order-stats-mock">İstatistikler</div>
}));
vi.mock('../components/orders/OrdersTable', () => ({
  // 'OrdersTable'a gelen 'orders' prop'unu (filtrelenmiş veriyi) test et
  default: ({ orders }) => (
    <div data-testid="orders-table-mock">
      {orders.map(order => <div key={order.id}>{order.id}</div>)}
    </div>
  )
}));

// 'Orders' sayfası 'useApp' hook'unu kullandığı için 'AppProvider' ile sarmala
const renderOrders = () => {
  return render(
    <AppProvider>
      <Orders />
    </AppProvider>
  );
};

describe('Orders Sayfası (Entegrasyon Testi)', () => {
  
  const setupUser = () => userEvent.setup();

  it('arama çubuğuna yazıldığında sipariş tablosunu doğru filtrelemeli', async () => {
    const user = setupUser();
    renderOrders(); 

    expect(screen.getByText('#ORD-101')).toBeInTheDocument();
    
    const searchInput = screen.getByPlaceholderText(/Sipariş no, müşteri veya ürün ara.../i);
    await user.type(searchInput, 'iPhone'); 

    // Sadece "iPhone" içeren siparişin kaldığını doğrula
    expect(screen.getByText('#ORD-101')).toBeInTheDocument();
    expect(screen.queryByText('#ORD-102')).not.toBeInTheDocument();
  });

  it('durum filtresi seçildiğinde sipariş tablosunu doğru filtrelemeli', async () => {
    const user = setupUser();
    renderOrders(); 

    expect(screen.getByText('#ORD-101')).toBeInTheDocument();
    
    // Filtreden "Kargoda" seç
    const statusSelect = screen.getByRole('combobox');
    await user.selectOptions(statusSelect, 'Kargoda');

    // Sadece "Kargoda" olan siparişin kaldığını doğrula
    expect(screen.getByText('#ORD-102')).toBeInTheDocument();
    expect(screen.queryByText('#ORD-101')).not.toBeInTheDocument();
  });

  it('durum filtresi "Tümü" seçildiğinde listeyi sıfırlamalı', async () => {
    const user = setupUser();
    renderOrders(); 

    const statusSelect = screen.getByRole('combobox');
    await user.selectOptions(statusSelect, 'Kargoda');
    
    // Listenin filtrelendiğini doğrula
    expect(screen.queryByText('#ORD-101')).not.toBeInTheDocument();

    // Filtreyi "Tümü" olarak sıfırla
    await user.selectOptions(statusSelect, 'Tümü');
    
    // Tüm siparişlerin geri geldiğini doğrula
    expect(screen.getByText('#ORD-101')).toBeInTheDocument();
    expect(screen.getByText('#ORD-102')).toBeInTheDocument();
  });
});