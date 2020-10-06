import { ArticleEntity } from '../entities/article';
import { DkaParser } from '../modules/dkaParser/dkaParser';
import { getStoreClient, Store } from '../store/store';

export class HorimiyaRssService {
  private client: Store;

  constructor() {
    this.client = getStoreClient();
  }

  async getLatestArticles(): Promise<{
    horimiya: ArticleEntity[];
    aco: ArticleEntity[];
  }> {
    const crawler = new DkaParser();

    const horimiyaList = await crawler.getHorimiyaArticleList();
    const acoList = await crawler.getAcoArticleList();

    const latestHorimiyaTitle = await this.client.get(
      this.getRedisKey('horimiya'),
    );
    const latestAcoTitle = await this.client.get(this.getRedisKey('aco'));

    const latestHorimiyaArticles: ArticleEntity[] = [];
    const latestAcoArticles: ArticleEntity[] = [];

    for (const horimiyaArticle of horimiyaList.reverse()) {
      if (horimiyaArticle.title !== latestHorimiyaTitle) {
        latestHorimiyaArticles.push(horimiyaArticle);
      } else {
        break;
      }
    }

    if (latestHorimiyaArticles.length > 0) {
      await this.client.set(
        this.getRedisKey('horimiya'),
        latestHorimiyaArticles[0].title,
      );
    }

    for (const acoArticle of acoList.reverse()) {
      if (acoArticle.title !== latestAcoTitle) {
        latestAcoArticles.push(acoArticle);
      } else {
        break;
      }
    }

    if (latestAcoArticles.length > 0) {
      await this.client.set(
        this.getRedisKey('aco'),
        latestAcoArticles[0].title,
      );
    }

    return {
      horimiya: latestHorimiyaArticles,
      aco: latestAcoArticles,
    };
  }

  protected getRedisKey(variant: 'horimiya' | 'aco'): string {
    return `rss:dka:${variant}:latest`;
  }
}
