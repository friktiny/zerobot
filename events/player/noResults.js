module.exports = (bot, message, query) => {
    message.channel.send(`${bot.config.emotes.error} - No results found on YouTube for ${query} !`);
};