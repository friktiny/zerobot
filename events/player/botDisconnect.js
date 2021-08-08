module.exports = (bot, message, queue) => {
    message.channel.send(`${bot.config.emotes.error} - Music stopped as i have been disconnected from the channel !`);
};