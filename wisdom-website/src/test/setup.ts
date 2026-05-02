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

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock crypto.randomUUID
Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: (): string => {
      const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).slice(1);
      return `${s4()}${s4()}-${s4()}-4${s4().slice(1)}-${s4()}-${s4()}${s4()}${s4()}`;
    },
  },
  writable: true,
});
