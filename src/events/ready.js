const color = require('cli-color');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(color.green('DEPLOY'), 'Mirayoki has been deployed succesfully', color.blackBright(`at ${Date()}`));

		try {
			client.user.setActivity(process.env.ACTIVITY, { type: process.env.ACTIVITY_TYPE });
			// This will set the RP for the bot
			console.log(color.green('DEPLOY'), `RP deployed successfully as ${process.env.ACTIVITY_TYPE} (${process.env.ACTIVITY})`, color.blackBright(`at ${Date()}`));
			// And log it into the console
		} catch (error) {
			console.error(color.red('ERROR'), `There was an error during the deployment: ${error}`);
		}
	},
};