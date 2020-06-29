import { App } from '@slack/bolt';
import { registerEchoHandler } from './echo';
import { registerRemoHandler } from './remo';

export const registerMessageHandlers = (app: App) => {
  registerEchoHandler(app);
  registerRemoHandler(app);
};
