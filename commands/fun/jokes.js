const olj = require('one-liner-joke');
const utils = require('../../functions');

module.exports = {
	name: 'jokes',
	description: 'More jokes!',
	args: true,
	category: "Fun",
	aliases: [],
	utilisation: '{prefix}jokes',
	execute(message, args, bot){
		var joke = olj.getRandomJoke({
			'exclude_tags': []
		});
		return message.channel.send(utils.buildEmbed({title: `Random joke`, msg: joke.body}));
	},
};