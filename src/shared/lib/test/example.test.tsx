import { useQuery } from '@tanstack/react-query';
import { screen, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { describe, expect, it } from 'vitest';

import { server } from '../mocks/server';
import { renderWithClient } from './render';

// Example component that uses TanStack Query
function ExampleComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['example'],
    queryFn: async () => {
      const response = await fetch('/api/example');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Example Data</h1>
      <ul>{data?.data.map((item: { id: number; name: string }) => <li key={item.id}>{item.name}</li>)}</ul>
    </div>
  );
}

describe('ExampleComponent with MSW', () => {
  it('renders loading state and then data', async () => {
    // Render the component with the QueryClient provider
    renderWithClient(<ExampleComponent />);

    // Check if loading state is displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for the data to be loaded
    await waitFor(() => {
      expect(screen.getByText('Example Data')).toBeInTheDocument();
    });

    // Check if the data is displayed correctly
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('handles error responses', async () => {
    // Override the default handler for this specific test
    server.use(
      http.get('*/api/example', () => {
        return HttpResponse.json({ message: 'Server Error' }, { status: 500 });
      }),
    );

    // Render the component with the QueryClient provider
    renderWithClient(<ExampleComponent />);

    // Check if loading state is displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for the error to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });
});
