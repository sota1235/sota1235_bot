import { App } from '@slack/bolt';

export function registerEchoHandler(app: App) {
  app.message(/echo (.*)/i, ({ say, context }) => {
    say(context.matches[1]);
  });
}
