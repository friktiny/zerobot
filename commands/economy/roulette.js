const utils = require('../../functions');
const ms = require("pretty-ms");

module.exports = {
	name: 'roulette',
	description: 'Play roulette for points',
	args: true,
	category: "Economy",
	aliases: [],
	utilisation: '{prefix}roulette <color> <bet>',
	execute(message, args, bot){
		var roulette = bot.client.profile.get(bot.user.key, "roulette");
		var points = bot.client.profile.get(bot.user.key, "points");
		
		let timeout = 180000;
		let amount = Math.floor(Math.random() * 50) + 10;
		
		if(roulette !== null && timeout - (Date.now() - roulette) > 0){
			let time = ms(timeout - (Date.now() - roulette));
			
			message.channel.send({
				embed: {
					color: "#FFFFFF",
					description: '<'+bot.config.emotes.error+'> You have already played roulette recently\n\nPlay again in '+time
				}
			});
		}else{
			let colour = args[0];
			var bet = parseInt(args[1]);
			
			let random = Math.floor(Math.random() * 37);
			
			if(!color){
				return message.channel.send({
					embed: {
						color: "#FFFFFF",
						description: '<'+bot.config.emotes.error*'> Specify a color | Red [1.5x] Black [2x] Green [15x]'
					}
				});
			}
			
			if(!bet){
				return message.channel.send({
					embed: {
						color: "#FFFFFF",
						description: '<'+bot.config.emotes.error*'> Specify an amount!'
					}
				});
			}
			
			if(bet > points){
				return message.channel.send({
					embed: {
						color: "#FFFFFF",
						description: '<'+bot.config.emotes.error*'> You are betting more than you have!'
					}
				});
			}
			
			if (colour == "b" || colour.includes("black")) colour = 0;
			else if (colour == "r" || colour.includes("red")) colour = 1;
			else if (colour == "g" || colour.includes("green")) colour = 2;
			else return message.channel.send({
				embed: {
					color: "#FFFFFF",
					description: '<'+bot.config.emotes.error*'> Specify a color | Red [1.5x] Black [2x] Green [15x]'
				}
			});
			
			bot.client.profile.set(bot.user.key, Date.now(), "roulette");
			var msg;
			
			if(random == 0 && colour == 2){ // Green
        bet *= 15;
        msg = `<:Green:618767721361833995> You won ${bet} points\n\nMultiplier: 15x`;
			}else if(isOdd(random) && colour == 1){ // Red
					bet = parseInt(bet * 1.5);
					msg = `<:Red:618767705444450342> You won ${bet} points\n\nMultiplier: 1.5x`;
			}else if(!isOdd(random) && colour == 0){ // Black
					bet = parseInt(bet * 2);
					msg = `<:Black:618767682996666408> You won ${bet} points\n\nMultiplier: 2x`;
			}else{ // Wrong
					bet = points-bet;
					msg = '<'+bot.config.emotes.error+' You lost '+bet+' points'
			}
			bot.client.profile.set(bot.user.key, bet, "points");
			bot.client.profile.set(bot.user.key, Date.now(), "roulette");
			
			message.channel.send({
				embed: {
					color: "#FFFFFF",
					description: msg
				}
			});
		}
	},
};