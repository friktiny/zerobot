const utils = require('../../functions');
const ms = require("pretty-ms");

module.exports = {
	name: 'weekly',
	description: 'Get weekly points.',
	args: true,
	category: "Economy",
	aliases: [],
	utilisation: '{prefix}weekly',
	execute(message, args, bot){
		var weekly = bot.client.profile.get(bot.user.key, "weekly");
		var points = bot.client.profile.get(bot.user.key, "points");
	
		let timeout = 604800000;
		let amount = 500;
		var msg;

		if(weekly !== null && timeout - (Date.now() - weekly) > 0){
			let time = ms(timeout - (Date.now() - weekly), {verbose: true});
			
			msg = '<'+bot.config.emotes.error+'> You have already collected your weekly reward\n\nCollect it again in '+time;
		}else{
			msg = '<'+bot.config.emotes.success+'> You have collected your weekly reward of '+amount+' points';
			bot.client.profile.set(bot.user.key, Date.now(), "weekly");
			bot.client.profile.set(bot.uer.key, points+amount, "points");
		}
		message.channel.send(utils.buildEmbed({title: 'Weekly Check-In', msg: msg}));
	},
};