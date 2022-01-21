module.exports = {
	name: 'ready',
	once: true,
	async execute() {
		console.log(`Mirayoki has been deployed succesfully at ${Date()}`);
	},
};