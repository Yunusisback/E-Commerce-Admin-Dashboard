import { useState } from 'react';
import { Search, Filter, UserPlus } from 'lucide-react';
import CustomerStats from '../components/customers/CustomerStats';
import CustomersTable from '../components/customers/CustomersTable';
import { allCustomers, customerStats } from '../data/mockData';




const Customers = () => {
  const [filteredCustomers, setFilteredCustomers] = useState(allCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  //  State 'obje'den 'string'e geri döndü
  const [statusFilter, setStatusFilter] = useState('all'); 

  const customerStatuses = [
    { value: 'all', label: 'Tüm Durumlar' },
    { value: 'active', label: 'Aktif' },
    { value: 'inactive', label: 'Pasif' },
    { value: 'banned', label: 'Yasaklı' },
  ];

  const handleFilter = (search, status) => {
    let filtered = allCustomers;
    if (status !== 'all') {
      filtered = filtered.filter(customer => customer.status === status);
    }
    if (search) {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(lowerSearch) ||
        customer.email.toLowerCase().includes(lowerSearch) ||
        customer.phone.includes(lowerSearch)
      );
    }
    setFilteredCustomers(filtered);
  };

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    handleFilter(newSearchTerm, statusFilter);
  };
  
  //  'e.target.value' (string) alıyor
  const handleStatusChange = (e) => {
    const newStatusFilter = e.target.value;
    setStatusFilter(newStatusFilter);
    handleFilter(searchTerm, newStatusFilter);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Müşteriler</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Toplam {filteredCustomers.length} müşteri
        </p>
      </div>

      <CustomerStats stats={customerStats} />

      {/* Filtreler ( Eski basit yapı, YENİ renkler) */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Arama Çubuğu */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Müşteri adı, email veya telefon ara..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-500"
          />
        </div>
        
        {/* Durum Filtresi (Basit <select>) */}
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={handleStatusChange}
            className="px-4 py-2 bg-white dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-500"
          >
            {customerStatuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {/* Yeni Müşteri Düğmesi (Basit <button>) */}
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-amber-600 dark:hover:bg-amber-700 text-white rounded-lg transition-colors">
          <UserPlus className="w-5 h-5" />
          <span className="font-medium">Yeni Müşteri</span>
        </button>
      </div>
      
      <CustomersTable customers={filteredCustomers} />
    </div>
  );
};

export default Customers;