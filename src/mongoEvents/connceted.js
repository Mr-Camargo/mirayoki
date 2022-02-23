const color = require('cli-color');

module.exports = {
	name: 'connected',
	async execute() {
		console.log(color.greenBright('MONGO'), 'Mirayoki established connection to the MongoDB', color.blackBright(`at ${Date()}`));
	},
};