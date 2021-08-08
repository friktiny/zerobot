const utils = require('../../functions');

module.exports = {
	name: 'shop',
	description: 'Buy stuff with points!',
	args: true,
	category: "Economy",
	aliases: [],
	utilisation: '{prefix}shop <buy|sell [item]>',
	execute(message, args, bot){
		var error, cost, success;
		
		var user = bot.client.profile.get(bot.user.key);
		
		var points = user.points;
		if(!args.length){
			let items = Object.keys(bot.client.shop);
			let content = "";
  
			for(var i in items){
				content += `${bot.client.shop.items[i]} - ${bot.client.shop[items[i]].cost} points\n`
			}
			message.channel.send(utils.buildEmbed({title: 'Shop', msg: content}));
		}else{
			const action = args[0];
			switch(action){
				case 'sell':
					
				break;
				
				default:
				case 'buy':
					switch(args[1]){
						case 'gold':
							cost = 50000;
							if(points > cost){
								error = "<"+bot.config.emotes.error+"> You need "+cost+" points to purchase Gold VIP";
							}
							success = '<'+bot.config.emotes.success+'> Purchased Gold VIP For '+cost+' points';
						break;
						
						case 'silver':
							cost = 20000;
							if(points < cost){
								error = '<'+bot.config.emotes.error+'> You need '+cost+' points to purchase Silver VIP';
							}
							success = '<'+bot.config.emotes.success+'> Purchased Silver VIP For '+cost+' points';
						break;
						
						case 'bronze':
							cost = 5000;
							if(points < cost){
								error = '<'+bot.config.emotes.error+'> You need '+cost+' points to purchase Gold VIP';
							}
							success = '<'+bot.config.emotes.success+'> Purchased Bronze VIP For '+cost+' points';
						break;
					}
					
					if(error){
						return message.channel.send(utils.buildEmbed({title: 'Oooops!', msg: error}));
					}else{
						user.items.push(args[1]);
						user.points = points-cost;
						bot.client.profile.update(bot.user.key, user);
							message.channel.send(utils.buildEmbed({title: 'Shop - Buy', msg: success}));
					}
				break;
			}
		}
	},
};