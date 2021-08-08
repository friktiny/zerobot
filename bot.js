const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const smartestchatbot = require('smartestchatbot');
const botCommands = require('./commands');
const scb = new smartestchatbot.Client();
const Enmap = require("enmap");

const configSchema = {
	defaultColors: {
		success: '#41b95f',
		neutral: '#287db4',
		warning: '#ff7100',
		error: '#c63737',
	},
	emotes: {
		off: ':x:',
		error: ':warning:',
		queue: ':bar_chart:',
		music: ':musical_note:',
		success: ':white_check_mark:',
	}
};

const createBot = initialConfig => {
	const bot = {
		client: new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] }),
		log: console.log,
		commands: new Collection(),
		config: configSchema,
		server: '',
		user: {
			key: ''
		},
		chat: scb
	};
	
	const { Player } = require("discord-player");
	bot.client.player = new Player(bot.client);
	bot.client.profile = new Enmap("profile");
	bot.client.shop = {
		gold: {
			cost: 10000
		},
		silver: {
			cost: 5000
		},
		bronze: {
			cost: 2500
		}
	};
	
	const has = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
	
	bot.loadConfig = function loadConfig(config, callback){
		bot.log('Loading config...');
		try{
			if(!config || !has(config, 'token')){
				throw Error('Config or token missing!');
			}
			bot.config = {
				...configSchema,
				...config,
			};
			callback();
		}catch(err){
			this.log(`Error loading config: ${err.message}`)
			this.log('Please fix the config error and retry.')
		}
	};

	bot.load = function load(config){
		this.config = {};
		var _t = this;
		this.loadConfig(config, () => {
			bot.log('Loading commands...');
			Object.keys(botCommands).forEach(key => {
				this.commands.set(botCommands[key].name, botCommands[key]);
			});
			
			const botEvents = fs.readdirSync('./events/bot').filter(file => file.endsWith('.js'));
			for(const file of botEvents){
				const event = require(`./events/bot/${file}`);
				if(event.once) {
					bot.client.once(event.name, (...args) => event.execute(...args, bot));
				} else {
					bot.client.on(event.name, (...args) => event.execute(...args, bot));
				}
			}
			
			const playerEvents = fs.readdirSync('./events/player').filter(file => file.endsWith('.js'));
			for(const file of playerEvents){
				_t.log(`Loading music player event ${file}`);
				const event = require(`./events/player/${file}`);
				bot.client.player.on(file.split(".")[0], event.bind(null, bot));
			}

			this.client.on('interactionCreate', async interaction => {
				console.log(interaction);
				/*
				if (!interaction.isCommand()) return;

				if (!client.commands.has(interaction.commandName)) return;

				try {
					await _t.client.commands.get(interaction.commandName).execute(interaction);
				} catch (error) {
					console.error(error);
					await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
				}
				*/
			});
			this.log('Connecting...');
			this.client.login(this.config.token);
		});
	}
	return {
		start: () => bot.load(initialConfig),
	}
}

module.exports = {
	createBot
}
