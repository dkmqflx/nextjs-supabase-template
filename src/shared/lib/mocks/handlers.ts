import { HttpResponse, http } from 'msw';

// Define your API mocks here
export const handlers = [
  // Example: GET request
  http.get('*/api/example', () => {
    return HttpResponse.json({
      data: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ],
    });
  }),

  // Example: POST request
  http.post('*/api/example', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;

    return HttpResponse.json({ id: 3, ...body }, { status: 201 });
  }),

  // Example: Error response
  http.get('*/api/error', () => {
    return HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }),
];
