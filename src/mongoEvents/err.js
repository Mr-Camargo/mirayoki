const color = require('cli-color');

module.exports = {
	name: 'err',
	async execute(error) {
		console.log(color.red('ERROR'), color.blackBright(`at ${Date()}`), `There was an error with the MongoDB: ${error}`);
	},
};