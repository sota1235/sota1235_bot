import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import { ArticleEntity } from '../../entities/article';
import iconv from 'iconv-lite';

const baseURL = 'http://dka-hero.me';

const HorimiyaListURL = `${baseURL}/h_02.html`;

export class DkaParser {
  getHorimiyaArticleList(): Promise<ArticleEntity[]> {
    return this.crawlList(HorimiyaListURL);
  }

  protected async crawlList(url: string): Promise<ArticleEntity[]> {
    const res = await fetch(url, {
      method: 'GET',
    });

    if (!res.ok) {
      throw new Error(`Getting a list from ${url} failed`);
    }

    const buffer = await res.buffer();

    const dom = new JSDOM(iconv.decode(buffer, 'Shift_JIS'));
    const articles = dom.window.document.querySelectorAll(
      'a[target="contents"]',
    );

    const results: ArticleEntity[] = [];

    articles.forEach((node) => {
      const title = node.textContent ?? 'Error: 不明'; // TODO: 例外あるか見るためにerrorを投げずにやる
      const path = node.getAttribute('href');
      const url = path !== null ? `${baseURL}/${path}` : '/notfound';
      results.push({
        title,
        url,
      });
    });

    return results;
  }
}
