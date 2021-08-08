const utils = require('../../functions');
const insults = require('../../data/insults.json')["insults"];

module.exports = {
	name: 'insult',
	description: 'Insult a user',
	args: true,
	category: "Fun",
	aliases: [],
	utilisation: '{prefix}insult user',
	execute(message, args, bot){
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		var insult = insults[Math.floor(Math.random() * insults.length)];
		
		message.channel.send(utils.buildEmbed({title: 'Insult', msg: `${args}${insult}`}));
	},
};