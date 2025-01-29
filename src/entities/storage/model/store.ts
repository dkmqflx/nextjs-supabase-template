import debounce from 'lodash.debounce';
import { create } from 'zustand';

export enum VIEW_MODE {
  LIST = 'list',
  GRID = 'grid',
}

const DEBOUNCE_TIME = 500;

type StorageState = {
  viewMode: VIEW_MODE;

  debouncedSearch: string;
  toggleViewMode: () => void;
  setDebouncedSearch: (query: string) => void;
};

export const useStorageStore = create<StorageState>((set) => ({
  viewMode: VIEW_MODE.LIST,

  debouncedSearch: '',
  toggleViewMode: () =>
    set((state) => ({
      viewMode: state.viewMode === VIEW_MODE.LIST ? VIEW_MODE.GRID : VIEW_MODE.LIST,
    })),

  setDebouncedSearch: debounce((query: string) => set({ debouncedSearch: query }), DEBOUNCE_TIME),
}));
