const DiceRoller = require('rpg-dice-roller');

module.exports = {
	name: 'roll',
	description: 'Roll dice',
	args: true,
	category: "Fun",
	aliases: [],
	utilisation: '{prefix}roll <dice-notation>',
	execute(message, args, bot){
		let dice = new DiceRoller.DiceRoller();
		let input = args[0] ? args[0] : '1d6';
		
		dice.roll(input);
		
		let result = dice.log.shift();
		
		let reply = `${message.author} rolled ${result.toString()}`;
		
		message.channel.send({
			embed: {
				color: "#FFFFFF",
				description: reply
			}
		});
	},
};