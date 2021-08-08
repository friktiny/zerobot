const Discord = require('discord.js');
var fs = require('fs');

if(!String.prototype.format){
  String.prototype.format = function(){
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number){ 
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}

module.exports = {
	buildEmbed: (data) => {
		var embed = new Discord.MessageEmbed()
			.setTitle(data.title)
			.setDescription(data.msg)
			.setTimestamp();
		
		if(data.color){
			embed.setColor(data.color);
		}else{
		 embed.setColor('#111111');
		}
		
		if(data.author){
			embed.setAuthor(data.author);
		}else{
			embed.setAuthor('D347hB07');
		}
		
		if(data.footer){
			embed.setFooter(data.footer);
		}else{
		 embed.setFooter('D347hB07');
		}
	
		if(data.image){
			embed.attachFiles([data.image]);
			embed.setImage('attachment://'+data.image);
		}
		
		if(data.thumbnail){
			embed.setThumbnail(data.thumbnail);
		}
	
		if(data.extra){
			for(var i = 0; i < data.extra.length; i++){
				embed.addFields(data.extra[i]);
			}
		}
		
		return embed;
	},
	getFile: (dir) => {
		var files = fs.readdirSync(dir);
		var img = files[Math.floor(Math.random() * files.length)];
		return dir+img;
	},
	format: (str, args) => {
		return str.replace(/\{\{|\}\}|\{(\d+)\}/g, function (m, n){
			if(m == "{{"){
				return "{";
			}
			if(m == "}}"){
				return "}";
			}
			return args[n];
		}); 
	},
	chatBot: (bot, message) => {
		if(message.author.bot) return;
		message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
		if(message.content.includes(`@`)){
			return message.channel.send(`**:x: Please do not mention anyone **`);
		}
		message.channel.startTyping();
		if(!message.content) return message.channel.send("Please say something!");
		bot.chat.chat({message: message.content, name: bot.client.user.username, owner:"Chaos Creator", user: message.author.id, language: "en"}).then(reply => {
			message.channel.send(`${reply}`);
		});
		message.channel.stopTyping();
	}
};