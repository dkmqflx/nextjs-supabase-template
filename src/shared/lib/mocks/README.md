# Mock Service Worker (MSW) Setup

This directory contains the setup for Mock Service Worker (MSW), which is used to intercept and mock API requests during testing and development.

## Files

- `handlers.ts` - Contains all the API mocking handlers
- `server.ts` - Node.js server setup for tests
- `browser.ts` - Browser setup for development environment

## How to Use in Tests

1. The MSW server is automatically started in `src/shared/lib/testSetup.ts` for all tests.

2. Define your API mocks in `handlers.ts`:

```typescript
import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('*/api/example', () => {
    return HttpResponse.json({
      data: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ],
    });
  }),
];
```

3. Override handlers in specific tests if needed:

```typescript
import { HttpResponse, http } from 'msw';

import { server } from '../mocks/server';

// In your test
it('handles error case', async () => {
  // Override handler for this test only
  server.use(
    http.get('*/api/example', () => {
      return HttpResponse.json({ message: 'Error message' }, { status: 500 });
    }),
  );

  // Your test code...
});
```

4. Use with TanStack Query:

```typescript
import { renderWithClient } from '@/shared/lib/test/render';

// Render your component with the QueryClient provider
renderWithClient(<YourComponent />);
```

## Tips

- Use `*/path` pattern to match both relative and absolute URLs
- Reset handlers after each test with `server.resetHandlers()` (already set up in testSetup.ts)
- For one-off mocks in specific tests, use `server.use(...)`
- Check the [MSW documentation](https://mswjs.io/docs/) for more advanced usage
