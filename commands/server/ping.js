module.exports = {
	name: 'ping',
	description: 'Ping the server',
	args: true,
	category: "Server",
	aliases: [],
	utilisation: '{prefix}ping',
	execute(message, args, bot){
		message.channel.send(`🏓 Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(bot.client.ws.ping)}ms`);
	},
};
