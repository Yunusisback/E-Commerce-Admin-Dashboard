import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import OrderStats from '../components/orders/OrderStats';
import OrderFilters from '../components/orders/OrderFilters';
import OrdersTable from '../components/orders/OrdersTable';
import { allOrders, orderStats } from '../data/mockData'; 



const Orders = () => {
  const { setPageTitle } = useApp();

  useEffect(() => {
    setPageTitle('Siparişler'); 
  }, [setPageTitle]);

  const [filteredOrders, setFilteredOrders] = useState(allOrders);

//  Filtreleme Mantığı
  const handleSearch = (searchTerm) => {
    const filtered = allOrders.filter(order => 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  };
// Sipariş durumu filtreleme işleyicisi
  const handleStatusFilter = (status) => {
    if (status === 'all') {
      setFilteredOrders(allOrders);
    } else {
      const filtered = allOrders.filter(order => order.status === status);
      setFilteredOrders(filtered);
    }
  };

  return (
    <div className="space-y-6">

      <OrderStats stats={orderStats} />
      
      <OrderFilters onSearch={handleSearch} onStatusFilter={handleStatusFilter} />
      
      <OrdersTable orders={filteredOrders} />
    </div>
  );
};

export default Orders;