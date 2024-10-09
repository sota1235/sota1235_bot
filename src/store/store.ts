import { MemoryStore } from './memoryStore';

export interface Store {
  get(key: string): Promise<string | null>;
  set(key: string, value: string | null): Promise<void>;
}

export function getStoreClient(): Store {
  switch (process.env.STORAGE_TYPE) {
    case 'memory': {
      return new MemoryStore();
    }
  }

  throw new Error(`unsupported storage type: ${process.env.STORAGE_TYPE}`);
}
