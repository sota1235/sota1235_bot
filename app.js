/**
 * @fileoverview Main file of bot.
 */
const path       = require('path');
const bodyParser = require('body-parser');
const express    = require('express');
const Shrike     = require('shrike');
const config     = require('./config');

const bot = new SlackBot(config.SLACK_TOKEN, {
  default_channel: config.SLACK_DEFAULT_CHANNEL,
});

bot.http = express();
bot.http.use(bodyParser.json());

bot.loadDir('./scripts');

bot.start().then(() => {
  bot.http.listen(config.PORT);
});
