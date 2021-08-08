module.exports = {
	name: 'ready',
	once: true,
	execute(bot, client){
		console.log(bot);
		console.log(`Logged in as: ${bot.client.user.tag} (id: ${bot.client.user.id})`);
		client.user.setPresence({
			status: 'available',
			activity: {
				name: `${bot.config.prefix}help`,
				type: 'WATCHING',
			}
		});
	}
};