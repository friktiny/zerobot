const utils = require('../../functions');
const Dictionary = require('oxford-dictionary');

var config = {
	app_id : "62ea3c92",
	app_key : "d52178de24f8c89c5bfb2d1fecde2f08",
	source_lang : "en-us"
};

const dict = new Dictionary(config);

module.exports = {
	name: 'define',
	description: 'Lookup a word using Oxford dictionary.',
	args: true,
	category: "Fun",
	aliases: [],
	utilisation: '{prefix}define [word]',
	execute(message, args, bot){
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		
		var dataObj = {
			noun: {
				definitions: [],
				pronunciations: [],
				dialect: "",
				examples: [],
			},
			pronoun: {
				definitions: [],
				pronunciations: [],
				dialect: "",
				examples: [],
			},
			adjective: {
				definitions: [],
				pronunciations: [],
				dialect: "",
				examples: [],
			},
			verb: {
				definitions: [],
				pronunciations: [],
				dialect: "",
				examples: [],
			},
			adverb: {
				definitions: [],
				pronunciations: [],
				dialect: "",
				examples: [],
			}
		};
		var word = args[0];
		var definitions = dict.definitions(word);
		definitions.then(function(defs){
			defs.results[0].lexicalEntries.forEach((el, index, array) => {
				var type = el.lexicalCategory.id;
				dataObj[type].definitions = el.entries[0].senses[0].definitions;
			});
			
			var pronunciations = dict.pronunciations(word);
			pronunciations.then(function(prons){
				prons.results[0].lexicalEntries.forEach((el, index, array) => {
					var type = el.lexicalCategory.id;
					dataObj[type].pronunciations = el.entries[0].pronunciations[0].phoneticSpelling;
					dataObj[type].dialect = el.entries[0].pronunciations[0].dialects[0];
				});
				
				var examples = dict.examples(word);
				examples.then(function(exs){
					exs.results[0].lexicalEntries.forEach((el, index, array) => {
						var type = el.lexicalCategory.id;
						dataObj[type].examples = el.entries[0].senses[0].examples[0].text;
						
						const count = Object.values(dataObj)
							.filter(({ definitions }) => definitions?.length > 0).length;
						
						var fields =[];
						var i = 1;
						for(let [k, v] of Object.entries(dataObj)){
							if(v.definitions.length){
								fields.push({name: "__DEFINITION__", value: k + ': ' + v.definitions[0]});
								fields.push({name: "__PRONUNCIATION__", value: v.pronunciations});
								fields.push({name: "__DIALECT__", value: v.dialect});
								fields.push({name: "__EXAMPLE__", value: v.examples});
								if(i < count){
									fields.push({name: '\u200B', value: '\u200B'});
								}
							}
						}
						
						message.channel.send({
							embed: {
								title: "Define: " + word,
								fields: fields,
							}
						});
					});
				}, function(err){
					console.log(err);
				});
			}, function(err){
				console.log(err);
			});
		}, function(err){
			console.log(err);
		});
	},
};