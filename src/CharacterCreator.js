import Discord from 'discord.js';
import { incomingMessageCallback, log } from './Utils';

const token = process.env.BOT_TOKEN;
const bot = new Discord.Client();

bot.login(token).then(null);

bot.on('ready', () => {
  log('Logged in as D&D 3.5 Character Creator');
});

bot.on('message', (message) => {
  const { author: { id: authorId, bot: isBot, username }, content, channel: { guild: isGuild } } = message;

  if (bot.user.id === authorId) {
    return;
  }

  if (!isGuild) {
    if (!isBot) {
      log(`${username} says: ${content.toLowerCase().trim()}`);
    }
    incomingMessageCallback(message);
  } else {
    const { user: { id: botId } } = bot;
    const { mentions: { users } } = message;
    const isBotMentioned = users.has(botId);

    if (isBotMentioned) {
      incomingMessageCallback(message);
    }
  }
});
