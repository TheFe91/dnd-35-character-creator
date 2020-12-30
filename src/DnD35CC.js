import Discord from 'discord.js';
import { incomingMessageCallback, log } from './Utils';

const token = process.env.BOT_TOKEN;
const bot = new Discord.Client();

bot.login(token).then(null);

bot.on('ready', () => {
  log('Logged in as D&D 3.5 Character Creator');
});

bot.on('message', (message) => {
  if (!message.author.bot) {
    log(`${message.author.username} says: ${message.content.toLowerCase().trim()}`);
  }
  incomingMessageCallback(message);
});
