import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'; 
import KPICard from './KPICard';

// 'lucide-react' ikonlarını sahte ikonlarla değiştiriyoruz
vi.mock('lucide-react', async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    TrendingUp: (props) => <div data-testid="trending-up" {...props} />,
    TrendingDown: (props) => <div data-testid="trending-down" {...props} />,
    DollarSign: (props) => <div data-testid="icon-dollar" {...props} />,
  };
});

describe('KPICard Bileşeni', () => {

  it('title, formatlanmış value ve trend metnini doğru göstermeli', () => {
    render(
      <KPICard
        title="Toplam Satış"
        value={125000}
        trend={15.2}
        icon={DollarSign}
        type="currency"
      />
    );

    // Bileşenin 'title' ve 'value' (formatlanmış) prop'larını render ettiğini doğrula
    expect(screen.getByText('Toplam Satış')).toBeInTheDocument();
    expect(screen.getByText('₺125.000')).toBeInTheDocument();
    expect(screen.getByText(/15.2%/i)).toBeInTheDocument();
  });

  it('pozitif "trend" prop\'u aldığında "TrendingUp" ikonunu göstermeli', () => {
    render(
      <KPICard
        title="Test"
        value={100}
        trend={5.0} // Pozitif trend
        icon={DollarSign}
      />
    );

    // Pozitif trend ikonu ('trending-up') görünür olmalı
    expect(screen.getByTestId('trending-up')).toBeInTheDocument();
    // Negatif trend ikonu görünmez olmalı
    expect(screen.queryByTestId('trending-down')).not.toBeInTheDocument();
    
    // Yüzde metninin yeşil (pozitif) stile sahip olduğunu doğrula
    const trendElement = screen.getByText(/5%/i);
    expect(trendElement.className).toContain('text-green-500');
  });

  it('negatif "trend" prop\'u aldığında "TrendingDown" ikonunu göstermeli', () => {
    render(
      <KPICard
        title="Test"
        value={100}
        trend={-2.4} // Negatif trend
        icon={DollarSign}
      />
    );

    // Negatif trend ikonu ('trending-down') görünür olmalı
    expect(screen.getByTestId('trending-down')).toBeInTheDocument();
    // Pozitif trend ikonu görünmez olmalı
    expect(screen.queryByTestId('trending-up')).not.toBeInTheDocument();

    // Yüzde metninin kırmızı (negatif) stile sahip olduğunu doğrula
    const trendElement = screen.getByText(/2.4%/i);
    expect(trendElement.className).toContain('text-red-500');
  });

});