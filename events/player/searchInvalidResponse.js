module.exports = (bot, message, query, tracks, content, collector) => {
    if (content === 'cancel') {
        collector.stop();
        return message.channel.send(`${bot.config.emotes.success} - The selection has been **cancelled** !`);
    } else message.channel.send(`${bot.config.emotes.error} - You must send a valid number between **1** and **${tracks.length}** !`);
};