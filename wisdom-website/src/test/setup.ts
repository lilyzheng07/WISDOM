import '@testing-library/jest-dom';

// Set up localStorage mock before any modules are imported
// This ensures Zustand's persist middleware uses the mock
const localStorageStore: Record<string, string> = {};

const localStorageMock = {
  getItem: (key: string): string | null => localStorageStore[key] ?? null,
  setItem: (key: string, value: string): void => { localStorageStore[key] = value; },
  removeItem: (key: string): void => { delete localStorageStore[key]; },
  clear: (): void => { Object.keys(localStorageStore).forEach((k) => delete localStorageStore[k]); },
  get length(): number { return Object.keys(localStorageStore).length; },
  key: (index: number): string | null => Object.keys(localStorageStore)[index] ?? null,
};

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock crypto.randomUUID
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: (): string => {
      const hex = () => Math.floor(Math.random() * 16).toString(16);
      return `${hex()}${hex()}${hex()}${hex()}-${hex()}${hex()}-4${hex()}${hex()}${hex()}-${hex()}${hex()}${hex()}${hex()}-${hex()}${hex()}${hex()}${hex()}${hex()}${hex()}${hex()}${hex()}${hex()}${hex()}${hex()}${hex()}`;
    },
  },
  writable: true,
});
