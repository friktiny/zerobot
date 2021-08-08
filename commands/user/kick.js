const utils = require('../../functions');

module.exports = {
	name: 'kick',
	description: 'Kick a user',
	args: true,
	category: "User",
	aliases: [],
	utilisation: '{prefix}kick [user] <reason>',
	execute(message, args, bot){
		try{
			if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("**You Do Not Have Permissions To Kick Members! - [KICK_MEMBERS]**");
			if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("**I Do Not Have Permissions To Kick Members! - [KICK_MEMBERS]**");
			if (!args[0]) return message.channel.send('**Enter A User To Kick!**');
			
			var kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
			
			if(!kickMember) return message.channel.send("**User Is Not In The Guild!**");
			if(kickMember.id === message.member.id) return message.channel.send("**You Cannot Kick Yourself!**");
			if(!kickMember.kickable) return message.channel.send("**Cannot Kick This User!**");
			if(kickMember.user.bot) return message.channel.send("**Cannot Kick A Bot!**");
			
			var reason = args.slice(1).join(" ");
			
			try{
				var embed = {
					color: "RED",
					description: `**You Have Been Kicked From ${message.guild.name} for - ${reason || "No Reason!"}**`,
					footer: message.guild.name
				};
				
				kickMember.send(utils.buildEmbed(embed)).then(() => kickMember.kick()).catch(() => null);
			}catch{
				kickMember.kick()
			}
			
			if(reason){
				var sembed = {
					color: "GREEN",
					description: `**${kickMember.user.username}** has been kicked for ${reason}`
				};
				message.channel.send(utils.buildEmbed(sembed));
			}else{
				var sembed2 = {
					color: "GREEN",
					description: `**${kickMember.user.username}** has been kicked`,
				};
				message.channel.send(utils.buildEmbed(sembed2));
			}
			
			let channel = bot.db.fetch(`modlog_${message.guild.id}`);
			if(!channel) return;
			var embed = {
				author: `${message.guild.name} Modlogs`,
				color: "#ff0000",
				thumbnail: kickMember.user.displayAvatarURL({ dynamic: true }),
				footer: message.guild.name,
				extras: [
					{name: "**Moderation**", value: "kick"},
					{name: "**User Kicked**", value: kickMember.user.username},
					{name: "**Kicked By**", value: message.author.username},
					{name: "**Reason**", value: `${reason || "**No Reason**"}`},
					{name: "**Date**", value: message.createdAt.toLocaleString()}
				]
			};
			
			var sChannel = message.guild.channels.cache.get(channel);
			if(!sChannel) return;
			sChannel.send(utils.buildEmbed(embed));
		}catch(e){
			return message.channel.send(`**${e.message}**`);
		}
	},
};