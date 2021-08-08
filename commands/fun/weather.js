const weather = require('weather-js');
const utils = require('../../functions');

module.exports = {
	name: 'weather',
	description: 'Get local weather',
	args: true,
	category: "Fun",
	aliases: [],
	utilisation: '{prefix}weather <city,st|zip> [c|f]',
	execute(message, args, bot){
		if (!args.length) {
			return message.channel.send(`You didn't provide any location, ${message.author}!`);
		}
		
		var type = (args.length > 1) ? args[1] : 'f';
		weather.find({search: args[0], degreeType: type}, function(err, result) {
			if(err) console.log(err);
			
			var loc = result[0].location;
			var curr = result[0].current;
			var fore = result[0].forecast;
			var fields = [];
			
			var location = loc.name;
			var deg = loc.degreetype;
			var currTemp = curr.temperature;
			var skies = curr.skytext;
			var feels = curr.feelslike;
			var wind = curr.winddisplay;
			var humidity = curr.humidity;
			var day = curr.shortday;
			var currDate = curr.date;
			
			fields.push({name: "__CURRENTLY__", value: `${day} ${currDate}`});
			fields.push({name: "Temps", value: `${currTemp}${deg} Feels like: ${feels}${deg}`});
			fields.push({name: "Skies", value: `${skies} **Wind**: ${wind}`});
			fields.push({name: "Humidity", value: `${humidity}%`});
			fields.push({name: "\u200B", value: "\u200B"});
			fields.push({name: "__WEEK FORECAST__", value: "\u200B"});
			
			fore.forEach((el, index, array) => {
				fields.push({name: `${el.shortday}`, value: `${el.date}`});
				fields.push({name: "Low/High", value: `${el.low}${deg}/${el.high}${deg}`, inline: true});
				fields.push({name: `${el.skytextday}`, value: `${el.precip}% precip`, inline: true});
			});
			
			message.channel.send({
				embed: {
					title: "Weather",
					description: 'Local weather for '+ location,
					fields: fields,
				}
			});
		});
	},
};