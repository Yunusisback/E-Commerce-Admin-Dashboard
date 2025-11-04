import { useState } from 'react';
import OrderStats from '../components/orders/OrderStats';
import OrderFilters from '../components/orders/OrderFilters';
import OrdersTable from '../components/orders/OrdersTable';
import { allOrders, orderStats } from '../data/mockData';

const Orders = () => {
  const [filteredOrders, setFilteredOrders] = useState(allOrders);

  const handleSearch = (searchTerm) => {
    const filtered = allOrders.filter(order => 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

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