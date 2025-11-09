import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Customers from './Customers'; 
import { AppProvider } from '../context/AppContext'; 


vi.mock('../data/mockData', () => ({
  allCustomers: [
    { id: 'CUST-001', name: 'Ahmet Yılmaz', email: 'ahmet@email.com', phone: '0555 123 4567', status: 'active' },
    { id: 'CUST-002', name: 'Ayşe Demir', email: 'ayse@email.com', phone: '0555 234 5678', status: 'active' },
    { id: 'CUST-004', name: 'Fatma Şahin', email: 'fatma@email.com', phone: '0555 456 7890', status: 'inactive' },
  ],
  customerStats: { total: 3, newThisMonth: 1, active: 2, inactive: 1 }
}));

// İkonları taklit et
vi.mock('lucide-react', () => ({
  Search: () => <div data-testid="search-icon" />,
  Filter: () => <div data-testid="filter-icon" />,
  UserPlus: () => <div data-testid="userplus-icon" />,
  Check: () => <div data-testid="check-icon" />,
  ChevronsUpDown: () => <div data-testid="chevrons-icon" />,
  Users: () => <div />,
  UserCheck: () => <div />,
  UserX: () => <div />,
  Eye: () => <div />,
  Edit: () => <div />,
  Trash2: () => <div />,
}));

// Alt bileşenleri taklit et (testi hızlandırır)
vi.mock('../components/customers/CustomerStats', () => ({
  default: () => <div data-testid="customer-stats-mock">İstatistikler</div>
}));
vi.mock('../components/customers/CustomersTable', () => ({
  // 'CustomersTable'a gelen 'customers' prop'unu (filtrelenmiş veriyi) test et
  default: ({ customers }) => (
    <div data-testid="customers-table-mock">
      {customers.map(customer => <div key={customer.id}>{customer.name}</div>)}
    </div>
  )
}));

// '@headlessui/react' (Listbox) bileşenini basit bir <select> olarak taklit et
vi.mock('@headlessui/react', () => ({
  Listbox: ({ children, value, onChange }) => (
    <div>
      <select onChange={(e) => onChange(customerStatuses.find(s => s.value === e.target.value))} value={value.value}>
        {customerStatuses.map((status) => (
          <option key={status.value} value={status.value}>{status.label}</option>
        ))}
      </select>
      {children}
    </div>
  ),
  Transition: ({ children }) => <div>{children}</div>,
  "Listbox.Button": ({ children }) => <button>{children}</button>,
  "Listbox.Options": ({ children }) => <div>{children}</div>,
  "Listbox.Option": ({ children, value }) => <option value={value.value}>{children}</option>,
}));
const customerStatuses = [
  { value: 'all', label: 'Tüm Durumlar' }, { value: 'active', label: 'Aktif' },
  { value: 'inactive', label: 'Pasif' }, { value: 'banned', label: 'Yasaklı' },
];

// 'Customers' sayfası 'useApp' hook'unu kullandığı için 'AppProvider' ile sarmala
const renderCustomers = () => {
  return render(
    <AppProvider>
      <Customers />
    </AppProvider>
  );
};

describe('Customers Sayfası (Entegrasyon Testi)', () => {
  
  let user;
  beforeEach(() => {
    user = userEvent.setup();
  });

  it('arama çubuğuna yazıldığında müşteri tablosunu doğru filtrelemeli', async () => {
    renderCustomers(); 

    // Başlangıçta tüm müşterilerin göründüğünü doğrula
    expect(screen.getByText('Ahmet Yılmaz')).toBeInTheDocument();
    
    // Arama çubuğuna "Ahmet" yaz
    const searchInput = screen.getByPlaceholderText(/Müşteri adı, email veya telefon ara.../i);
    await user.type(searchInput, 'Ahmet');

    // Sadece "Ahmet"in kaldığını, diğerlerinin kaybolduğunu doğrula
    expect(screen.getByText('Ahmet Yılmaz')).toBeInTheDocument();
    expect(screen.queryByText('Ayşe Demir')).not.toBeInTheDocument();
  });

  it('durum filtresi seçildiğinde müşteri tablosunu doğru filtrelemeli', async () => {
    renderCustomers(); 

    expect(screen.getByText('Ahmet Yılmaz')).toBeInTheDocument();
    expect(screen.getByText('Fatma Şahin')).toBeInTheDocument();
    
    // Filtreden "Pasif" (inactive) seç
    const statusSelect = screen.getByRole('combobox');
    await user.selectOptions(statusSelect, 'inactive');

    // Sadece "Fatma"nın (pasif) kaldığını doğrula
    expect(screen.getByText('Fatma Şahin')).toBeInTheDocument();
    expect(screen.queryByText('Ahmet Yılmaz')).not.toBeInTheDocument();
  });
});