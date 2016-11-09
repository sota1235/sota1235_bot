/**
 * @fileoverview Sample for slackbot.
 */

module.exports = slackbot => {
  slackbot.respond(/echo (.+)/, msg => {
    slackbot.send(msg.match[1]);
  });
};
