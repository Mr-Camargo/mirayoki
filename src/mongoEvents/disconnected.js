module.exports = {
	name: 'disconnected',
	async execute() {
		console.log(`Mirayoki lost connection to the MongoDB at ${Date()}`);
	},
};