const utils = require('../../functions');
const ms = require("pretty-ms");

module.exports = {
	name: 'work',
	description: 'Work to get coins.',
	args: true,
	category: "Economy",
	aliases: [],
	utilisation: '{prefix}work',
	execute(message, args, bot){
		var work = bot.client.profile.get(bot.user.key, "work");
		var points = bot.client.profile.get(bot.uer.key, "points");
		
		let timeout = 600000;
		var msg;
    
    if(work !== null && timeout - (Date.now() - author) > 0){
			let time = ms(timeout - (Date.now() - work), {verbose: true});
			
			msg = '<'+bot.config.emotes.error+'> You have already worked recently\n\nTry again in '+time;
		}else{
			let replies = ['Programmer','Builder','Waiter','Busboy','Chief','Mechanic']
			
			let result = Math.floor((Math.random() * replies.length));
			let amount = Math.floor(Math.random() * 80) + 1;
			msg = '<'+bot.config.emotes.success+'> You worked as a '+replies[result]+' and earned '+amount+' points';
			
			bot.client.profile.set(bot.user.key, Date.now(), "work");
			bot.client.profile.set(bot.user.key, points+amount, "points");
		}
		message.channel.send(utils.buildEmbed({title: 'Work', msg: msg}));
	},
};