import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import FileSearch from './FileSearch';

// Explicitly define mocked store types
const VIEW_MODE = {
  LIST: 'list',
  GRID: 'grid',
} as const;

// Create mocked store functions
const mockToggleViewMode = vi.fn();
const mockSetDebouncedSearch = vi.fn();

// Mocked useStorageStore function
const mockUseStorageStore = vi.fn();

// Module mocking
vi.mock('@/entities/storage/model/store', () => ({
  VIEW_MODE: {
    LIST: 'list',
    GRID: 'grid',
  },
  useStorageStore: () => mockUseStorageStore(),
}));

describe('FileSearch', () => {
  const mockDict = {
    placeholder: 'Search files',
    listView: 'List view',
    gridView: 'Grid view',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search input with correct placeholder', () => {
    // Set up mocked store return value
    mockUseStorageStore.mockReturnValue({
      viewMode: VIEW_MODE.GRID,
      toggleViewMode: mockToggleViewMode,
      debouncedSearch: '',
      setDebouncedSearch: mockSetDebouncedSearch,
    });

    render(<FileSearch dict={mockDict} />);

    const searchInput = screen.getByPlaceholderText(mockDict.placeholder);
    expect(searchInput).toBeInTheDocument();
  });

  it('updates search value and calls setDebouncedSearch when typing', async () => {
    // Set up mocked store return value
    mockUseStorageStore.mockReturnValue({
      viewMode: VIEW_MODE.GRID,
      toggleViewMode: mockToggleViewMode,
      debouncedSearch: '',
      setDebouncedSearch: mockSetDebouncedSearch,
    });

    const user = userEvent.setup();
    render(<FileSearch dict={mockDict} />);

    const searchInput = screen.getByPlaceholderText(mockDict.placeholder);

    // Type in the search input
    await user.type(searchInput, 'test search');

    // Check if the input value is updated
    expect(searchInput).toHaveValue('test search');

    // Check if setDebouncedSearch was called with the correct value
    expect(mockSetDebouncedSearch).toHaveBeenCalledWith('test search');
  });

  it('displays the correct view mode button as active when in LIST mode', () => {
    // Set up mocked store return value
    mockUseStorageStore.mockReturnValue({
      viewMode: VIEW_MODE.LIST,
      toggleViewMode: mockToggleViewMode,
      debouncedSearch: '',
      setDebouncedSearch: mockSetDebouncedSearch,
    });

    render(<FileSearch dict={mockDict} />);

    // Get the view mode buttons
    const listViewButton = screen.getByLabelText(mockDict.listView);
    const gridViewButton = screen.getByLabelText(mockDict.gridView);

    // Check if the list view button has the active class
    expect(listViewButton.className).toContain('bg-indigo-100');
    expect(listViewButton.className).toContain('text-indigo-600');

    // Check if the grid view button doesn't have the active class
    expect(gridViewButton.className).not.toContain('bg-indigo-100');
    expect(gridViewButton.className).not.toContain('text-indigo-600');
  });

  it('displays the correct view mode button as active when in GRID mode', () => {
    // Set up mocked store return value
    mockUseStorageStore.mockReturnValue({
      viewMode: VIEW_MODE.GRID,
      toggleViewMode: mockToggleViewMode,
      debouncedSearch: '',
      setDebouncedSearch: mockSetDebouncedSearch,
    });

    render(<FileSearch dict={mockDict} />);

    // Get the view mode buttons
    const listViewButton = screen.getByLabelText(mockDict.listView);
    const gridViewButton = screen.getByLabelText(mockDict.gridView);

    // Check if the grid view button has the active class
    expect(gridViewButton.className).toContain('bg-indigo-100');
    expect(gridViewButton.className).toContain('text-indigo-600');

    // Check if the list view button doesn't have the active class
    expect(listViewButton.className).not.toContain('bg-indigo-100');
    expect(listViewButton.className).not.toContain('text-indigo-600');
  });

  it('calls toggleViewMode when view mode buttons are clicked', async () => {
    // Set up mocked store return value
    mockUseStorageStore.mockReturnValue({
      viewMode: VIEW_MODE.GRID,
      toggleViewMode: mockToggleViewMode,
      debouncedSearch: '',
      setDebouncedSearch: mockSetDebouncedSearch,
    });

    const user = userEvent.setup();
    render(<FileSearch dict={mockDict} />);

    // Get the view mode buttons
    const listViewButton = screen.getByLabelText(mockDict.listView);
    const gridViewButton = screen.getByLabelText(mockDict.gridView);

    // Click the list view button
    await user.click(listViewButton);
    expect(mockToggleViewMode).toHaveBeenCalledTimes(1);

    // Click the grid view button
    await user.click(gridViewButton);
    expect(mockToggleViewMode).toHaveBeenCalledTimes(2);
  });

  it('initializes search input with debouncedSearch value from store', () => {
    // Set up mocked store return value
    mockUseStorageStore.mockReturnValue({
      viewMode: VIEW_MODE.GRID,
      toggleViewMode: mockToggleViewMode,
      debouncedSearch: 'initial search',
      setDebouncedSearch: mockSetDebouncedSearch,
    });

    render(<FileSearch dict={mockDict} />);

    const searchInput = screen.getByPlaceholderText(mockDict.placeholder);
    expect(searchInput).toHaveValue('initial search');
  });

  it('clears search input correctly', async () => {
    // Set up mocked store return value
    mockUseStorageStore.mockReturnValue({
      viewMode: VIEW_MODE.GRID,
      toggleViewMode: mockToggleViewMode,
      debouncedSearch: 'initial search',
      setDebouncedSearch: mockSetDebouncedSearch,
    });

    const user = userEvent.setup();
    render(<FileSearch dict={mockDict} />);

    const searchInput = screen.getByPlaceholderText(mockDict.placeholder);

    // Clear the input using userEvent
    await user.clear(searchInput);
    // Type a space and delete it to trigger the onChange event
    await user.type(searchInput, ' {backspace}');

    // Check if the input is cleared
    expect(searchInput).toHaveValue('');

    // Check if setDebouncedSearch was called with empty string
    expect(mockSetDebouncedSearch).toHaveBeenCalledWith('');
  });
});
