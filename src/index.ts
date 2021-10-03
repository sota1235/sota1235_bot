import { App, ExpressReceiver } from '@slack/bolt';
import reactionAddedHandlers from './reaction_handlers';
import { registerMessageHandlers } from './messageHandlers';
import { registerSchedulers } from './scheduler';
import { channels } from './constants';
import { Severity } from '@sentry/node';
import { captureException, initSentry } from './sentry';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('source-map-support').install();

// Sentry initialization
initSentry();

// App initialization
const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET as string,
});

const app = new App({
  receiver,
  token: process.env.SLACK_BOT_TOKEN,
});

app.error(async (err) => {
  console.error(err);
  captureException(err, {
    level: Severity.Critical,
  });
});

receiver.router.get('/liveness_check', (_, res) => {
  res.send('OK');
});

// Register event handlers
registerMessageHandlers(app);

app.event<'reaction_added'>('reaction_added', async (args) => {
  const { event } = args;
  const reactionName = event.reaction;

  for (const handler in reactionAddedHandlers) {
    if (handler === reactionName) {
      reactionAddedHandlers[handler](args);
    }
  }
});

// Start
(async () => {
  // Start the app
  await app.start(3000);

  registerSchedulers();

  console.log('⚡️ Bolt app is running!');

  await app.client.chat.postMessage({
    channel: channels.sandbox,
    text: `Botがデプロイされました
    hash: ${process.env.HEROKU_SLUG_COMMIT || 'revision not found'}
    release version: ${
      process.env.HEROKU_RELEASE_VERSION || 'version not found'
    }`,
    token: process.env.SLACK_BOT_TOKEN,
    icon_emoji: ':wrench:',
  });
})();
