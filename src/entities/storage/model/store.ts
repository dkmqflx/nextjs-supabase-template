import { create } from 'zustand';

export const VIEW_MODE = {
  LIST: 'list',
  GRID: 'grid',
} as const;

type ViewMode = (typeof VIEW_MODE)[keyof typeof VIEW_MODE];

type StorageStore = {
  viewMode: ViewMode;
  toggleViewMode: () => void;
};

export const useStorageStore = create<StorageStore>((set) => ({
  viewMode: VIEW_MODE.LIST,
  toggleViewMode: () =>
    set((state) => ({
      viewMode: state.viewMode === VIEW_MODE.LIST ? VIEW_MODE.GRID : VIEW_MODE.LIST,
    })),
}));
