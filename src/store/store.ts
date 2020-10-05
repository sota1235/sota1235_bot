import { RedisClient } from '../redis/client';
import { MemoryStore } from './memoryStore';

export interface Store {
  get(key: string): Promise<any>;
  set(key: string, value: any): Promise<any>;
}

export function getStoreClient(): Store {
  switch (process.env.STORAGE_TYPE) {
    case 'memory': {
      return new MemoryStore();
    }
    case 'redis': {
      return new RedisClient();
    }
  }

  throw new Error(`unsupported storage type: ${process.env.STORAGE_TYPE}`);
}
