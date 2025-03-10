import { ReactNode } from 'react';

import { render, renderHook, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { Theme, ThemeProviderContext, useTheme } from './useTheme';

// Mock wrapper component to provide the ThemeProviderContext
const createWrapper = (theme: Theme = 'light', setTheme = vi.fn()) => {
  const ThemeWrapper = ({ children }: { children: ReactNode }) => (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>{children}</ThemeProviderContext.Provider>
  );

  // Add display name for debugging
  ThemeWrapper.displayName = 'ThemeProviderWrapper';

  return ThemeWrapper;
};

describe('useTheme', () => {
  it('throws an error when used outside of ThemeProvider', () => {
    // Suppress console.error for this test to avoid noisy output
    const originalConsoleError = console.error;
    console.error = vi.fn();

    // Expect the hook to throw an error when used outside of ThemeProvider
    expect(() => {
      renderHook(() => useTheme());
    }).toThrow('useTheme must be used within a ThemeProvider');

    // Restore console.error
    console.error = originalConsoleError;
  });

  it('returns the theme context when used within ThemeProvider', () => {
    // Mock theme and setTheme function
    const mockTheme: Theme = 'dark';
    const mockSetTheme = vi.fn();

    // Render the hook with the ThemeProvider wrapper
    const { result } = renderHook(() => useTheme(), {
      wrapper: createWrapper(mockTheme, mockSetTheme),
    });

    // Check if the hook returns the correct theme and setTheme function
    expect(result.current.theme).toBe(mockTheme);
    expect(result.current.setTheme).toBe(mockSetTheme);
  });

  it('allows changing the theme using setTheme', () => {
    // Mock setTheme function
    const mockSetTheme = vi.fn();

    // Render the hook with the ThemeProvider wrapper
    const { result } = renderHook(() => useTheme(), {
      wrapper: createWrapper('light', mockSetTheme),
    });

    // Call setTheme with a new theme
    result.current.setTheme('dark');

    // Check if setTheme was called with the correct argument
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('works with light theme', () => {
    // Render the hook with light theme
    const { result } = renderHook(() => useTheme(), {
      wrapper: createWrapper('light'),
    });

    // Check if the theme is light
    expect(result.current.theme).toBe('light');
  });

  it('works with dark theme', () => {
    // Render the hook with dark theme
    const { result } = renderHook(() => useTheme(), {
      wrapper: createWrapper('dark'),
    });

    // Check if the theme is dark
    expect(result.current.theme).toBe('dark');
  });

  it('can be used in a component', () => {
    // Create a test component that uses the useTheme hook
    const TestComponent = () => {
      const { theme, setTheme } = useTheme();
      return (
        <div>
          <span data-testid="theme-value">{theme}</span>
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle Theme</button>
        </div>
      );
    };

    // Mock setTheme function
    const mockSetTheme = vi.fn();

    // Render the test component with the ThemeProvider wrapper
    render(<TestComponent />, {
      wrapper: createWrapper('light', mockSetTheme),
    });

    // Check if the theme value is displayed correctly
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');

    // Click the toggle button
    screen.getByText('Toggle Theme').click();

    // Check if setTheme was called with the correct argument
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });
});
