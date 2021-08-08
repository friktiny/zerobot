module.exports = {
	name: 'search',
	description: 'Add a song to queue',
	category: 'Music',
	aliases: [],
	utilisation: '{prefix}search [name/URL]',
	execute(message, args, bot){
		if (!message.member.voice.channel) return message.channel.send(`${bot.config.emotes.error} - You're not in a voice channel !`);
		 
		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${bot.config.emotes.error} - You are not in the same voice channel !`);
		
		if (!args[0]) return message.channel.send(`${bot.config.emotes.error} - Please indicate the title of a song !`);
		
		bot.client.player.play(message, args.join(" "));
	},
};