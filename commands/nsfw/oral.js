const utils = require('../../functions');

module.exports = {
	name: 'oral',
	description: 'Give a user oral',
	args: true,
	execute(message, args, bot){
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		var dir = '../../images/oral/';
		message.channel.send(utils.buildEmbed({title: 'Oral', msg: `${message.author} gives ${args} oral.`, image: utils.getFile(dir)}));
	},
};