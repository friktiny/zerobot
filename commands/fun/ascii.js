const figlet = require('figlet');
const utils = require('../../functions');

module.exports = {
	name: 'ascii',
	description: 'ASCII text',
	args: true,
	category: "Fun",
	aliases: [],
	utilisation: '{prefix}ascii [text]',
	execute(message, args, bot){
		var text = args.join(" ");
		figlet(text, function(err, data){
			message.channel.send(data, {
				code: 'AsciiArt'
			});
		});
	},
};