import { App } from '@slack/bolt';

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

app.message(/echo (.*)/i, ({ say, context }) => {
  say(context.matches[1]);
});

app.event<'reaction_added'>('reaction_added', async ({ event }) => {
  console.log(event.reaction);
});

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
