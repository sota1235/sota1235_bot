/**
 * @fileoverview Sample for slackbot.
 */

module.exports = slackbot => {
  slackbot.hear(/echo (.+)/, msg => {
    console.log(msg);
    msg.send(msg.match[1]);
  });

  slackbot.respond(/echo (.+)/, msg => {
    console.log(msg);
    slackbot.send(msg.match[1]);
  });
};
