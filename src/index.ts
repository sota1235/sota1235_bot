import { App, LogLevel } from '@slack/bolt';
import reactionAddedHandlers from './reaction_handlers';
import { registerMessageHandlers } from './messageHandlers';
import { registerSchedulers } from './scheduler';
import { Severity } from '@sentry/node';
import { captureException, initSentry } from './sentry';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('source-map-support').install();

// Sentry initialization
initSentry();

// App initialization
const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET as string,
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_LEVEL_TOKEN,
  logLevel: LogLevel.DEBUG,
});

app.error(async (err) => {
  console.error(err);
  captureException(err, {
    level: Severity.Critical,
  });
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await app.start(process.env.PORT || 3000);

  registerSchedulers();

  console.log('⚡️ Bolt app is running!');
})();
