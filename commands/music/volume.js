module.exports = {
	name: 'volume',
	description: 'Change the volume.',
	category: "Music",
	aliases: [],
	utilisation: '{prefix}volume [1-100]',
	execute(message, args, bot){
		if (!message.member.voice.channel) return message.channel.send(`${bot.config.emotes.error} - You're not in a voice channel !`);
		
		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${bot.config.emotes.error} - You are not in the same voice channel !`);
		
		if (!bot.client.player.getQueue(message)) return message.channel.send(`${bot.config.emotes.error} - No music currently playing !`);
		
		if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') return message.channel.send(`${bot.config.emotes.error} - Please enter a valid number !`);
		
		if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) return message.channel.send(`${bot.config.emotes.error} - Please enter a valid number (between 1 and 100) !`);
		
		const success = bot.client.player.setVolume(message, parseInt(args[0]));
		if (success) message.channel.send(`${bot.config.emotes.success} - Volume set to **${parseInt(args[0])}%** !`); 
	},
};