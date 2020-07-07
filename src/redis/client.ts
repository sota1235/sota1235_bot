import Redis from 'ioredis';

export const Client = new Redis(process.env.REDIS_URL);
