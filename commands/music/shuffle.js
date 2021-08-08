module.exports = {
	name: 'shuffle',
	description: 'Shuffle the queue.',
	category: 'Music',
	aliases: [],
	utilisation: '{prefix}shuffle',
	execute(message, args, bot){
		if (!message.member.voice.channel) return message.channel.send(`${bot.config.emotes.error} - You're not in a voice channel !`);
		
		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${bot.config.emotes.error} - You are not in the same voice channel !`);
		
		if (!bot.client.player.getQueue(message)) return message.channel.send(`${bot.config.emotes.error} - No music currently playing !`);
		
		const success = bot.client.player.shuffle(message);
		
		if (success) message.channel.send(`${bot.config.emotes.success} - Queue shuffled **${bot.client.player.getQueue(message).tracks.length}** song(s) !`);
	},
};