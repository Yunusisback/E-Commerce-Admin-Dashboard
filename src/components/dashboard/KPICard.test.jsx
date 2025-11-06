import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'; 


// Test edilecek bileşen
import KPICard from './KPICard';

// Testlerimizde kullanmak için sahte (mock) ikonlar oluşturuyoruz
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

  // 1 Gerekli Kısım: Proplar doğru render ediliyor mu?
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

    // Başlık ekranda mı?
    expect(screen.getByText('Toplam Satış')).toBeInTheDocument();
    
    // Değer (formatCurrency ile) ekranda mı?
    expect(screen.getByText('₺125.000')).toBeInTheDocument();
    
    // Trend yüzdesi (Math.abs ile) ekranda mı?
    expect(screen.getByText(/15.2%/i)).toBeInTheDocument();
  });

  // 2. Gerekli Kısım  Koşullu Mantık (Pozitif Trend)
  it('pozitif "trend" prop\'u aldığında "TrendingUp" ikonunu göstermeli', () => {
    render(
      <KPICard
        title="Test"
        value={100}
        trend={5.0} // Pozitif trend
        icon={DollarSign}
      />
    );

    // Ekranda trending-up test IDli ikonu ara
    expect(screen.getByTestId('trending-up')).toBeInTheDocument();
    
    // Ekranda 'trending-down ikonu OLMADIĞINDAN emin ol
    expect(screen.queryByTestId('trending-down')).not.toBeInTheDocument();
    
    // Pozitif trendin renginin yeşil olduğunu kontrol et
    // DÜZELTME: /5.0%/i yerine /5%/i arıyoruz, çünkü Math.abs(5.0) -> 5
    const trendElement = screen.getByText(/5%/i);
    expect(trendElement.className).toContain('text-green-500');
  });

  // 3. Gerekli Kısım: Koşullu Mantık (Negatif Trend)
  it('negatif "trend" prop\'u aldığında "TrendingDown" ikonunu göstermeli', () => {
    render(
      <KPICard
        title="Test"
        value={100}
        trend={-2.4} // Negatif trend
        icon={DollarSign}
      />
    );

    // Ekranda 'trending-down' test ID'li ikonu ara
    expect(screen.getByTestId('trending-down')).toBeInTheDocument();

    // Ekranda 'trending-up' ikonu OLMADIĞINDAN emin ol
    expect(screen.queryByTestId('trending-up')).not.toBeInTheDocument();

    // Negatif trendin (mutlak değer alındığı için 2.4%) renginin kırmızı olduğunu kontrol et
    const trendElement = screen.getByText(/2.4%/i);
    expect(trendElement.className).toContain('text-red-500');
  });

});