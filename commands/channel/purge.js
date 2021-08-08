const {Permissions} = require('discord.js');

module.exports = {
	name: 'purge',
	description: 'Purge the channel',
	args: true,
	category: "Channel",
	aliases: [],
	utilisation: '{prefix}purge (amount)',
	execute(message, args, bot){
		if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNEL)) {
			return message.delete({timeout:100}), message.channel.send(`You do not have permission to do this.`);
		}else{
			if(!args[0] || isNaN(args[0]) || args[0] < 1 || args[0] > 1000){
				return message.delete({timeout:100}), message.channel.send(`You must provide a number between 1 and 1000`);
			}
			message.delete({timeout:100});

			let remainder = args[0] % 100;
			let numOfTimes = (args[0] - remainder) / 100;
			try{
				for(i = 0; i < numOfTimes; i++){
					message.channel.bulkDelete(100);
				}
				message.channel.bulkDelete(remainder);
			}catch(err){
				bot.log(`The purge command ran by ${message.author.tag} in #${message.channel.name} failed to execute. Error: ${err}`);
				return message.channel.send(`**Execution error**\nThe \`purge\` command ran by ${message.author} in ${message.channel} failed to execute.\nError: \`${err}\``);	
			}
			if(args[0] === "1"){
				setTimeout(() => { 
					message.channel.send(`Purged ${args[0]} message.`).then(sentMessage => sentMessage.delete({ timeout: 4000}));
				}, 1000);
			}else{
				setTimeout(() => {
					message.channel.send(`Purged ${args[0]} messages.`).then(sentMessage => sentMessage.delete({ timeout: 4000}));
				}, 1000)
			}
		}
	},
};