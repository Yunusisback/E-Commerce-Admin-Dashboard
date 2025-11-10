import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CustomersTable from './CustomersTable';
import StatusEditPopover from './StatusEditPopover';



vi.mock('./StatusEditPopover', () => ({
  default: vi.fn(),
}));
vi.mock('lucide-react', () => ({
  Eye: () => <div data-testid="eye-icon" />,
  EyeOff: () => <div data-testid="eye-off-icon" />,
  Edit: () => <div data-testid="edit-icon" />,
  Trash2: () => <div data-testid="trash-icon" />,
}));

describe('CustomersTable Bileşeni', () => {

  let user;
  const mockOnToggleVisibility = vi.fn();
  const mockOnStatusChange = vi.fn();
  const mockOnOpenDeleteModal = vi.fn();

  const mockCustomers = [
    { id: 'CUST-001', name: 'Ahmet Yılmaz', email: 'ahmet@email.com', phone: '0555 123 4567', totalSpent: 15400, orderCount: 5, status: 'active', avatar: 'avatar1.jpg' },
    { id: 'CUST-002', name: 'Ayşe Demir', email: 'ayse@email.com', phone: '0555 234 5678', totalSpent: 8200, orderCount: 3, status: 'inactive', avatar: 'avatar2.jpg' }
  ];

  beforeEach(() => {
    user = userEvent.setup();
    mockOnToggleVisibility.mockClear();
    mockOnStatusChange.mockClear();
    mockOnOpenDeleteModal.mockClear();
    vi.mocked(StatusEditPopover).mockImplementation(({ customer, onStatusChange }) => (
      <button data-testid="edit-popover" onClick={() => onStatusChange(customer.id, 'mock-status')} />
    ));
  });

  it('müşteri verilerini doğru şekilde render etmeli (gizli değilken)', () => {
    render(
      <CustomersTable 
        customers={mockCustomers} 
        hiddenCustomers={[]} 
        onToggleVisibility={mockOnToggleVisibility}
        onStatusChange={mockOnStatusChange}
        onOpenDeleteModal={mockOnOpenDeleteModal}
      />
    );

    // Ahmet'in verilerini doğrula
    expect(screen.getByText('Ahmet Yılmaz')).toBeInTheDocument();
    expect(screen.getByText('ahmet@email.com')).toBeInTheDocument();
    expect(screen.getByText('0555 123 4567')).toBeInTheDocument();
    expect(screen.getByText('₺15.400')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Aktif')).toBeInTheDocument();
  });

  it('müşteri verilerini gizlemeli (isHidden true ise)', () => {
    render(
      <CustomersTable 
        customers={mockCustomers} 
        hiddenCustomers={['CUST-001']} // Ahmet'i gizle
        onToggleVisibility={mockOnToggleVisibility}
        onStatusChange={mockOnStatusChange}
        onOpenDeleteModal={mockOnOpenDeleteModal}
      />
    );

    // Ahmet'in verilerinin gizlendiğini doğrula
    const hiddenTexts = screen.getAllByText('********');
    expect(hiddenTexts.length).toBeGreaterThan(0); 

    expect(screen.getByText('ID: ****')).toBeInTheDocument();
    expect(screen.getByText('₺****')).toBeInTheDocument();
    expect(screen.getByText('**')).toBeInTheDocument();
    
    expect(screen.getByText('Ayşe Demir')).toBeInTheDocument(); // Ayşe gizli değil
    expect(screen.getByTestId('eye-off-icon')).toBeInTheDocument(); // Gizli ikonu
  });

  it('"Göz" ikonuna tıklandığında onToggleVisibility fonksiyonunu çağırmalı', async () => {
    render(
      <CustomersTable 
        customers={mockCustomers} 
        hiddenCustomers={[]} 
        onToggleVisibility={mockOnToggleVisibility}
        onStatusChange={mockOnStatusChange}
        onOpenDeleteModal={mockOnOpenDeleteModal}
      />
    );

    const eyeButtons = screen.getAllByTestId('eye-icon');
    await user.click(eyeButtons[0]);

    expect(mockOnToggleVisibility).toHaveBeenCalledOnce();
    expect(mockOnToggleVisibility).toHaveBeenCalledWith('CUST-001');
  });

  it('"Sil" ikonuna tıklandığında onOpenDeleteModal fonksiyonunu çağırmalı', async () => {
    render(
      <CustomersTable 
        customers={mockCustomers} 
    Daha     hiddenCustomers={[]} 
        onToggleVisibility={mockOnToggleVisibility}
        onStatusChange={mockOnStatusChange}
        onOpenDeleteModal={mockOnOpenDeleteModal}
      />
    );

    const deleteButtons = screen.getAllByTestId('trash-icon');
    await user.click(deleteButtons[1]); // İkinci (Ayşe) müşteriye tıkla

    expect(mockOnOpenDeleteModal).toHaveBeenCalledOnce();
    expect(mockOnOpenDeleteModal).toHaveBeenCalledWith(mockCustomers[1]);
  });

  it('StatusEditPopover bileşenine doğru prop\'ları (onStatusChange) iletmeli', async () => {
    render(
      <CustomersTable 
        customers={mockCustomers} 
        hiddenCustomers={[]} 
        onToggleVisibility={mockOnToggleVisibility}
        onStatusChange={mockOnStatusChange}
        onOpenDeleteModal={mockOnOpenDeleteModal}
      />
    );

    const editPopovers = screen.getAllByTestId('edit-popover');
    await user.click(editPopovers[0]); // İlkine tıkla

    expect(mockOnStatusChange).toHaveBeenCalledOnce();
    expect(mockOnStatusChange).toHaveBeenCalledWith('CUST-001', 'mock-status');
  });
});