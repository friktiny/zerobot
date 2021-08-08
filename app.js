require('dotenv').config();
const BotFactory = require('./bot');

const bot = BotFactory.createBot({
	token: process.env.TOKEN,
	name: 'D347hB07',
	prefix: '::',
	db: {
		name: 'deathbot',
		user: 'deathbot',
		password: process.env.DBPASS
	}
});

bot.start()