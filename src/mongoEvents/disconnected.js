const color = require('cli-color');

module.exports = {
	name: 'disconnected',
	async execute() {
		console.log(color.red('ERROR'), 'Mirayoki lost connection to the MongoDB', color.blackBright(`at ${Date()}`));
	},
};