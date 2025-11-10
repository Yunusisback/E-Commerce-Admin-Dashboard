import { render, screen, within } from '@testing-library/react'; 
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import StatusEditPopover from './StatusEditPopover';




vi.mock('lucide-react', () => ({
  Edit: (props) => <div data-testid="edit-icon" {...props} />,
  Check: (props) => <div data-testid="check-icon" {...props} />,
}));

describe('StatusEditPopover Bileşeni', () => {

  let user;
  const mockOnStatusChange = vi.fn();
  const mockCustomer = { id: 'CUST-001', status: 'active' };

  beforeEach(() => {
    user = userEvent.setup();
    mockOnStatusChange.mockClear();
  });

  it('ikonuna tıklandığında durum seçeneklerini göstermeli', async () => {
    render(<StatusEditPopover customer={mockCustomer} onStatusChange={mockOnStatusChange} />);

    // Başlangıçta durum seçenekleri görünmemeli
    expect(screen.queryByRole('button', { name: /Aktif/i })).not.toBeInTheDocument();

    // 'Düzenle' ikonuna tıkla
    const editButton = screen.getByTestId('edit-icon');
    await user.click(editButton);

    expect(screen.getByRole('button', { name: /Aktif/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Pasif/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Yasaklı/i })).toBeInTheDocument();
  });

  it('mevcut durumu (aktif) bir tik ikonu ile göstermeli', async () => {
    render(<StatusEditPopover customer={mockCustomer} onStatusChange={mockOnStatusChange} />);

    // 'Düzenle' ikonuna tıkla
    await user.click(screen.getByTestId('edit-icon'));

    // 'Aktif' butonunun içinde tik ikonu olmalı
     const activeButton = screen.getByRole('button', { name: /Aktif/i });

    // 'within' artık tanımlı
    const checkIcon = within(activeButton).getByTestId('check-icon');
    expect(checkIcon).toBeInTheDocument();

    const inactiveButton = screen.getByRole('button', { name: /Pasif/i });
    expect(within(inactiveButton).queryByTestId('check-icon')).not.toBeInTheDocument();
  });

  it('yeni bir durum seçildiğinde onStatusChange prop\'unu doğru ID ve value ile çağırmalı', async () => {
    render(<StatusEditPopover customer={mockCustomer} onStatusChange={mockOnStatusChange} />);

    await user.click(screen.getByTestId('edit-icon'));

    const bannedButton = screen.getByRole('button', { name: /Yasaklı/i });
    await user.click(bannedButton);

    expect(mockOnStatusChange).toHaveBeenCalledOnce();
    expect(mockOnStatusChange).toHaveBeenCalledWith('CUST-001', 'banned');
  });
});