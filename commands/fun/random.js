const fmls = require('random-fmls');
const all = require('everyday-fun');
const utils = require('../../functions');

module.exports = {
	name: 'random',
	description: 'Random FMLs, quotes, jokes, and riddles.',
	args: true,
	category: "Fun",
	aliases: [],
	utilisation: '{prefix}random [fml,quote,joke,riddle]',
	execute(message, args, bot){
		if(!args.length){
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		
		var type = args[0];
		var text;
		switch(type){
			case 'fml':
				text = fmls();
			break;
			
			case 'quote':
				var quote = all.getRandomQuote();
				text = quote.quote + ' - ' + quote.author;
			break;
			
			case 'joke':
				var joke = all.getRandomJoke();
				text = joke.body;
			break;
			
			case 'riddle':
				var riddle = all.getRandomRiddle();
				text = 'Question: ' + riddle.riddle + "\n";
				text += 'Answer: ||'+riddle.answer+'||';
			break;
		}
		message.channel.send(utils.buildEmbed({title: `Random ${type}`, msg: text}));
	},
};