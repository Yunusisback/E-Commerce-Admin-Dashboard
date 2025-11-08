import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { allOrders, orderStats } from '../data/mockData'; 
import Orders from './Orders';


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


vi.mock('../data/mockData', () => ({
  allOrders: [
    { id: '#ORD-101', customer: 'Ahmet Yılmaz', product: 'iPhone 16 Pro', status: 'Teslim Edildi', amount: 31000, email: 'a@a.com', date: '...' },
    { id: '#ORD-102', customer: 'Ayşe Demir', product: 'Samsung Galaxy S25', status: 'Kargoda', amount: 28000, email: 'b@b.com', date: '...' },
    { id: '#ORD-103', customer: 'Mehmet Kaya', product: 'AirPods Pro', status: 'Hazırlanıyor', amount: 7500, email: 'c@c.com', date: '...' },
  ],
  orderStats: { pending: 15, processing: 28, shipped: 45, delivered: 156, cancelled: 8 }
}));

// 3. 'OrderStats' bileşenini mockluyoruz
vi.mock('../components/orders/OrderStats', () => ({
  default: () => <div data-testid="order-stats-mock">İstatistikler</div>
}));

// 4. 'OrdersTable' bileşenini mockluyoruz
vi.mock('../components/orders/OrdersTable', () => ({
  default: ({ orders }) => (
    <div data-testid="orders-table-mock">
      {orders.map(order => (
        <div key={order.id}>{order.id}</div> 
      ))}
    </div>
  )
}));


describe('Orders Sayfası (Entegrasyon Testi)', () => {
  
  const setupUser = () => userEvent.setup();

  // 1. Gerekli Kısım Arama Filtresi Entegrasyonu
  it('arama çubuğuna yazıldığında sipariş tablosunu doğru filtrelemeli', async () => {
    const user = setupUser();
    render(<Orders />);

    // Başlangıç Kontrolü
    expect(screen.getByText('#ORD-101')).toBeInTheDocument();
    expect(screen.getByText('#ORD-102')).toBeInTheDocument();
    expect(screen.getByText('#ORD-103')).toBeInTheDocument();
    
    // Arama çubuğunu bul ve "iPhone" yaz
    const searchInput = screen.getByPlaceholderText(/Sipariş no, müşteri veya ürün ara.../i);
    await user.type(searchInput, 'iPhone'); 

    // Filtreleme Sonrası Kontrol:
    expect(screen.getByText('#ORD-101')).toBeInTheDocument();
    expect(screen.queryByText('#ORD-102')).not.toBeInTheDocument();
    expect(screen.queryByText('#ORD-103')).not.toBeInTheDocument();
  });

  // 2. Gerekli Kısım: Durum Filtresi Entegrasyonu
  it('durum filtresi seçildiğinde sipariş tablosunu doğru filtrelemeli', async () => {
    const user = setupUser();
    render(<Orders />);

    // Başlangıç Kontrolü
    expect(screen.getByText('#ORD-101')).toBeInTheDocument();
    expect(screen.getByText('#ORD-102')).toBeInTheDocument();
    
    // Durum 'select' menüsünü bul ve "Kargoda"yı seç
    const statusSelect = screen.getByRole('combobox');
    await user.selectOptions(statusSelect, 'Kargoda');

    // Filtreleme Sonrası Kontrol:
    expect(screen.getByText('#ORD-102')).toBeInTheDocument();
    expect(screen.queryByText('#ORD-101')).not.toBeInTheDocument();
    expect(screen.queryByText('#ORD-103')).not.toBeInTheDocument();
  });

  // 3. Gerekli Kısım Filtreyi Sıfırlama
  it('durum filtresi "Tümü" seçildiğinde listeyi sıfırlamalı', async () => {
    const user = setupUser();
    render(<Orders />);

    // Önce Kargoda seç
    const statusSelect = screen.getByRole('combobox');
    await user.selectOptions(statusSelect, 'Kargoda');
    
    // Sadece 1 siparişin kaldığını doğrula
    expect(screen.queryByText('#ORD-101')).not.toBeInTheDocument();

    // Şimdi "Tümü" seçeneğini seçerek filtreyi sıfırla
    await user.selectOptions(statusSelect, 'Tümü');
    
    // Sıfırlama Sonrası Kontrol 3 sipariş de geri gelmeli
    expect(screen.getByText('#ORD-101')).toBeInTheDocument();
    expect(screen.getByText('#ORD-102')).toBeInTheDocument();
    expect(screen.getByText('#ORD-103')).toBeInTheDocument();
  });
});