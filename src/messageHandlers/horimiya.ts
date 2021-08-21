import { App } from '@slack/bolt';
import { HorimiyaRssService } from '../services/horimiyaRssService';
import { getView } from '../views/feedComic';
import { MessageHandler } from './index';

export const registerHorimiyaHandler: MessageHandler = (app: App) => {
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

  return {
    command: 'horimiya',
    description: 'The newest feed of 堀宮',
  };
};
