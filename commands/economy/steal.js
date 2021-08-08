const utils = require('../../functions');
const ms = require("pretty-ms");

module.exports = {
	name: 'steal',
	description: 'Steal some points',
	args: true,
	category: "Economy",
	aliases: [],
	utilisation: '{prefix}steal',
	execute(message, args, bot){
		var steal = bot.client.profile.get(bot.user.key, "steal");
		var points = bot.client.profile.get(bot.user.key, "points");
		
		var difficulty = Math.ceil(Math.random()*100);
		var diceRoll = Math.ceil(Math.random()*100);
		
		if(diceRoll > difficulty){
			return message.channel.send({
				embed: {
					color: "#FFFFFF",
					description: '<'+bot.config.emotes.error+'> You almost got busted! You could not steal any points...'
				}
			});
		}
		
		let timeout = 180000;
		let amount = Math.floor(Math.random() * 50) + 10;
		
		if(steal !== null && timeout - (Date.now() - steal) > 0){
			let time = ms(timeout - (Date.now() - steal));
			
			message.channel.send({
				embed: {
					color: "#FFFFFF",
					description: '<'+bot.config.emotes.error+'> You have already stolen recently\n\nSteal again in '+time
				}
			});
		}else{
			bot.client.profile.set(bot.user.key, points+amount, "points");
			bot.client.profile.set(bot.user.key, Date.now(), "steal");
			
			message.channel.send({
				embed: {
					color: "#FFFFFF",
					description: '<'+bot.config.emotes.success+'> You stole '+amount*' points!'
				}
			});
		}
	},
};