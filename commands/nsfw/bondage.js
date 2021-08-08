const utils = require('../../functions');

module.exports = {
	name: 'bondage',
	description: 'Put someone in bondage',
	args: true,
	category: "NSFW",
	aliases: [],
	utilisation: '{prefix}bondage <@user>',
	execute(message, args, bot){
		if (!message.channel.nsfw) {
            message.channel.send("This command is only allowed in NSFW channels.");
        }
		
		var dir = "images/bdsm/";
		
		message.channel.send(utils.buildEmbed({title: 'Bondage', msg: `${message.author} here's your porn!`, image: utils.getFile(dir)}));
	},
};