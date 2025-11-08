import { Search, Filter } from 'lucide-react';
import { useState } from 'react';




const OrderFilters = ({ onSearch, onStatusFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  //  State 'obje'den 'string'e geri döndü
  const [selectedStatus, setSelectedStatus] = useState('all'); 

  const statuses = [
    { value: 'all', label: 'Tümü' },
    { value: 'Teslim Edildi', label: 'Teslim Edildi' },
    { value: 'Kargoda', label: 'Kargoda' },
    { value: 'Hazırlanıyor', label: 'Hazırlanıyor' },
    { value: 'İptal', label: 'İptal' }
  ];

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (onSearch) onSearch(value);
  };

  // 'e.target.value' (string) alıyor
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);
    if (onStatusFilter) onStatusFilter(newStatus);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">

      {/* Arama Çubuğu */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Sipariş no, müşteri veya ürün ara..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-500"
        />
      </div>
      
      {/* Durum Filtresi (Basit <select>) */}
      
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-gray-400" />
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className="px-4 py-2 bg-white dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-500"
        >
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