import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest'; 
import DateFilter from './DateFilter';

describe('DateFilter Bileşeni', () => {

  it('tüm filtre düğmelerini doğru şekilde render etmeli', () => {
    render(<DateFilter />);
    
    expect(screen.getByRole('button', { name: /Bugün/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /7 Gün/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /30 Gün/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Yıllık/i })).toBeInTheDocument();
  });

  it('bir düğmeye tıklandığında onFilterChange prop\'unu doğru değerle çağırmalı', async () => {
    const user = userEvent.setup();
    
    // 'onFilterChange' prop'unun çağrılıp çağrılmadığını izlemek için sahte fonksiyon
    const mockOnFilterChange = vi.fn();

    render(<DateFilter onFilterChange={mockOnFilterChange} />);

    const button7Days = screen.getByRole('button', { name: /7 Gün/i });
    await user.click(button7Days);

    // Tıklamanın, '7d' değeriyle üst bileşeni (ebeveyni) bilgilendirmesi gerekir
    expect(mockOnFilterChange).toHaveBeenCalledOnce();
    expect(mockOnFilterChange).toHaveBeenCalledWith('7d');
  });

  it('varsayılan olarak "30 Gün" düğmesini aktif olarak göstermeli', () => {
    render(<DateFilter />);

    // '30 Gün' (varsayılan) düğmenin aktif stil sınıfına sahip olduğunu doğrula
    const button30Days = screen.getByRole('button', { name: /30 Gün/i });
    expect(button30Days.className).toContain('bg-blue-600');

    // Diğer düğmelerin aktif stil sınıfına sahip OLMADIĞINI doğrula
    const button7Days = screen.getByRole('button', { name: /7 Gün/i });
    expect(button7Days.className).not.toContain('bg-blue-600');
  });
  
});