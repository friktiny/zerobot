const books = require('google-book-search');
const axios = require('axios').default;

module.exports = {
	name: 'library',
	description: 'Get book information',
	args: true,
	category: "Fun",
	aliases: [],
	utilisation: '{prefix}library',
	execute(message, args, bot){
		if(!args.length){
			message.channel.send("You must specify a book.");
		}
		
		var book = args.join(' ');
		books.search(book, function(err, result){
			if (err) console.log(err);
			
			var title = result[0].title;
			var authors = result[0].authors;
			var publisher = result[0].publisher;
			var pubDate = result[0].publishedDate;
			var pageCt = result[0].pageCount;
			var rating = result[0].averageRating;
			var thumbURL = result[0].thumbnail;
			
			var fields;
			fields.push({name: "__Title__", value: title});
			fields.push({name: "__Author(s)__", value: "\u200B"});
			authors.forEach((el, index) => {
				fields.push({name: `${el}`, value: "\u200B", inline: true});
			});
			fields.push({name: "__Publisher__", value: `${publisher} ${pubDate}`});
			fields.push({name: "__Pages__", value: pageCt});
			
			message.channel.send({
				embed: {
					title: "Book Search",
					fields: fields,
					thumbnail: {
						url: thumbURL
					}
				}
			});
		});
	},
};