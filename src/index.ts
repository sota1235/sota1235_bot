import { App, ExpressReceiver } from '@slack/bolt';
import reactionAddedHandlers from './reaction_handlers';
import { registerMessageHandlers } from './messageHandlers';
import { registerSchedulers } from './scheduler';
import { channels } from './constants';

const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET as string,
});

const app = new App({
  receiver,
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

receiver.router.get('/liveness_check', (_, res) => {
  res.send('OK');
});

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  registerSchedulers();

  console.log('⚡️ Bolt app is running!');

  await app.client.chat.postMessage({
    channel: channels.sandbox,
    text: `Botがデプロイされました ${process.env.SOURCE_VERSION}`,
    token: process.env.SLACK_BOT_TOKEN,
    icon_emoji: ':wrench:',
  });
})();
