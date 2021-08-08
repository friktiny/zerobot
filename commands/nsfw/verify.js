const utils = require('../../functions');

module.exports = {
	name: 'verify',
	description: 'Accept and Verify that you are of legal age to view and consent to sexually explicit images and content.',
	args: true,
	category: "NSFW",
	aliases: [],
	utilisation: '{prefix}verify',
	execute(message, args, bot){
		if (!message.channel.nsfw) {
            return message.channel.send("This command is only allowed in NSFW channels.");
        }else{
            var isVerified = bot.client.profile.get(bot.user.key, "verified");
            
            message.channel.send('Verify that you are of legal age to view sexually explicit content.').then((msg) => {
                msg.react('👍');
                msg.react('👎');
                
                const filter = (reaction, user) => {
                    return (
                        ['👍', '👎'].includes(reaction.emoji.name) && user.id === msg.author.id
                    );
                };

                msg.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] }).then(collected => {
                    const reaction = collected.first();
    
                    if (reaction.emoji.name === '👍') {
                        bot.client.profile.set(bot.user.key, 1, "verified");
                        message.reply('Confirmed!');
                    } else {
                        bot.client.profile.set(bot.user.key, 0, "verified");
                        message.reply('Unconfirmed!');
                    }
                }).catch(collected => {
                    message.reply('Time limit reached.');
                });
            });
        }
	}
};