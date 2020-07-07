import { App } from '@slack/bolt';
import { HorimiyaRssService } from '../services/horimiyaRssService';

export function registerHorimiyaHandler(app: App) {
  app.message(/horimiya/i, async ({ say }) => {
    const service = new HorimiyaRssService();

    try {
      const articles = await service.getLatestArticles();

      if (articles.length === 0) {
        say('新しいマンガはありません');
        return;
      }

      const text = articles
        .map(article => `[${article.title}] ${article.url}`)
        .join('\n');
      say(text);
    } catch (e) {
      say(e.message);
      return;
    }
  });
}
