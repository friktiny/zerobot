module.exports = (bot, message, query, tracks) => {
    message.channel.send(`${bot.config.emotes.error} - You did not provide a valid response ... Please send the command again !`);
};