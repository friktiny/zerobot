const figlet = require('figlet');
const utils = require('../../functions');

module.exports = {
	name: 'dm',
	description: 'DM a user',
	args: true,
	category: "User",
	aliases: ["pm"],
	utilisation: '{prefix}dm [user] [text]',
	execute(message, args, bot){
		if(!message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES")) return;
		
		let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if(!user) return message.channel.send(`You did not mention a user, or you gave an invalid id`);
		if(!args.slice(1).join(" ")) return message.channel.send("You did not specify your message");
		
		user.user.send(args.slice(1).join(" "))
			.catch(() => message.channel.send("That user could not be DMed!"))
			.then(() => message.channel.send(`Sent a message to ${user.user.tag}`));
	},
};