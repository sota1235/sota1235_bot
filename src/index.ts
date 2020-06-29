import { App } from '@slack/bolt';
import reactionAddedHandlers from './reaction_handlers';
import { registerMessageHandlers } from './messageHandlers';

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

registerMessageHandlers(app);

app.event<'reaction_added'>('reaction_added', async args => {
  const { event } = args;
  const reactionName = event.reaction;

  for (const handler in reactionAddedHandlers) {
    if (handler === reactionName) {
      reactionAddedHandlers[handler](args);
    }
  }
});

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
