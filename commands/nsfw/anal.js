const utils = require('../../functions');

module.exports = {
	name: 'anal',
	description: 'Give a user anal',
	args: true,
<<<<<<< HEAD
	execute(message, args, bot){
=======
	execute(message, args){
>>>>>>> 80ceae82d891c9658ab79d5b26e362f81de00e59
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		var dir = '../../images/anal/';
		message.channel.send(utils.buildEmbed({title: 'Oral', msg: `${message.author} gives ${args} oral.`, image: utils.getFile(dir)}));
	},
};