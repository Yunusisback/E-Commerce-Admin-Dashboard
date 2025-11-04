import { useState } from 'react';
import OrderStats from '../components/orders/OrderStats';
import OrderFilters from '../components/orders/OrderFilters';
import OrdersTable from '../components/orders/OrdersTable';
import { allOrders, orderStats } from '../data/mockData'; 

/**
 * "Siparişler" sayfasının ana konteyner  bileşenidir.
 * Bu bileşen, filtreleme mantığını ve statei (durumu) kendisi yönetir
 * 'Lifting State Up' (Statei Yukarı Taşıma) desenini uygular
 * 1. State'i ('filteredOrders') burada tutar
 * 2. Filtreleme mantığını ('handleSearch') burada tanımlar
 * 3. Mantığı OrderFilters bileşenine prop olarak (onSearch) gönderir
 * 4. Statei OrdersTable bileşenine prop olarak (orders) gönderir
 */
const Orders = () => {

  // OrdersTable bileşeninde GÖSTERİLECEK olan filtrelenmiş sipariş listesini tutan state
  // Başlangıçta tüm siparişleri ('allOrders') gösterir
  const [filteredOrders, setFilteredOrders] = useState(allOrders);

 
  /**
   * OrderFilters alt bileşeninden (prop aracılığıyla) tetiklenir.
   * Arama terimine göre ANA 'allOrders' listesini (her zaman orijinal listeyi) filtreler
   * ve 'filteredOrders stateini günceller
   */
  
  const handleSearch = (searchTerm) => {
    const filtered = allOrders.filter(order => 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Statei güncelle (bu OrdersTableın yeniden render olmasını tetikler)
    setFilteredOrders(filtered);
  };

  /**
   * 'OrderFilters alt bileşeninden (prop aracılığıyla) tetiklenir
   * Seçilen status (durum) değerine göre ANA allOrders listesini filtreler
   */

  const handleStatusFilter = (status) => {
    if (status === 'all') {
      // Tümü seçilirse filtreyi temizle ve tüm listeyi göster
      setFilteredOrders(allOrders);
    } else {
      // Belirli bir duruma göre filtrele
      const filtered = allOrders.filter(order => order.status === status);
      setFilteredOrders(filtered);
    }
  };


  return (
    <div className="space-y-6">

      {/* 1. Sayfa Başlığı */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Siparişler</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Tüm siparişleri yönetin</p>
      </div>
      <OrderStats stats={orderStats} />
      <OrderFilters onSearch={handleSearch} onStatusFilter={handleStatusFilter} />
      <OrdersTable orders={filteredOrders} />
    </div>
  );
};

export default Orders;