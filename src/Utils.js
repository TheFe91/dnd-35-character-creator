import axios from 'axios';
import Discord from 'discord.js';
import FormData from 'form-data';

const getDateTime = (withDate, withTime, timeWithSeconds = false) => {
  const date = new Date();
  let toReturn = '';
  if (withDate) {
    toReturn += `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} `;
  }
  if (withTime) {
    toReturn += `${date.getHours()}:${date.getMinutes()}${timeWithSeconds ? `:${date.getSeconds()}` : ''}`;
  }

  return toReturn;
};

const log = (message) => console.log(`${getDateTime(true, true)} - ${message}`);

const printActions = (channel) => {
  channel.send(
    `
This bot will help you generate a character for a D&D 3.5 campaign
All you have to do is just type \`!newcharacter\` and follow the link that the bot will provide.
The character so created will be available for you within the Dungeons&Dragons Bot Suite
    `,
  );
};

const newCharacter = (channel) => {
  const formData = new FormData();
  formData.append('secret', process.env.BACKEND_TOKEN);
  axios({
    method: 'POST',
    url: `${process.env.SERVER_URL}/authenticate-bot`,
    data: formData,
    headers: formData.getHeaders(),
  })
    .then(({ data }) => {
      const { accessCode } = data;
      channel.send('Everything set up correctly!\nYou can generate your character by clicking the link below');
      const embed = new Discord.MessageEmbed()
        .setTitle('Create Character now')
        .setURL(process.env.SERVER_URL);
      channel.send(embed);
      channel.send(
        `
This is your password for saving the character:

${accessCode}

Please note that this is a one-time-password and will expire in 24 hours starting from now.
        `,
      );
    })
    .catch((error) => {
      console.error(error);
      channel.send('I\'m sorry! An error occurred while communicating with the backend');
    });
};

const dispatchBotCommand = (channel, content) => {
  const parts = content.split(' ');
  const command = parts[0];
  switch (command) {
    case '!help':
      printActions(channel);
      break;
    case '!newcharacter': {
      newCharacter(channel);
      break;
    }
    default:
      channel.send(`I'm sorry, but "**${command}**" is an ***undefined*** command. Please, try again`);
      break;
  }
};

const removeMentions = (message) => {
  const { mentions: { users } } = message;
  const mentions = Array.from(users.keys());

  let content = message.content.toLowerCase().trim();

  mentions.forEach((mention) => {
    content = content.replace(`<@!${mention}>`, '');
  });

  return content.trim();
};

const incomingMessageCallback = (message) => {
  const { channel } = message;
  const cleanedContent = removeMentions(message);

  dispatchBotCommand(channel, cleanedContent);
};

export {
  incomingMessageCallback,
  log,
};
