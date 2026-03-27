import http from 'http';
import { WebClient } from '@slack/web-api';
import { DateTime } from 'luxon';
import { HorimiyaRssService } from './services/horimiyaRssService';
import { getView } from './views/feedComic';

const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

async function handleMonthlyTodo(): Promise<void> {
  const now = DateTime.local().setZone('Asia/Tokyo');
  await slackClient.chat.postMessage({
    channel: 'general',
    text: `
${now.month}月のやることリストです
https://scrapbox.io/sota1235/やることリスト_${now.year}%2F${now.month}
      `,
  });
}

async function handleWeeklyHorimiya(): Promise<void> {
  const service = new HorimiyaRssService();
  const data = await service.getLatestArticles();
  const text = getView(data);

  await slackClient.chat.postMessage({
    channel: 'feed-comic',
    text,
  });
}

export function createHttpServer(): http.Server {
  const port = process.env.PORT ?? 8080;

  const server = http.createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok' }));
      return;
    }

    if (req.method === 'POST' && req.url === '/scheduler/monthly-todo') {
      try {
        await handleMonthlyTodo();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok' }));
      } catch (err) {
        console.error('monthly-todo error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'error' }));
      }
      return;
    }

    if (req.method === 'POST' && req.url === '/scheduler/weekly-horimiya') {
      try {
        await handleWeeklyHorimiya();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok' }));
      } catch (err) {
        console.error('weekly-horimiya error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'error' }));
      }
      return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'not found' }));
  });

  server.listen(port, () => {
    console.log(`HTTP server listening on port ${port}`);
  });

  return server;
}
