const utils = require('../../functions');
const ms = require("pretty-ms");

module.exports = {
	name: 'beg',
	description: 'Beg for points',
	args: true,
	category: "Economy",
	aliases: [],
	utilisation: '{prefix}beg',
	execute(message, args, bot){
		var beg = bot.client.profile.get(bot.user.key, "beg");
		var points = bot.client.profile.get(bot.user.key, "points");
		
		var guild = bot.client.guilds.cache.get(bot.server);
		
		var targets = [];
		const list = guild.members;
		console.log(list);
		for(var i = 0; i < list.length; i++){
			targets.push(list[i]);
		}
		
		let timeout = 180000;
		let amount = Math.floor(Math.random() * 50) + 10;
		
		if(beg !== null && timeout - (Date.now() - beg) > 0){
			let time = ms(timeout - (Date.now() - beg));
			
			message.channel.send({
				embed: {
					color: "#FFFFFF",
					description: '<'+bot.config.emotes.error>+' You have already begged recently\n\nBeg again in '+time
				}
			});
		}else{
			bot.client.profile.set(bot.user.key, points+amount, "points");
			bot.client.profile.set(bot.user.key, Date.now(), "beg");
			
			message.channel.send({
				embed: {
					color: "#FFFFFF",
					description: '<'+bot.config.emotes.success+'> **'+targets[Math.floor(Math.random() * targets.length)]+'** donated you '+amount+' points!'
				}
			});
		}
	},
};