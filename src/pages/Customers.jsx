import { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import CustomerStats from '../components/customers/CustomerStats';
import CustomersTable from '../components/customers/CustomersTable';
import { allCustomers as initialCustomers, customerStats } from '../data/mockData';
import ConfirmationModal from '../components/common/ConfirmationModal';
import FilterBar from '../components/common/FilterBar'; 

const Customers = () => {
  const { setPageTitle } = useApp();
  useEffect(() => {
    setPageTitle('Müşteriler'); 
  }, [setPageTitle]);

  // Filtre seçenekleri
  const customerStatuses = [
    { value: 'all', label: 'Tüm Durumlar' },
    { value: 'active', label: 'Aktif' },
    { value: 'inactive', label: 'Pasif' },
    { value: 'banned', label: 'Yasaklı' },
  ];

 
  const [allCustomersList, setAllCustomersList] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); 
  
  // Modal stateleri
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [hiddenCustomers, setHiddenCustomers] = useState([]); 

  
  const filteredCustomers = useMemo(() => {
    let filtered = allCustomersList;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(customer => customer.status === statusFilter);
    }

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(lowerSearch) ||
        customer.email.toLowerCase().includes(lowerSearch) ||
        (customer.phone && customer.phone.includes(lowerSearch))
      );
    }
    return filtered;
  }, [allCustomersList, searchTerm, statusFilter]);
  


  const handleToggleVisibility = (customerId) => {
    setHiddenCustomers(prevHidden => 
      prevHidden.includes(customerId)
        ? prevHidden.filter(id => id !== customerId) // Gizliyse kaldır
        : [...prevHidden, customerId] // Görünürse ekle
    );
  };


  const handleChangeStatus = (customerId, newStatus) => {
    setAllCustomersList(prevList => 
      prevList.map(customer => 
        customer.id === customerId ? { ...customer, status: newStatus } : customer
      )
    );
    console.log(`Müşteri ${customerId} durumu ${newStatus} olarak güncellendi`);
  };

  const handleOpenDeleteModal = (customer) => {
    setCustomerToDelete(customer);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!customerToDelete) return;
    setAllCustomersList(prevList => 
      prevList.filter(c => c.id !== customerToDelete.id)
    );
    setIsDeleteModalOpen(false);
    setCustomerToDelete(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Toplam {filteredCustomers.length} müşteri
        </p>
      </div>

      <CustomerStats stats={customerStats} />

      {/* Filtreler Alanı  */}
      <FilterBar
        searchPlaceholder="Müşteri adı, email veya telefon ara..."
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterValue={statusFilter}
        onFilterChange={setStatusFilter}
        filterOptions={customerStatuses}
      />
      
      {/* Müşteri Tablosu  */}
      <CustomersTable 
        customers={filteredCustomers} 
        hiddenCustomers={hiddenCustomers}
        onToggleVisibility={handleToggleVisibility}
        onStatusChange={handleChangeStatus}
        onOpenDeleteModal={handleOpenDeleteModal}
      />
      
      {/* Silme Modalı */}
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