import { useState, useEffect } from 'react';
import { Search, Filter, UserPlus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CustomerStats from '../components/customers/CustomerStats';
import CustomersTable from '../components/customers/CustomersTable';
import { allCustomers as initialCustomers, customerStats } from '../data/mockData';
import ConfirmationModal from '../components/common/ConfirmationModal';



const Customers = () => {
  const { setPageTitle } = useApp();
  useEffect(() => {
    setPageTitle('Müşteriler'); 
  }, [setPageTitle]);

  // "allCustomersList" ana listeyi tutar (silme/ekleme için)
  const [allCustomersList, setAllCustomersList] = useState(initialCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState(initialCustomers);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); 


  // "Silme" ve "Gizleme" için state'ler eklendi
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [hiddenCustomers, setHiddenCustomers] = useState([]); 

  const customerStatuses = [
    { value: 'all', label: 'Tüm Durumlar' },
    { value: 'active', label: 'Aktif' },
    { value: 'inactive', label: 'Pasif' },
    { value: 'banned', label: 'Yasaklı' },
  ];

  // Filtreleme fonksiyonu
  const handleFilter = (search, status) => {
    let filtered = allCustomersList; 
    if (status !== 'all') {
      filtered = filtered.filter(customer => customer.status === status);
    }
    if (search) {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(lowerSearch) ||
        customer.email.toLowerCase().includes(lowerSearch) ||
        (customer.phone && customer.phone.includes(lowerSearch))
      );
    }
    setFilteredCustomers(filtered);
  };

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    handleFilter(newSearchTerm, statusFilter);
  };
  
  const handleStatusChange = (e) => {
    const newStatusFilter = e.target.value;
    setStatusFilter(newStatusFilter);
    handleFilter(searchTerm, newStatusFilter);
  };


  // "Göz" ikonuna tıklandığında çalışır
  const handleToggleVisibility = (customerId) => {
    setHiddenCustomers(prevHidden => 
      prevHidden.includes(customerId)
        ? prevHidden.filter(id => id !== customerId) // Gizliyse kaldır
        : [...prevHidden, customerId] // Görünürse ekle
    );
  };

  // "Düzenle" popover'ından seçim yapıldığında çalışır
  const handleChangeStatus = (customerId, newStatus) => {
    const updatedList = allCustomersList.map(customer => 
      customer.id === customerId ? { ...customer, status: newStatus } : customer
    );
    setAllCustomersList(updatedList);

    // Filtrelenmiş listeyi de güncelle (önemli)
    handleFilter(searchTerm, statusFilter);
    console.log(`Müşteri ${customerId} durumu ${newStatus} olarak güncellendi`);
  };

  // "Sil" ikonuna tıklandığında modalı açar
  const handleOpenDeleteModal = (customer) => {
    setCustomerToDelete(customer);
    setIsDeleteModalOpen(true);
  };

  // Modal'daki "Sil"e basıldığında çalışır
  const handleConfirmDelete = () => {
    if (!customerToDelete) return;
    const updatedList = allCustomersList.filter(c => c.id !== customerToDelete.id);
    setAllCustomersList(updatedList);
    setFilteredCustomers(updatedList); 
    setIsDeleteModalOpen(false);
    setCustomerToDelete(null);
    console.log("Müşteri silindi:", customerToDelete.id);
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

      {/* Filtreler Alanı */}
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
          <div className="relative"> 
            <select
              value={statusFilter}
              onChange={handleStatusChange}
              className="appearance-none pr-8 px-4 py-2 bg-white dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-500"
            >
              {customerStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* 'CustomersTable'a "İşlem" prop'ları eklendi */}
      <CustomersTable 
        customers={filteredCustomers} 
        hiddenCustomers={hiddenCustomers}
        onToggleVisibility={handleToggleVisibility}
        onStatusChange={handleChangeStatus}
        onOpenDeleteModal={handleOpenDeleteModal}
      />

      
      {/* 'Silme' Modalı */}
      {customerToDelete && (
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Müşteriyi Sil"
          message={`'${customerToDelete.name}' adlı müşteriyi kalıcı olarak silmek istediğinizden emin misiniz?`}
          confirmText="Sil"
        />
      )}
    </div>
  );
};

export default Customers;