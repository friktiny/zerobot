const utils = require('../../functions');
const ms = require("pretty-ms");
const slotItems = ["<:Grape:618765748940177421>", "<:Watermelon:618765904318038027>", "<:Orange:618765805596835880>", "<:Apple:618765871862513695>", "<:7_:618765717499805706>", "<:Strawberry:618765828929617930>", "<:Cherry:618765778094784513>"];

module.exports = {
	name: 'slots',
	description: 'Play slots for points',
	args: true,
	category: "Economy",
	aliases: [],
	utilisation: '{prefix}slots <bet>',
	execute(message, args, bot){
		var slots = bot.client.profile.get(bot.user.key, "slots");
		var points = bot.client.profile.get(bot.user.key, "points");
		
		let timeout = 180000;
		let amount = Math.floor(Math.random() * 50) + 10;
		
		if(slots !== null && timeout - (Date.now() - slots) > 0){
			let time = ms(timeout - (Date.now() - slots));
			
			message.channel.send({
				embed: {
					color: "#FFFFFF",
					description: '<'+bot.config.emotes.error+'> You have already played the slots recently\n\nPlay again in '+time
				}
			});
		}else{
			var bet = parseInt(args[0]);
			var win = false;
			
			if(!bet){
				return message.channel.send({
					embed: {
						color: "#FFFFFF",
						description: '<'+bot.config.emotes.error+'> Specify an amount!'
					}
				});
			}
			
			if(bet > points){
				return message.channel.send({
					embed: {
						color: "#FFFFFF",
						description: '<'+bot.config.emotes.error+'> You are betting more than you have!'
					}
				});
			}
			
			let number = []
			for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

			if(number[0] == number[1] && number[1] == number[2]){ 
					bet *= 9
					win = true;
			}else if(number[0] == number[1] || number[0] == number[2] || number[1] == number[2]){ 
					bet *= 2
					win = true;
			}
			
			if(win){
				bot.client.profile.set(bot.user.key, points+bet, "points");
				bot.client.profile.set(bot.user.key, Date.now(), "slots");
				message.channel.send({
					embed: {
						color: "#FFFFFF",
						description: `${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou won ${bet} points!`
					}
				});
			}else{
				bot.client.profile.set(bot.user.key, points-bet, "points");
				bot.client.profile.set(bot.user.key, Date.now(), "slots");
				message.channel.send({
					embed: {
						color: "#FFFFFF",
						description: `${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou lost ${bet} points`
					}
				});
			}
		}
	},
};