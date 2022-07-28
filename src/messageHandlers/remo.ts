import { App } from '@slack/bolt';
import { MessageHandler } from './index';
import { Api, Devices } from '../remo/client';

const REMO_API_TOKEN = process.env.REMO_API_TOKEN;

function generateMessage(body: Devices): string {
  const message = [];

  for (const device of body) {
    let text = `
[${device.name}]
- 温度:thermometer:: ${device.newest_events?.te?.val}℃
`;

    if (device.newest_events?.hu !== undefined) {
      text += `- 湿度:droplet:: ${device.newest_events.hu.val}%\n`;
    }

    if (device.newest_events?.il !== undefined) {
      text += `- 照度:bulb:: ${device.newest_events.il.val}\n`;
    }

    if (device.newest_events?.mo !== undefined) {
      text += `- 人感センサー:bust_in_silhouette:: ${device.newest_events.mo.val}\n`;
    }

    message.push(text);
  }

  return message.join('\n');
}

export const registerRemoHandler: MessageHandler = (app: App) => {
  app.message(/remo/i, async ({ say, logger }) => {
    const client = new Api({
      baseApiParams: {
        headers: {
          Authorization: `Bearer ${REMO_API_TOKEN}`,
        },
      },
    });

    try {
      const res = await client.v1.devicesList();
      const body = await res.json();
      await say(generateMessage(body));
    } catch (e) {
      logger.error(e);
      await say(`エラーが発生しました: ${e}`);
      return;
    }
  });

  return {
    command: 'remo',
    description: 'Room status reported by remo',
  };
};
