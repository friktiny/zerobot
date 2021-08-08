module.exports = {
	name: 'nowplaying',
	description: 'Currently playing.',
	category: "Music",
	aliases: [],
	utilisation: '{prefix}nowplaying',
	execute(message, args, bot){
		if (!message.member.voice.channel) return message.channel.send(`${bot.config.emotes.error} - You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`);

        if (!bot.client.player.getQueue(message)) return message.channel.send(`${bot.config.emotes.error} - No music currently playing !`);

        const track = bot.client.player.nowPlaying(message);
        const filters = [];

        Object.keys(bot.client.player.getQueue(message).filters).forEach((filterName) => bot.client.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;

        message.channel.send({
            embed: {
                color: 'RED',
                author: { name: track.title },
                footer: { text: 'D347hB07' },
                fields: [
                    { name: 'Channel', value: track.author, inline: true },
                    { name: 'Requested by', value: track.requestedBy.username, inline: true },
                    { name: 'From playlist', value: track.fromPlaylist ? 'Yes' : 'No', inline: true },

                    { name: 'Views', value: track.views, inline: true },
                    { name: 'Duration', value: track.duration, inline: true },
                    { name: 'Filters activated', value: filters.length + '/' + bot.client.filters.length, inline: true },

                    { name: 'Volume', value: bot.client.player.getQueue(message).volume, inline: true },
                    { name: 'Repeat mode', value: bot.client.player.getQueue(message).repeatMode ? 'Yes' : 'No', inline: true },
                    { name: 'Currently paused', value: bot.client.player.getQueue(message).paused ? 'Yes' : 'No', inline: true },

                    { name: 'Progress bar', value: bot.client.player.createProgressBar(message, { timecodes: true }), inline: true }
                ],
                thumbnail: { url: track.thumbnail },
                timestamp: new Date(),
            },
        });
	},
};