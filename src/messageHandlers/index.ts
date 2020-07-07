import { App } from '@slack/bolt';
import { registerEchoHandler } from './echo';
import { registerRemoHandler } from './remo';
import { registerHorimiyaHandler } from './horimiya';

export const registerMessageHandlers = (app: App) => {
  registerEchoHandler(app);
  registerRemoHandler(app);
  registerHorimiyaHandler(app);
};
