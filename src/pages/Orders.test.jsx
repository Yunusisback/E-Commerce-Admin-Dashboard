
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { allOrders, orderStats } from '../data/mockData'; 
import Orders from './Orders';



// 1. 'lucide-react' mock'u (OrderFilters bu ikonları kullanır)
vi.mock('lucide-react', async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    Search: (props) => <div data-testid="search-icon" {...props} />,
    Filter: (props) => <div data-testid="filter-icon" {...props} />,
  };
});

// 2. 'mockData' import'unu mockluyoruz (taklit ediyoruz)
vi.mock('../data/mockData', () => ({
  // 'Orders' sayfasının ihtiyaç duyduğu 'allOrders' verisi
  allOrders: [
    { id: '#ORD-101', customer: 'Ahmet Yılmaz', product: 'iPhone 15 Pro', status: 'Teslim Edildi', amount: 31000, email: 'a@a.com', date: '...' },
    { id: '#ORD-102', customer: 'Ayşe Demir', product: 'Samsung Galaxy S24', status: 'Kargoda', amount: 28000, email: 'b@b.com', date: '...' },
    { id: '#ORD-103', customer: 'Mehmet Kaya', product: 'AirPods Pro', status: 'İptal', amount: 7500, email: 'c@c.com', date: '...' },
  ],
  // 'Orders' sayfasının ihtiyaç duyduğu 'orderStats' verisi
  orderStats: { pending: 1, processing: 1, shipped: 1, delivered: 1, cancelled: 1 }
}));

// 3. 'OrderStats' bileşenini mock'luyoruz (bu testin odak noktası değil)
vi.mock('../components/orders/OrderStats', () => ({
  default: () => <div data-testid="order-stats-mock">İstatistikler</div>
}));

// 4. 'OrdersTable' bileşenini mock'luyoruz (ÖNEMLİ)
// Bu mock, aldığı 'orders' prop'undaki her siparişin ID'sini basar.
// Böylece filtrelemenin tabloya doğru veriyi gönderip göndermediğini anlayabiliriz.
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

  // 1. Gerekli Kısım: Arama Filtresi Entegrasyonu
  it('arama çubuğuna yazıldığında sipariş tablosunu doğru filtrelemeli', async () => {
    const user = setupUser();
    render(<Orders />);

    // Başlangıç Kontrolü: 3 sipariş de (mock tablomuzda) ekranda
    expect(screen.getByText('#ORD-101')).toBeInTheDocument();
    expect(screen.getByText('#ORD-102')).toBeInTheDocument();
    expect(screen.getByText('#ORD-103')).toBeInTheDocument();
    
    // Arama çubuğunu bul ve "iPhone" yazst searchInput = screen.getByPlaceholderText(/Sipariş no, müşteri veya ürün ara..
    const searchInput = screen.getByPlaceholderText(/Sipariş no, müşteri veya ürün ara.../i);
    await user.type(searchInput, 'iPhone');

    // Filtreleme Sonrası Kontrol:
    // 1. "iPhone" (#101) ekranda kalmalı
    expect(screen.getByText('#ORD-101')).toBeInTheDocument();
    // 2. Diğer siparişler ekrandan kaybolmalı
    expect(screen.queryByText('#ORD-102')).not.toBeInTheDocument();
    expect(screen.queryByText('#ORD-103')).not.toBeInTheDocument();
  });

  // 2. Gerekli Kısım: Durum Filtresi Entegrasyonu
  it('durum filtresi seçildiğinde sipariş tablosunu doğru filtrelemeli', async () => {
    const user = setupUser();
    render(<Orders />);

    // Başlangıç Kontrolü: 3 sipariş de ekranda
    expect(screen.getByText('#ORD-101')).toBeInTheDocument();
    expect(screen.getByText('#ORD-102')).toBeInTheDocument();
    expect(screen.getByText('#ORD-103')).toBeInTheDocument();
    
    // Durum 'select' menüsünü bul ve "Kargoda"yı seç
    const statusSelect = screen.getByRole('combobox');
    await user.selectOptions(statusSelect, 'Kargoda');

    // Filtreleme Sonrası Kontrol:
    // 1. Sadece "Kargoda" olan (#102) ekranda kalmalı
    expect(screen.getByText('#ORD-102')).toBeInTheDocument();
    // 2. Diğerleri kaybolmalı
    expect(screen.queryByText('#ORD-101')).not.toBeInTheDocument();
    expect(screen.queryByText('#ORD-103')).not.toBeInTheDocument();
  });

  // 3. Gerekli Kısım: Filtreyi Sıfırlama
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
    
    // Sıfırlama Sonrası Kontrol: 3 sipariş de geri gelmeli
    expect(screen.getByText('#ORD-101')).toBeInTheDocument();
    expect(screen.getByText('#ORD-102')).toBeInTheDocument();
    expect(screen.getByText('#ORD-103')).toBeInTheDocument();
  });
});