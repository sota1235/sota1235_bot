import mustache from 'mustache';
import fs from 'fs';
import path from 'path';

const templatePath = path.join(__dirname, '..', '..', 'app.template.yaml');
const configPath = path.join(__dirname, '..', '..', 'app.yaml');
const template = fs.readFileSync(templatePath);

const result = mustache.render(template.toString(), {
  SLACK_SIGNING_SECRET: process.env.SLACK_SIGNING_SECRET,
  SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN,
  SLACK_APP_LEVEL_TOKEN: process.env.SLACK_APP_LEVEL_TOKEN,
  NODE_ENV: process.env.NODE_ENV,
  REMO_API_TOKEN: process.env.REMO_API_TOKEN,
  STORAGE_TYPE: process.env.STORAGE_TYPE,
  REDIS_URL: process.env.REDIS_URL,
  SENTRY_DSN: process.env.SENTRY_DSN,
});

fs.writeFileSync(configPath, result);
