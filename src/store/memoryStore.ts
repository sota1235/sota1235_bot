import { Store } from './store';

export class MemoryStore implements Store {
  private storage: Record<string, any> = {};

  async get(key: string): Promise<any> {
    return this.storage[key];
  }

  async set(key: string, value: any): Promise<any> {
    this.storage[key] = value;
  }
}
