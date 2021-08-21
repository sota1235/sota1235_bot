import cron, { ScheduleOptions } from 'node-cron';
import { WebClient } from '@slack/web-api';
import { DateTime } from 'luxon';
import { HorimiyaRssService } from './services/horimiyaRssService';
import { getView } from './views/feedComic';

const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);
const cronSettings: ScheduleOptions = {
  timezone: 'Asia/Tokyo',
};

export function registerSchedulers() {
  cron.schedule(
    '0 0 10 1 * *',
    () => {
      const now = DateTime.local().setZone('Asia/Tokyo');
      slackClient.chat
        .postMessage({
          channel: 'general',
          text: `
${now.month}月のやることリストです
https://scrapbox.io/sota1235/やることリスト_${now.year}%2F${now.month}
      `,
        })
        .catch((err) => {
          console.error(err);
        });
    },
    cronSettings,
  );

  cron.schedule(
    '0 0 10 * * 1',
    () => {
      const service = new HorimiyaRssService();
      service
        .getLatestArticles()
        .then((data) => {
          const text = getView(data);

          return slackClient.chat.postMessage({
            channel: 'feed-comic',
            text,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    cronSettings,
  );
}
