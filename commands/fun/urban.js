const utils = require('../../functions');
const ud = require('urban-dictionary');

module.exports = {
	name: 'urban',
	description: 'Lookup a word using Urban Dictionary.',
	args: true,
	category: "Fun",
	aliases: [],
	utilisation: '{prefix}urban [word/phrase]',
	execute(message, args, bot){
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		
		var word = args[0];
		
		ud.define(word).then((results) => {
			var definition,
				example;
			Object.entries(results[0]).forEach(([key, prop]) => {
				if(key.includes('definition')){
					definition = prop;
				}
				if(key.includes('example')){
					example = prop;
				}
			});
			
			var fields = [];
			
			fields.push({name: "__DEFINITION__", value: definition});
			fields.push({name: "__EXAMPLE__", value: example});
			
			message.channel.send({
				embed: {
					title: "Urban Define: " + word,
					fields: fields,
				}
			});
		}).catch((error) => {
			console.error(`urbandefine (promise) - error ${error.message}`);
		});
	},
};