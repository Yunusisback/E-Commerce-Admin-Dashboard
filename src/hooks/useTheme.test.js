import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useTheme } from './useTheme';

describe('useTheme Hook', () => {

 
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark', 'light');

    Object.defineProperty(window, 'matchMedia', {
      writable: true, // Testlerin üzerine yazabilmesi için
      value: vi.fn().mockImplementation(query => ({ // Değeri sahte bir fonksiyon yap
        matches: false, // (prefers-color-scheme: dark) -> false (Varsayılan: light mod)
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // 1. Gerekli Kısım: localStorage'dan Başlangıç Değeri Alma
  it('başlangıçta temayı localStorage\'dan doğru okumalı', () => {
    localStorage.setItem('theme', 'dark');
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  // 2. Gerekli Kısım: Varsayılan Başlangıç Değeri (localStorage boşken)
  it('localStorage boşsa varsayılan olarak "light" tema ile başlamalı', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  // 3. Gerekli Kısım: toggleTheme Etkileşimi
  it('toggleTheme çağrıldığında temayı (light -> dark) değiştirmeli', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light'); 

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  // 4. Gerekli Kısım: toggleTheme Etkileşimi (Ters Yön)
  it('toggleTheme çağrıldığında temayı (dark -> light) değiştirmeli', () => {
    localStorage.setItem('theme', 'dark');
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark'); 

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });
});