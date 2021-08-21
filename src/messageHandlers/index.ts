import { App } from '@slack/bolt';
import { registerEchoHandler } from './echo';
import { registerRemoHandler } from './remo';
import { registerHorimiyaHandler } from './horimiya';

// Should return text for help command
export type MessageHandler = (
  app: App,
) => {
  command: string;
  description: string;
};

const messageHandlers: MessageHandler[] = [
  registerEchoHandler,
  registerRemoHandler,
  registerHorimiyaHandler,
];

export const registerMessageHandlers = (app: App): void => {
  const helpMessages: string[] = [];
  for (const handler of messageHandlers) {
    const { command, description } = handler(app);
    helpMessages.push(`${command}\t${description}`);
  }

  app.message(/help/i, async ({ say }) => {
    await say(helpMessages.join('\n'));
  });
};
