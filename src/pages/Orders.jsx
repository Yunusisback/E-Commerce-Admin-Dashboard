import { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import OrderStats from '../components/orders/OrderStats';
import FilterBar from '../components/common/FilterBar'; 
import OrdersTable from '../components/orders/OrdersTable';
import { allOrders as initialAllOrders, orderStats } from '../data/mockData'; 

const Orders = () => {
  const { setPageTitle } = useApp();
  useEffect(() => {
    setPageTitle('Siparişler'); 
  }, [setPageTitle]);

  // Filtre seçenekleri
  const orderStatuses = [
    { value: 'all', label: 'Tümü' },
    { value: 'Teslim Edildi', label: 'Teslim Edildi' },
    { value: 'Kargoda', label: 'Kargoda' },
    { value: 'Hazırlanıyor', label: 'Hazırlanıyor' },
    { value: 'İptal', label: 'İptal' }
  ];


  const [allOrders, setAllOrders] = useState(initialAllOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');


  const filteredOrders = useMemo(() => {
    let orders = allOrders;

    if (statusFilter !== 'all') {
      orders = orders.filter(order => order.status === statusFilter);
    }

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      orders = orders.filter(order => 
        order.id.toLowerCase().includes(lowerSearch) ||
        order.customer.toLowerCase().includes(lowerSearch) ||
        order.product.toLowerCase().includes(lowerSearch)
      );
    }
    
    return orders;
  }, [allOrders, searchTerm, statusFilter]);
  


  return (
    <div className="space-y-6">

      <OrderStats stats={orderStats} />
      
      {/* Filtreler Alanı  */}
      <FilterBar
        searchPlaceholder="Sipariş no, müşteri veya ürün ara..."
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterValue={statusFilter}
        onFilterChange={setStatusFilter}
        filterOptions={orderStatuses}
      />
      
      <OrdersTable orders={filteredOrders} />
    </div>
  );
};

export default Orders;