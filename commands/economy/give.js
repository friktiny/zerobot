const utils = require('../../functions');

module.exports = {
	name: 'give',
	description: 'Give someone points',
	args: true,
	category: "Economy",
	aliases: [],
	utilisation: '{prefix}give',
	execute(message, args, bot){
		const user = message.mentions.users.first() || bot.client.users.get(args[0]);
    if(!user) return message.reply("You must mention someone!");

    const pointsToAdd = parseInt(args[1], 10);
    
    const giver = message.author.id;
    let giverPoints = bot.client.profile.get(`${message.guild.id}-${giver}`, "points");
    if(!pointsToAdd){
      return message.reply("You didn't tell me how many points to give...");
		}
		
		if(pointsToAdd > giverPoints){
			return message.reply("You don't have enough points to do that.");
		}

    bot.client.profile.ensure(`${message.guild.id}-${user.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 1,
      daily: 0,
      weekly: 0,
      work: 0,
      steal: 0,
      give: 0,
      slots: 0,
      roulette: 0,
      items: [],
      verified: 0
    });
    
    bot.client.profile.set(`${message.guild.id}-${giver}`, giverPoints-pointsToAdd, "points");

    let userPoints = bot.client.profile.get(`${message.guild.id}-${user.id}`, "points");
    userPoints += pointsToAdd;
    
    bot.client.profile.set(`${message.guild.id}-${user.id}`, userPoints, "points")

    message.channel.send(`${user.tag} has received **${pointsToAdd}** points and now stands at **${userPoints}** points.`);
	},
};