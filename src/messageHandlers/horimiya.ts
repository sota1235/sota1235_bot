import { App } from '@slack/bolt';
import { HorimiyaRssService } from '../services/horimiyaRssService';
import { getView } from '../views/feedComic';

export function registerHorimiyaHandler(app: App) {
  app.message(/horimiya/i, async ({ say, logger }) => {
    const service = new HorimiyaRssService();

    try {
      const articles = await service.getLatestArticles();
      const text = getView(articles);
      await say(text);
    } catch (e) {
      logger.error(e);
      await say(e.message);
      return;
    }
  });
}
