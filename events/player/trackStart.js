module.exports = (bot, message, track) => {
    message.channel.send(`${bot.config.emotes.music} - Now playing ${track.title} into ${message.member.voice.channel.name} ...`);
};