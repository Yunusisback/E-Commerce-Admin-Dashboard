import { describe, it, expect } from 'vitest';
import { 
  formatCurrency, 
  formatNumber, 
  getStatusColor 
} from './helpers';



// formatCurrency Testi
describe('formatCurrency', () => {
  it('sayıyı Türk Lirası (₺) formatına kuruşsuz çevirmeli', () => {
    expect(formatCurrency(10000)).toMatch(/₺10.000/);
    expect(formatCurrency(1500)).toMatch(/₺1.500/);
    expect(formatCurrency(0)).toMatch(/₺0/);
  });
});

// formatNumber Testi
describe('formatNumber', () => {
  it('sayıyı Türk (tr-TR) lokaline göre binlik ayraçla formatlamalı', () => {
    expect(formatNumber(1250)).toMatch(/1.250/);
    expect(formatNumber(1000000)).toMatch(/1.000.000/);
  });
});

// getStatusColor Testi
describe('getStatusColor', () => {
  it('"Teslim Edildi" için zümrüt (emerald) CSS sınıflarını döndürmeli', () => {
    const statusClass = getStatusColor('Teslim Edildi');
    
    //  'green' yerine 'emerald' arıyoruz
    expect(statusClass).toContain('emerald');
    expect(statusClass).not.toContain('rose');
  });

  it('"İptal" için gül (rose) CSS sınıflarını döndürmeli', () => {
    const statusClass = getStatusColor('İptal');
    
    //  'red' yerine 'rose' arıyoruz
    expect(statusClass).toContain('rose');
    expect(statusClass).not.toContain('emerald');
  });

  it('"Kargoda" için viyola (violet) CSS sınıflarını döndürmeli', () => {
    const statusClass = getStatusColor('Kargoda');
    
    //  'blue' yerine 'violet' arıyoruz
    expect(statusClass).toContain('violet');
  });

  it('"Hazırlanıyor" için kehribar (amber) CSS sınıflarını döndürmeli', () => {
    const statusClass = getStatusColor('Hazırlanıyor');
    
    //  'yellow' yerine 'amber' arıyoruz
    expect(statusClass).toContain('amber');
  });

  it('Bilinmeyen bir durum için varsayılan (çinko/zinc) sınıfı döndürmeli', () => {
    const statusClass = getStatusColor('BilinmeyenDurum');
    
    //  'gray' yerine 'zinc (koyu tema) arıyoruz
    expect(statusClass).toContain('zinc');
  });
});