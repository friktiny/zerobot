const utils = require('../../functions');
const canvas = require("canvas");
const d = require("../../dialog");
const dialog = new d();
const { resolve, join } = require("path");
const axios = require('axios').default;

module.exports = {
	name: 'profile',
	description: 'View a user profile.',
	args: true,
	category: "Economy",
	aliases: ['balance','bal'],
	utilisation: '{prefix}profile [user]',
	execute(message, args, bot){
		var member, key, uid;
		const target = message.mentions.users.first() || message.author;
		
		if(!target.id){
			uid = message.author.id;
			key = bot.user.key;
		}else{
			uid = target.id;
			key = `${bot.server}-${target.id}`;
		}
		
		const userData = bot.client.profile.get(key);
		
		let user = bot.client.users.fetch(uid);
		user.then(function(result){
			var avatar = result.displayAvatarURL({format: 'jpg'});
			
			try{
				const response = axios.get(avatar,  { responseType: 'arraybuffer' });
				response.then(data => {
					var avatar = new canvas.Image();
					avatar.src = Buffer.from(data.data, "utf-8");
					
					const name = result.username.length > 20 ? result.username.substring(0, 17) + "..." : result.username;
					
					var color, nameStr;
					if(userData.bronze){
						color = "#cd7f32";
						nameStr = name + " **Bronze VIP**";
					}else if(userData.silver){
						color = "#C0C0C0";
						nameStr = name = " **Silver VIP**";
					}else if(userData.gold){
						color = "#D4AF37";
						nameStr = name = " **Gold VIP**";
					}else{
						color = "#7289DA";
						nameStr = name;
					}
					
					var profile = dialog.profile(color, avatar, nameStr, userData);
				
					const filename = `profile-${key}.jpg`;
					const attachment = new bot._D.MessageAttachment(profile, filename);
					message.channel.send(attachment);
				});
			}catch(error){
				message.channel.send(`Something happened: ${error.message}`);
			}
		});
	},
};
