const utils = require('../../functions');

module.exports = {
	name: 'unban',
	description: 'Unbanish a user',
	args: true,
	category: "User",
	aliases: ["unbanish"],
	utilisation: '{prefix}unban <@user> [reason]',
	execute(message, args, bot){
		if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**You Dont Have The Permissions To Unban Someone! - [BAN_MEMBERS]**");
		if(!args[0]) return message.channel.send("**Please Enter A Name!**");
		
		let bannedMemberInfo = message.guild.fetchBans();
		let bannedMember;
		bannedMember = bannedMemberInfo.find(b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || bannedMemberInfo.get(args[0]) || bannedMemberInfo.find(bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase());
		
		if(!bannedMember) return message.channel.send("**Please Provide A Valid Username, Tag Or ID Or The User Is Not Banned!**");
		
		let reason = args.slice(1).join(" ");
		
		if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("**I Don't Have Permissions To Unban Someone! - [BAN_MEMBERS]**");
		
		try{
			if(reason){
				message.guild.members.unban(bannedMember.user.id, reason);
				var embed = {
					color: "GREEN",
					description: `**${bannedMember.user.tag} has been unbanned for ${reason}**`
				};
				
				message.channel.send(utils.buildEmbed(sembed));
			}else{
				message.guild.members.unban(bannedMember.user.id, reason);
				var embed = {
					color: "GREEN",
					description: `**${bannedMember.user.tag} has been unbanned**`
				};
				message.channel.send(utils.buildEmbed(embed));
			}
		}catch{ }
			
			let channel = bot.db.fetch(`modlog_${message.guild.id}`);
			if(!channel) return;
			
			let embed2 = {
				color: '#ff0000',
				author: `${message.guild.name} Modlogs`,
				thumbnail: bannedMember.user.displayAvatarURL({ dynamic: true }),
				extras: [
					{name: "**Moderation**", value: "unban"},
					{name: "**Unbanned**", value: `${bannedMember.user.username}`},
					{nane: "**ID**", value: `${bannedMember.user.id}`},
					{name: "**Moderator**", value: message.author.username},
					{name: "**Reason**", value: `${reason}` || "**No Reason**"},
					{name: "**Date**", value: message.createdAt.toLocaleString()},
				],
				footer: message.guild.name,
			};
			
			var sChannel = message.guild.channels.cache.get(channel);
			if (!sChannel) return;
			sChannel.send(utils.buildEmbed(embed2));
	},
};