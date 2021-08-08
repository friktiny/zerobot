const utils = require('../../functions');

module.exports = {
	name: 'leaderboard',
	description: 'Show the points leaderboard',
	args: true,
	category: "Economy",
	aliases: ['leaders','top10'],
	utilisation: '{prefix}leaderboard',
	execute(message, args, bot){
		const filtered = bot.client.profile.filter( p => p.guild === message.guild.id ).array();
		const sorted = filtered.sort((a, b) => b.points - a.points);
		
		const top10 = sorted.splice(0, 10);
		var fields = [];
		for(const data of top10){
			try{
				fields.push(bot.client.users.cache.get(data.user).tag, `${data.points} points (level ${data.level})`);
			}catch{
				fields.push(`<@${data.user}>`, `${data.points} points (level ${data.level})`);
			}
		}
		
		message.channel.send({
			embed: {
				title: "Leaderboard",
				description: "Our top 10 points leaders!",
				fields: fields,
				color: 0x00AE86,
				author: bot.client.user.username,
				fields: fields
			}
		});
	},
};