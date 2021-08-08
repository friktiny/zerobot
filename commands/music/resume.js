module.exports = {
	name: 'resume',
	description: 'Resume a paused song.',
	category: 'Music',
	aliases: [],
	utilisation: '{prefix}resume',
	execute(message, args, bot){
		if (!message.member.voice.channel) return message.channel.send(`${bot.config.emotes.error} - You're not in a voice channel !`);
		
		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${bot.config.emotes.error} - You are not in the same voice channel !`);
		
		if (!bot.client.player.getQueue(message)) return message.channel.send(`${bot.config.emotes.error} - No music currently playing !`);
		
		if (!bot.client.player.getQueue(message).paused) return message.channel.send(`${bot.config.emotes.error} - The music is already playing !`);
		
		const success = bot.client.player.resume(message);
		
		if (success) message.channel.send(`${bot.config.emotes.success} - Song ${bot.client.player.getQueue(message).playing.title} resumed !`);
	},
};