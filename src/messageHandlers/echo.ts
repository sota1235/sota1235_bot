import { App } from '@slack/bolt';

export function registerEchoHandler(app: App) {
  app.message(/echo (.*)/i, async ({ say, context }) => {
    await say(context.matches[1]);
  });
}
