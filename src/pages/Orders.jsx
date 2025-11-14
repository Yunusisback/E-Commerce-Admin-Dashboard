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
    { value: 'all', label: 'Tüm Durumlar' },
    { value: 'Teslim Edildi', label: 'Teslim Edildi' },
    { value: 'Kargoda', label: 'Kargoda' },
    { value: 'Hazırlanıyor', label: 'Hazırlanıyor' },
    { value: 'İptal', label: 'İptal' },
    { value: 'İade', label: 'İade' } 
  ];

  // State Yönetimi 
  const [allOrders, setAllOrders] = useState(initialAllOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Blur State  
   const [hiddenOrders, setHiddenOrders] = useState([]);

  // Türetilmiş State 
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


  const handleViewOrder = (order) => {
    console.log('Sipariş Detayı Görüntüleniyor:', order);
    alert(`Sipariş Detayı:\n\nID: ${order.id}\nMüşteri: ${order.customer}\nÜrün: ${order.product}\nTutar: ${order.amount} ₺`);
  };

  const handleDownloadInvoice = (order) => {
    console.log('Fatura İndiriliyor:', order.id);

    const invoiceText = `
      FATURA DETAYI
      -------------------
      Sipariş ID: ${order.id}
      Müşteri: ${order.customer}
      Email: ${order.email}
      Ürün: ${order.product}
      Tutar: ${order.amount} ₺
      Tarih: ${order.date}
      Durum: ${order.status}
    `;

    const element = document.createElement("a");
    const file = new Blob([invoiceText.trim()], {type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = `Fatura-${order.id}.txt`;
    
    document.body.appendChild(element); 
    element.click();
    document.body.removeChild(element);
  };

  //  Gizlilik blur Fonksiyonu 
  const handleToggleVisibility = (orderId) => {
    setHiddenOrders(prevHidden => 
      prevHidden.includes(orderId)
        ? prevHidden.filter(id => id !== orderId) // Gizliyse listeden çıkar
        : [...prevHidden, orderId] // Gizli değilse listeye ekle
    );
  };

  return (
    <div className="space-y-6">

      <OrderStats stats={orderStats} />
      
      <FilterBar
        searchPlaceholder="Sipariş no, müşteri veya ürün ara..."
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterValue={statusFilter}
        onFilterChange={setStatusFilter}
        filterOptions={orderStatuses} // Güncellenmiş diziyi kullanır
      />
      
      <OrdersTable 
        orders={filteredOrders} 
        onViewOrder={handleViewOrder}
        onDownloadInvoice={handleDownloadInvoice}
        hiddenOrders={hiddenOrders}
        onToggleVisibility={handleToggleVisibility}
      />
    </div>
  );
};

export default Orders;