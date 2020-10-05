import Redis from 'ioredis';
import { Store } from '../store/store';
import IORedis from 'ioredis';

export class RedisClient implements Store {
  private client: IORedis.Redis;

  constructor() {
    this.client = new Redis(process.env.REDIS_URL);
  }

  get(key: string): any {
    return this.client.get(key);
  }

  set(key: string, value: any): any {
    return this.client.set(key, value);
  }
}
