/**
 * @fileoverview Main file of bot.
 */
const path     = require('path');
const SlackBot = require('slackbot');

const bot = new SlackBot(process.env.SLACK_TOKEN, {
  default_channel: process.env.SLACK_DEFAULT_CHANNEL,
});

bot.loadDir('./scripts');

bot.start().then(() => {
});
