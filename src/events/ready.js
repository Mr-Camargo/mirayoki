module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Mirayoki has been deployed succesfully at ${Date()}`);

		try {
			client.user.setActivity(process.env.ACTIVITY, { type: process.env.ACTIVITY_TYPE });
			// This will set the RP for the bot
			console.log(`RP deployed successfully as ${process.env.ACTIVITY_TYPE} (${process.env.ACTIVITY})`);
			// And log it into the console
		} catch (err) {
			console.error(err);
		}
	},
};