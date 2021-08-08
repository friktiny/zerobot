const utils = require('../../functions');

module.exports = {
	name: 'ban',
	description: 'Banish a user',
	args: true,
	category: "User",
	aliases: ["banish"],
	utilisation: '{prefix}ban [@user] <reason>',
	execute(message, args, bot){
		try{
			if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**You Dont Have The Permissions To Ban Users! - [BAN_MEMBERS]**");
			if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("**I Dont Have The Permissions To Ban Users! - [BAN_MEMBERS]**");
			if(!args[0]) return message.channel.send("**Please Provide A User To Ban!**")
			
			let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
			
			if(!banMember) return message.channel.send("**User Is Not In The Guild**");
			
			if(banMember === message.member) return message.channel.send("**You Cannot Ban Yourself**")
			
			var reason = args.slice(1).join(" ");
			
			if(!banMember.bannable) return message.channel.send("**Cant Kick That User**");
			
			try{
				message.guild.members.ban(banMember);
				banMember.send(`**Hello, You Have Been Banned From ${message.guild.name} for - ${reason || "No Reason"}**`).catch(() => null)
			}catch{
				message.guild.members.ban(banMember);
			}
			
			if(reason){
				var embed = {
					color: "GREEN",
					description: `**${banMember.user.username}** has been banned for ${reason}`
				};
				message.channel.send(utils.buildEmbed(embed));
			}else{
				var embed = {
					color: "GREEN",
					description: `**${banMember.user.username}** has been banned`
				};
				message.channel.send(utils.buldEmbed(embed));
			}
			
			let channel = bot.db.fetch(`modlog_${message.guild.id}`);
			if(channel == null) return;
			if(!channel) return;
			
			var embed = {
				author: `${message.guild.name} Modlogs`,
				color: "#ff0000",
				thumbnail: banMember.user.displayAvatarURL({ dynamic: true }),
				footer: message.guild.name,
				extras: [
					{name: "**Moderation**", value: "ban"},
					{name: "**Banned**", value: banMember.user.username},
					{name: "**ID**", value: `${banMember.id}`},
					{name: "**Banned By**", value: message.author.username},
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