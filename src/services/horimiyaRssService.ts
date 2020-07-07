import { ArticleEntity } from '../entities/article';
import { Client as RedisClient } from '../redis/client';
import { DkaParser } from '../modules/dkaParser/dkaParser';

export class HorimiyaRssService {
  async getLatestArticles(): Promise<ArticleEntity[]> {
    const crawler = new DkaParser();

    const horimiyaList = await crawler.getHorimiyaArticleList();
    const acoList = await crawler.getAcoArticleList();

    const latestHorimiyaTitle = await RedisClient.get(
      this.getRedisKey('horimiya'),
    );
    const latestAcoTitle = await RedisClient.get(this.getRedisKey('aco'));

    const results: ArticleEntity[] = [];

    if (horimiyaList.slice(-1)[0].title !== latestHorimiyaTitle) {
      const latestArticle = horimiyaList.slice(-1)[0];
      await RedisClient.set(this.getRedisKey('horimiya'), latestArticle.title);
      results.push(latestArticle);
    }

    if (acoList.slice(-1)[0].title !== latestAcoTitle) {
      const latestArticle = acoList.slice(-1)[0];
      await RedisClient.set(this.getRedisKey('aco'), latestArticle.title);
      results.push(latestArticle);
    }

    return results;
  }

  protected getRedisKey(variant: 'horimiya' | 'aco'): string {
    return `rss:dka:${variant}:latest`;
  }
}
