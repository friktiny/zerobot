const utils = require('../../functions');
const ms = require("pretty-ms");
const d = require("../../dialog");
const dialog = new d();

module.exports = {
	name: 'daily',
	description: 'Get daily points.',
	args: true,
	category: "Economy",
	aliases: [],
	utilisation: '{prefix}daily',
	execute(message, args, bot){
		var daily = bot.client.profile.get(bot.user.key, "daily");
		var points = bot.client.profile.get(bot.user.key, "points");
		
		let timeout = 86400000;
		let amount = 200;
		var msg;
		if(daily !== null && timeout - (Date.now() - daily) > 0){
			let time = ms(timeout - (Date.now() - daily), {verbose: true});
			
			msg = '<'+bot.config.emotes.error+'> You have already collected your daily reward\n\nCollect it again in '+time;
		}else{
			msg = '<'+bot.config.emotes.success+'> You have collected your daily reward of '+amount+' points!';
			bot.client.profile.set(bot.user.key, Date.now(), "daily");
			bot.client.profile.set(bot.user.key, points+amount, "points");
		}
		var msgDialog = dialog.dialog(msg);
		
		const filename = `msg-dialog.jpg`;
		const attachment = new bot._D.MessageAttachment(msgDialog, filename);
		message.channel.send(attachment);
	},
};
