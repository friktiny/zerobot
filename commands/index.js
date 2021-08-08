const purge = require('./channel/purge');

const talklike = require('./fun/talklike');
const ascii = require('./fun/ascii');
const kanye = require('./fun/kanye');
const kill = require('./fun/kill');
const jokes = require('./fun/jokes');
const insult = require('./fun/insult');
const pickup = require('./fun/pickup');
const random = require('./fun/random');
const dictionary = require('./fun/dictionary');
const urban = require('./fun/urban');
const roll = require('./fun/roll');
const weather = require('./fun/weather');

const beg = require('./economy/beg');
const daily = require('./economy/daily');
const give = require('./economy/give');
const leaderboard = require('./economy/leaderboard');
const profile = require('./economy/profile');
const roulette = require('./economy/roulette');
const shop = require('./economy/shop');
const slots = require('./economy/slots');
const steal = require('./economy/steal');
const weekly = require('./economy/weekly');
const work = require('./economy/work');

const porn = require('./nsfw/porn');
const verify = require('./nsfw/verify')

const ban = require('./user/ban');
const dm = require('./user/dm');
const kick = require('./user/kick');
const unban = require('./user/unban');
const whois = require('./user/whois');

const ping = require('./server/ping');
const help = require('./server/help');

const nowplaying = require('./music/nowplaying');
const pause = require('./music/pause');
const play = require('./music/play');
const queue = require('./music/queue');
const resume = require('./music/resume');
const search = require('./music/search');
const shuffle = require('./music/shuffle');
const skip = require('./music/skip');
const stop = require('./music/stop');
const volume = require('./music/volume');

module.exports = {
	purge,
	beg,
	daily,
	give,
	leaderboard,
	profile,
	roulette,
	shop,
	slots,
	steal,
	weekly,
	work,
	ascii,
	talklike,
	kanye,
	kill,
	insult,
	pickup,
	random,
	jokes,
	dictionary,
	urban,
	roll,
	weather,
	porn,
	verify,
	ban,
	dm,
	kick,
	unban,
	whois,
	ping,
	nowplaying,
	pause,
	play,
	queue,
	resume,
	search,
	shuffle,
	skip,
	stop,
	volume,
	help,
};
