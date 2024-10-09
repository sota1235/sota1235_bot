import { Store } from './store';

export class MemoryStore implements Store {
  private storage: Record<string, string | null> = {};

  async get(key: string) {
    return this.storage[key];
  }

  async set(key: string, value: string | null) {
    this.storage[key] = value;
  }
}
