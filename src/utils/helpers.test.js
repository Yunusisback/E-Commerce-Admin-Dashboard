import { describe, it, expect } from 'vitest';
import { 
  formatCurrency, 
  formatNumber, 
  getStatusColor 
} from './helpers';



//  1. Para Birimi Formatlama Testi 
describe('formatCurrency', () => {

  it('sayıyı Türk Lirası (₺) formatına kuruşsuz çevirmeli', () => {
    // Intl (Uluslararasılaştırma) kütüphanesi nedeniyle
    // boşluk karakteri (non-breaking space) içerebilir, regex ile kontrol etmek en iyisidir
    
    // 10000 -> ₺10.000
    expect(formatCurrency(10000)).toMatch(/₺10.000/);
    
    // 1500 -> ₺1.500
    expect(formatCurrency(1500)).toMatch(/₺1.500/);
    
    // 0 -> ₺0
    expect(formatCurrency(0)).toMatch(/₺0/);
  });
});

// 2. Sayı Formatlama Testi 
describe('formatNumber', () => {
  it('sayıyı Türk (tr-TR) lokaline göre binlik ayraçla formatlamalı', () => {
    
    // 1250 -> 1.250
    expect(formatNumber(1250)).toMatch(/1.250/);
    
    // 1000000 -> 1.000.000
    expect(formatNumber(1000000)).toMatch(/1.000.000/);
  });
});

// 3. Durum Rengi (Status Color) Testi 
describe('getStatusColor', () => {
  it('"Teslim Edildi" için yeşil (green) CSS sınıflarını döndürmeli', () => {
    const statusClass = getStatusColor('Teslim Edildi');
    
    // Beklenti: 'green' kelimesini içermeli
    expect(statusClass).toContain('green');
    // Beklenti: 'red' kelimesini içermemeli
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