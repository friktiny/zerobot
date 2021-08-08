const utils = require('../../functions');
const deaths = require('../../data/kills.json')["kills"];

module.exports = {
	name: 'kill',
	description: 'Kill a user',
	args: true,
	category: "Fun",
	aliases: [],
	utilisation: '{prefix}kill user',
	execute(message, args, bot){
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		var death = deaths[Math.floor(Math.random() * deaths.length)];
		
		const user = message.mentions.users.first();
		var str = death.format(message.author.username, user.username);
		
		message.channel.send(utils.buildEmbed({title: 'Kill', msg: str}));
	},
};