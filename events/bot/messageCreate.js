const utils = require('../../functions');
const superb = require('superb');

var congrats = ["Well done!","Fantastic work!","Is there anything you can’t do?!","Keep up the great work!","You're awesome!","To be honest, I’m jealous.","Wow! Nice work.","You never cease to amaze me!","Thumbs up.","Congratulations.","Well done, you did it.","Good stuff.","Ain't that dandy?"];
module.exports = {
    name: 'messageCreate',
    execute(bot, message){
        bot.server = message.guild.id;
        
        bot.user.key = `${bot.server}-${message.author.id}`;
        if(message.guild){
            if(message.author.id !== bot.client.user.id){
                bot.client.profile.ensure(bot.user.key, {
                    user: message.author.id,
                    guild: message.guild.id,
                    points: 0,
                    level: 1,
                    daily: 0,
                    weekly: 0,
                    work: 0,
                    steal: 0,
                    give: 0,
                    roulette: 0,
                    slots: 0,
                    items: [],
                    verified: 0
                });
        
                var points = bot.client.profile.get(bot.user.key, "points"),
                    isVerified = bot.client.profile.get(bot.user.key, 'verified');
                bot.client.profile.set(bot.user.key, points+Math.floor(message.content.length * 0.4), "points");
        
                const curLevel = Math.round(0.1 * Math.sqrt(bot.client.profile.get(bot.user.key, "points")));
                if(bot.client.profile.get(bot.user.key, "level") < curLevel){
                    var superlative = superb.random();
                    message.reply(`${superlative[0].toUpperCase() + superlative.substring(1)}! You've leveled up to level **${curLevel}**! ${congrats[Math.floor(Math.random() * congrats.length)]}`);
                    bot.client.profile.set(bot.user.key, curLevel, "level");
                }

                if(message.channel.name == "chatbot"){
                    utils.chatBot(bot, message);
                }

                if(!message.content.startsWith(bot.config.prefix)) return;
        
                const args = message.content.split(/ +/);
                const command = args.shift().toLowerCase().slice(bot.config.prefix.length);

                if(!bot.commands.has(command)) return;

                if(message.channel.nsfw){
                    if(!isVerified){
                        if(command !== 'verify'){
                            return message.delete({timeout: 100}), message.send(`You must be verified to use NSFW channels. (${bot.config.prefix})`);
                        }
                    }
                }
                
                try{
                    bot.commands.get(command).execute(message, args, bot);
                    message.delete();
                }catch(error){
                    bot.log(error);
                    message.reply('There was an error executing the command!');
                }
            }
        }
    }
};