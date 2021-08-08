module.exports = (bot, message, queue, playlist) => {
    message.channel.send(`${bot.config.emotes.music} - ${playlist.title} has been added to the queue (**${playlist.tracks.length}** songs) !`);
};