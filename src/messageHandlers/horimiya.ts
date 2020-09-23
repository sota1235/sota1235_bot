import { App } from '@slack/bolt';
import { HorimiyaRssService } from '../services/horimiyaRssService';

export function registerHorimiyaHandler(app: App) {
  app.message(/horimiya/i, async ({ say, logger }) => {
    const service = new HorimiyaRssService();

    try {
      const articles = await service.getLatestArticles();

      if (articles.length === 0) {
        await say('新しいマンガはありません');
        return;
      }

      const text = articles
        .map(article => `[${article.title}] ${article.url}`)
        .join('\n');
      await say(text);
    } catch (e) {
      logger.error(e);
      await say(e.message);
      return;
    }
  });
}
