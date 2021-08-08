const utils = require('../../functions');

module.exports = {
	name: 'porn',
	description: 'Get some porn!',
	args: true,
	category: "NSFW",
	aliases: [],
	utilisation: '{prefix}porn [anal,ass,bdsm,boobs,fetish,general,insertion,masturbation,messy,oral,orgasm,panties,pussy,topless,toys,underwear]',
	execute(message, args, bot){
		if (!message.channel.nsfw) {
            message.channel.send("This command is only allowed in NSFW channels.");
        }
		var category;
		var cats = ["anal", "bdsm", "boobs", "fetish", "insertion", "lesbian", "masturbation", "oral", "pussy", "topless", "toys"];
		if(!args.length){
			category = cats[Math.floor(Math.random() * cats.length)];
		}else{
			category = args[0];
			if(category == 'random'){
				category = cats[Math.floor(Math.random() * cats.length)];
			}
		}
		var dir = "images/"+category+"/";
		
		message.channel.send(utils.buildEmbed({title: 'Porn!', msg: `${message.author} here's your porn!`, image: utils.getFile(dir)}));
	},
};