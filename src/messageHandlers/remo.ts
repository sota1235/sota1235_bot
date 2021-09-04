import { App } from '@slack/bolt';
import fetch from 'node-fetch';
import { MessageHandler } from './index';

const REMO_API_URL = 'https://api.nature.global';
const REMO_API_TOKEN = process.env.REMO_API_TOKEN;

interface ErrorResponse {
  code: string;
  message: string;
}

type GetDeviceResponse = {
  name: string;
  id: string;
  created_at: string;
  updated_at: string;
  mac_address: string;
  serial_number: string;
  firmware_version: string;
  temperature_offset: number;
  humidity_offset: number;
  users: {
    id: string;
    nickname: string;
    superuser: boolean;
  }[];
  newest_events: {
    te: {
      val: number;
      created_at: string;
    };
    il?: {
      val: number;
      created_at: string;
    };
    mo?: {
      val: number;
      created_at: string;
    };
    hu?: {
      val: number;
      created_at: string;
    };
  };
}[];

function generateMessage(body: GetDeviceResponse): string {
  const message = [];

  for (const device of body) {
    let text = `
[${device.name}]
- 温度:thermometer:: ${device.newest_events.te.val}℃
`;

    if (device.newest_events.hu !== undefined) {
      text += `- 湿度:droplet:: ${device.newest_events.hu.val}%\n`;
    }

    if (device.newest_events.il !== undefined) {
      text += `- 照度:bulb:: ${device.newest_events.il.val}\n`;
    }

    if (device.newest_events.mo !== undefined) {
      text += `- 人感センサー:bust_in_silhouette:: ${device.newest_events.mo.val}\n`;
    }

    message.push(text);
  }

  return message.join('\n');
}

export const registerRemoHandler: MessageHandler = (app: App) => {
  app.message(/remo/i, async ({ say, logger }) => {
    const res = await fetch(`${REMO_API_URL}/1/devices`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${REMO_API_TOKEN}`,
      },
    });

    if (!res.ok) {
      try {
        const body = (await res.json()) as ErrorResponse;
        await say(
          `エラーが発生しました: code - ${body.code} / message: ${body.message}`,
        );
        return;
      } catch (e) {
        logger.error(e);
        await say(`エラーが発生しました: ${e.message}`);
        return;
      }
    }

    const body = (await res.json()) as GetDeviceResponse;

    await say(generateMessage(body));
  });

  return {
    command: 'remo',
    description: 'Room status reported by remo',
  };
};
