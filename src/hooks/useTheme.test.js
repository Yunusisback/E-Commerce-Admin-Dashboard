import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useTheme } from './useTheme';

describe('useTheme Hook', () => {

  // Her testten önce localStorage'ı ve <html> class'larını temizle
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark', 'light');

    // Tarayıcının 'window.matchMedia' (sistem tercihi) fonksiyonunu taklit et
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false, // Varsayılan olarak sistemin 'light' modda olduğunu varsay
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

  // Her testten sonra mock'ları (taklitleri) temizle
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('başlangıçta temayı localStorage\'dan doğru okumalı', () => {
    // Testten önce localStorage'ı 'dark' olarak ayarla
    localStorage.setItem('theme', 'dark');

    const { result } = renderHook(() => useTheme());

    // Hook'un 'dark' başladığını ve <html>'e 'dark' class'ı eklediğini doğrula
    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('localStorage boşsa varsayılan olarak "light" tema ile başlamalı', () => {
    // (localStorage'ın 'beforeEach' sayesinde boş olduğundan eminiz)
    const { result } = renderHook(() => useTheme());

    // Hook'un 'light' başladığını ve <html>'e 'light' class'ı eklediğini doğrula
    expect(result.current.theme).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('toggleTheme çağrıldığında temayı (light -> dark) değiştirmeli', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light'); // Başlangıç 'light'

    // 'act' (eylem) içinde state güncellemesini tetikle
    act(() => {
      result.current.toggleTheme();
    });

    // Tema değişikliğini, localStorage'ı ve <html> class'ını doğrula
    expect(result.current.theme).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggleTheme çağrıldığında temayı (dark -> light) değiştirmeli', () => {
    // 'dark' modda başla
    localStorage.setItem('theme', 'dark');
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark'); 

    // State güncellemesini tetikle
    act(() => {
      result.current.toggleTheme();
    });

    // Tema değişikliğini, localStorage'ı ve <html> class'ını doğrula
    expect(result.current.theme).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });
});