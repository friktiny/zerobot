const axios = require('axios').default;
const utils = require('../../functions');

module.exports = {
	name: 'kanye',
	description: 'Get Kanye West quotes',
	args: false,
	category: "Fun",
	aliases: [],
	utilisation: '{prefix}kanye',
	execute(message, args, bot){
		const response = axios.get('https://api.kanye.rest',  { responseType: 'json' });
		response.then(data => {
			console.log(data.data.quote);
			var fields = [];
			fields.push({name: "**Kanye says**", value: `${data.data.quote}`});
			message.channel.send({
				embed: {
					title: "Kanye West Quotes",
					fields: fields,
				}
			});
		});
	},
};