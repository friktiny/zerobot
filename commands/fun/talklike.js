const utils = require('../../functions');

module.exports = {
	name: 'talklikea',
	description: 'Talk in a different accent',
	args: true,
	category: "Fun",
	aliases: [],
	utilisation: '{prefix}talklikea [censor,chef,cockney,eleet,fudd,jethro,jibberish,ken,kenny,nyc,pirate,rasterman,scottish,scramble,spammer,studly,upsidedown] [text]',
	execute(message, args, bot){
		if(!args.length){
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		
		if(!args.length > 1){
			return message.channel.send(`You didn't provide enough arguments, ${message.author}!`);
		}
		
		var type = args.shift().toLowerCase();
		var input = args.join(' ');
		
		var text;
		switch(type){
			case 'censor':
				const { censor } = require('talk-like-a');
				text = censor(input);
			break;
			
			case 'chef':
				const { chef } = require('talk-like-a');
				text = chef(input);
			break;
			
			case 'cockney':
				const { cockney } = require('talk-like-a');
				text = cockney(input);
			break;
			
			case 'eleet':
				const { eleet } = require('talk-like-a');
				text = eleet(input);
			break;
			
			case 'fudd':
				const { fudd } = require('talk-like-a');
				text = fudd(input);
			break;
			
			case 'jethro':
				const { jethro } = require('talk-like-a');
				text = jethro(input);
			break;
			
			case 'jibberish':
				const { jibberish } = require('talk-like-a');
				text = jibberish(input);
			break;
			
			case 'ken':
				const { ken } = require('talk-like-a');
				text = ken(input);
			break;
			
			case 'kenny':
				const { kenny } = require('talk-like-a');
				text = kenny(input);
			break;
			
			case 'nyc':
				const { nyc } = require('talk-like-a');
				text = nyc(input);
			break;
			
			case 'pirate':
				const { pirate } = require('talk-like-a');
				text = pirate(input);
			break;
			
			case 'rasterman':
				const { rasterman } = require('talk-like-a');
				text = rasterman(input);
			break;
			
			case 'scottish':
				const { scottish } = require('talk-like-a');
				text = scottish(input);
			break;
			
			case 'scramble':
				const { scramble } = require('talk-like-a');
				text = scramble(input);
			break;
			
			case 'spammer':
				const { spammer } = require('talk-like-a');
				text = spammer(input);
			break;
			
			case 'studly':
				const { studly } = require('talk-like-a');
				text = studly(input);
			break;
			
			case 'upsidedown':
				const { upsidedown } = require('talk-like-a');
				upsidedown(input);
			break;
		}
		
		return message.channel.send(`${message.author} says: "${text}"`);
	},
};