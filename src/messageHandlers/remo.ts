import { App } from '@slack/bolt';
import fetch from 'node-fetch';

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
[Device Name] 
${device.name}
[Status]
- 温度: ${device.newest_events.te.val}℃
    `;

    if (device.newest_events.hu !== undefined) {
      text += `\n- 湿度: ${device.newest_events.hu.val}%`;
    }

    if (device.newest_events.il !== undefined) {
      text += `\n- 照度: ${device.newest_events.il.val}`;
    }

    if (device.newest_events.mo !== undefined) {
      text += `\n- 人感センサー: ${device.newest_events.mo.val}`;
    }

    message.push(text);
  }

  return message.join('\n');
}

export function registerRemoHandler(app: App) {
  app.message(/remo/i, async ({ say }) => {
    const res = await fetch(`${REMO_API_URL}/1/devices`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${REMO_API_TOKEN}`,
      },
    });

    if (!res.ok) {
      try {
        const body: ErrorResponse = await res.json();
        say(
          `エラーが発生しました: code - ${body.code} / message: ${body.message}`,
        );
        return;
      } catch (e) {
        say(`エラーが発生しました: ${e.message}`);
        return;
      }
    }

    const body: GetDeviceResponse = await res.json();

    say(generateMessage(body));
  });
}
