import { App } from '@slack/bolt';
import { registerEchoHandler } from './echo';

export const registerMessageHandlers = (app: App) => {
  registerEchoHandler(app);
};
