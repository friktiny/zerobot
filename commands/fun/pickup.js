const utils = require('../../functions');
const lines = require('../../data/pickups.json')["pickups"];

module.exports = {
	name: 'pickup',
	description: 'Pickup a user',
	args: true,
	category: "Fun",
	aliases: [],
	utilisation: '{prefix}pickup user',
	execute(message, args, bot){
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		var line = lines[Math.floor(Math.random() * lines.length)];
		
		const user = message.mentions.users.first();
		var str = line.format(message.author.username, user.username);
		
		message.channel.send(utils.buildEmbed({title: 'Pickup', msg: str}));
	},
};