import { describe, it, expect } from 'vitest';
import { 
  formatCurrency, 
  formatNumber, 
  getStatusColor 
} from './helpers';

describe('formatCurrency', () => {
  it('sayıyı Türk Lirası (₺) formatına kuruşsuz çevirmeli', () => {
    // 'Intl' kütüphanesi boşluk karakteri ekleyebilir, bu yüzden regex kullanıyoruz
    expect(formatCurrency(10000)).toMatch(/₺10.000/);
    expect(formatCurrency(1500)).toMatch(/₺1.500/);
    expect(formatCurrency(0)).toMatch(/₺0/);
  });
});

describe('formatNumber', () => {
  it('sayıyı Türk (tr-TR) lokaline göre binlik ayraçla formatlamalı', () => {
    expect(formatNumber(1250)).toMatch(/1.250/);
    expect(formatNumber(1000000)).toMatch(/1.000.000/);
  });
});

describe('getStatusColor', () => {
  it('"Teslim Edildi" için yeşil (green) CSS sınıflarını döndürmeli', () => {
    const statusClass = getStatusColor('Teslim Edildi');
    expect(statusClass).toContain('green');
    expect(statusClass).not.toContain('red');
  });

  it('"İptal" için kırmızı (red) CSS sınıflarını döndürmeli', () => {
    const statusClass = getStatusColor('İptal');
    expect(statusClass).toContain('red');
    expect(statusClass).not.toContain('green');
  });

  it('"Kargoda" için mavi (blue) CSS sınıflarını döndürmeli', () => {
    const statusClass = getStatusColor('Kargoda');
    expect(statusClass).toContain('blue');
  });

  it('Bilinmeyen bir durum için varsayılan (gri/gray) sınıfı döndürmeli', () => {
    const statusClass = getStatusColor('BilinmeyenDurum');
    expect(statusClass).toContain('gray');
  });
});