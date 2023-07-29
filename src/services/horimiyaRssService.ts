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
  }> {
    const crawler = new DkaParser();

    const horimiyaList = await crawler.getHorimiyaArticleList();

    const latestHorimiyaTitle = await this.client.get(
      this.getRedisKey('horimiya'),
    );

    const latestHorimiyaArticles: ArticleEntity[] = [];

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

    return {
      horimiya: latestHorimiyaArticles,
    };
  }

  protected getRedisKey(variant: 'horimiya'): string {
    return `rss:dka:${variant}:latest`;
  }
}
