import { ArticleEntity } from '../entities/article';
import { DkaParser } from '../modules/dkaParser/dkaParser';
import { getStoreClient, Store } from '../store/store';

export class HorimiyaRssService {
  private client: Store;

  constructor() {
    this.client = getStoreClient();
  }

  async getLatestArticles(): Promise<ArticleEntity[]> {
    const crawler = new DkaParser();

    const horimiyaList = await crawler.getHorimiyaArticleList();
    const acoList = await crawler.getAcoArticleList();

    const latestHorimiyaTitle = await this.client.get(
      this.getRedisKey('horimiya'),
    );
    const latestAcoTitle = await this.client.get(this.getRedisKey('aco'));

    const results: ArticleEntity[] = [];

    if (horimiyaList.slice(-1)[0].title !== latestHorimiyaTitle) {
      const latestArticle = horimiyaList.slice(-1)[0];
      await this.client.set(this.getRedisKey('horimiya'), latestArticle.title);
      results.push(latestArticle);
    }

    if (acoList.slice(-1)[0].title !== latestAcoTitle) {
      const latestArticle = acoList.slice(-1)[0];
      await this.client.set(this.getRedisKey('aco'), latestArticle.title);
      results.push(latestArticle);
    }

    return results;
  }

  protected getRedisKey(variant: 'horimiya' | 'aco'): string {
    return `rss:dka:${variant}:latest`;
  }
}
