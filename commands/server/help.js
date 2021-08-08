const utils = require('../../functions');

module.exports = {
	name: 'help',
	description: 'Help Menu',
	aliases: ['commands'],
	category: "Server",
	utilisation: '{prefix}help [command]',
	execute(message, args, bot){
		if(!args[0]){
			const ch = bot.commands.filter(x => x.category == 'Channel').map((x) => '`' + x.name + '`').join(', ');
			const eco = bot.commands.filter(x => x.category == 'Economy').map((x) => '`' + x.name +'`').join(', ');
			const fun = bot.commands.filter(x => x.category == 'Fun').map((x) => '`' + x.name + '`').join(', ');
			const music = bot.commands.filter(x => x.category == 'Music').map((x) => '`' + x.name + '`').join(', ');
			const nsfw = bot.commands.filter(x => x.category == 'NSFW').map((x) => '`' + x.name + '`').join(', ');
			const server = bot.commands.filter(x => x.category == 'Server').map((x) => '`' + x.name + '`').join(', ');
			const usr = bot.commands.filter(x => x.category == 'User').map((x) => '`' + x.name + '`').join(', ');
			
			message.channel.send({
				embed: {
					color: 'ORANGE',
					author: { name: 'Help panel' },
					footer: { text: 'D347hB07' },
					fields: [
						{ name: 'Server ', value: server },
						{ name: 'Channel ', value: ch },
						{ name: 'Economy ', value: eco },
						{ name: 'User ', value: usr },
						{ name: 'Fun ', value: fun },
						{ name: 'NSFW ', value: nsfw },
						{ name: 'Music', value: music },
					],
					timestamp: new Date(),
					description: `For further information, use ${bot.config.prefix}help [command]`,
				},
			});
		}else{
			const command = bot.commands.get(args.join(" ").toLowerCase()) || bot.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));
			
			if(!command) return message.channel.send(`${bot.config.emotes.error} - I did not find this command !`);
			
			message.channel.send({
				embed: {
					color: 'ORANGE',
					author: { name: 'Help panel' },
					footer: { text: 'D347hB07' },
					fields: [
						{ name: 'Name', value: command.name, inline: true },
						{ name: 'Category', value: command.category, inline: true },
						{ name: 'Aliase(s)', value: command.aliases.length < 1 ? 'None' : command.aliases.join(', '), inline: true },
						{ name: 'Utilisation', value: command.utilisation.replace('{prefix}', bot.config.prefix), inline: true },
					],
					timestamp: new Date(),
					description: 'Find information on the command provided.\nMandatory arguments `[]`, optional arguments `<>`.',
				}
			});
		};
	},
};