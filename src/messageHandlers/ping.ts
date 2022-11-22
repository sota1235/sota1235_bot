import { App } from '@slack/bolt';
import { MessageHandler } from './index';

export const registerPingHandler: MessageHandler = (app: App) => {
  app.message(/ping (.*)/i, async ({ say }) => {
    await say('pong');
  });

  return {
    command: 'ping',
    description: ':table_tennis_paddle_and_ball: ping pong',
  };
};
