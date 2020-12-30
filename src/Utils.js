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
HELP HERE
    `,
  );
};

const dispatchBotCommand = (channel, content) => {
  const parts = content.split(' ');
  const command = parts[0];
  switch (command) {
    case '!help':
      printActions(channel);
      break;
    default:
      break;
  }
};

const incomingMessageCallback = (message) => {
  if (message.author.bot) {
    return;
  }

  const { channel } = message;
  const content = message.content.toLowerCase().trim();

  dispatchBotCommand(channel, content);
};

export {
  incomingMessageCallback,
  log,
};
