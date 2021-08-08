module.exports = (bot, error, message, ...args) => {
    switch (error) {
        case 'NotPlaying':
            message.channel.send(`${bot.config.emotes.error} - There is no music being played on this server !`);
            break;
        case 'NotConnected':
            message.channel.send(`${bot.config.emotes.error} - You are not connected in any voice channel !`);
            break;
        case 'UnableToJoin':
            message.channel.send(`${bot.config.emotes.error} - I am not able to join your voice channel, please check my permissions !`);
            break;
        case 'VideoUnavailable':
            message.channel.send(`${bot.config.emotes.error} - ${args[0].title} is not available in your country! Skipping...`);
            break;
        case 'MusicStarting':
            message.channel.send(`The music is starting... please wait and retry!`);
            break;
        default:
            message.channel.send(`${bot.config.emotes.error} - Something went wrong ... Error : ${error}`);
    };
};
