const moment = require('moment');
const utils = require('../../functions');

const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
};

module.exports = {
	name: 'whois',
	description: 'Info about a user',
	args: true,
	category: "User",
	aliases: ["userinfo"],
	utilisation: '{prefix}whois <@user>',
	execute(message, args, bot){
		var permissions = [];
		var acknowledgements = 'None';
		
		let embed = {
			title: "**User Permission Error!**",
			description: "**Sorry, you don't have permissions to use this! ❌**"
		};
		
		if(!message.channel.permissionsFor(message.author).has("MANAGE_MESSAGES")) return message.channel.send(utils.buildEmbed(embed));
		
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
		
		if(member.hasPermission("KICK_MEMBERS")){
			permissions.push("Kick Members");
		}
		if(member.hasPermission("BAN_MEMBERS")){
			permissions.push("Ban Members");
		}
		if(member.hasPermission("ADMINISTRATOR")){
			permissions.push("Administrator");
		}
		if(member.hasPermission("MANAGE_MESSAGES")){
			permissions.push("Manage Messages");
		}
		if(member.hasPermission("MANAGE_CHANNELS")){
			permissions.push("Manage Channels");
		}
		if(member.hasPermission("MENTION_EVERYONE")){
			permissions.push("Mention Everyone");
		}
		if(member.hasPermission("MANAGE_NICKNAMES")){
			permissions.push("Manage Nicknames");
		}
		if(member.hasPermission("MANAGE_ROLES")){
			permissions.push("Manage Roles");
		}
		if(member.hasPermission("MANAGE_WEBHOOKS")){
			permissions.push("Manage Webhooks");
		}
		if(member.hasPermission("MANAGE_EMOJIS")){
			permissions.push("Manage Emojis");
		}
		if(permissions.length == 0){
			permissions.push("No Key Permissions Found");
		}
		if(member.user.id == message.guild.ownerID){
			acknowledgements = 'Server Owner';
		}
		
		message.channel.send({
			embed: {
				color: '#2F3136',
				author: `${member.user.tag}`,
				description: `<@${member.user.id}>`,
				footer: `ID: ${message.author.id}`,
				thumbnail: member.user.displayAvatarURL(),
				fields: [
					{name: "__Status__", value: `${status[member.user.presence.status]}`},
					{nane: '__Joined at__ ', value: `${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`},
					{name: '__Created On__', value: member.user.createdAt.toLocaleString()},
					{name: `__Roles [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]__`, value: `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "No Roles"}`},
					{name: "__Acknowledgements:__ ", value: `${acknowledgements}`},
					{name: "__Permissions:__ ", value: `${permissions.join(` | `)}`}
				]
			}
		});
	},
};