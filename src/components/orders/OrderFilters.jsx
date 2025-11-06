import { Search, Filter } from 'lucide-react';
import { useState } from 'react';

/**
 * Orders sayfasında arama çubuğu ve durum (<select>) filtresini gösteren bileşen.
 * ÖNEMLİ: Bu bileşen kendi içinde state tutar ('searchTerm', 'sselectedStatus')
 * ancak asıl filtreleme mantığı için 'onSearch' ve 'onStatusFilter' propları aracılığıyla
 * üst bileşeni (Orderrs.jsx) bilgilendirir (Lifting State Up Deseni)
 *
 * @param {function} onSearch - Arama çubuğu (input) her değiştiğinde üst bileşeni bilgilendirir
 * @param {function} onStatusFilter - Durum filtresi (select) her değiştiğinde üst bileşeni bilgilendirir
 */
const OrderFilters = ({ onSearch, onStatusFilter }) => {


  // Arama çubuğunun o anki değerini tutar
  const [searchTerm, setSearchTerm] = useState('');

  // Durum filtresinin o anki seçili değerini tutar
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Filtre <select> menüsü için seçenekler
  const statuses = [
    { value: 'all', label: 'Tümü' },
    { value: 'Teslim Edildi', label: 'Teslim Edildi' },
    { value: 'Kargoda', label: 'Kargoda' },
    { value: 'Hazırlanıyor', label: 'Hazırlanıyor' },
    { value: 'İptal', label: 'İptal' }
  ];


  /**
   * Arama çubuğuna her harf girildiğinde tetiklenir.
   */
  const handleSearch = (value) => {

    // 1. Kendi dahili state'ini (görsel arayüz için) günceller
    setSearchTerm(value);
    // 2. Üst bileşene (Orders.jsx) haber verir ki asıl filtreleme orada yapılsın
    if (onSearch) onSearch(value);
  };

  /**
   * Durum <select> menüsü değiştiğinde tetiklenir
   */
  const handleStatusChange = (value) => {
    // 1. Kendi dahili state'ini (görsel arayüz için) günceller
    setSelectedStatus(value);
    // 2. Üst bileşene (Orders.jsx) haber verir ki asıl filtreleme orada yapılsın
    if (onStatusFilter) onStatusFilter(value);
  };


  return (
    <div className="flex flex-col md:flex-row gap-4">

      {/* 1. Arama Çubuğu */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Sipariş no, müşteri veya ürün ara..."
          value={searchTerm} 
          onChange={(e) => handleSearch(e.target.value)} 
          className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* 2. Durum Filtresi (<select>) */}

      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-gray-400" />
        <select
          value={selectedStatus} 
          onChange={(e) => handleStatusChange(e.target.value)} 
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {/* 'statuses' dizisinden <option> elemanları oluşturulur */}
          {statuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default OrderFilters;