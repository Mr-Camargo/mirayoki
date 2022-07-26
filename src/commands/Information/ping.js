const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with the bot\'s current ping'),

	async execute(interaction) {
		try {
			const pinging = new EmbedBuilder()
				.setColor('#55C2FF')
				.setTitle('Pinging...');

			const sent = await interaction.reply({ embeds: [pinging], fetchReply: true });

			const ping = new EmbedBuilder()

				.setColor('#55C2FF')
				.setTitle('Pong!')
				.setDescription(`Latency is ${sent.createdTimestamp - interaction.createdTimestamp}ms`);

			return await interaction.editReply({ embeds: [ping] });
		/* Returns an informative message with the ping, which is calculated
		with the time the Bot took to read and reply to the message. */
		} catch (error) {
			const unknownError = new EmbedBuilder()
				.setColor('#FF5733')
				.setTitle('Unknown Error')
				.setDescription(`${error}`)
				.setFooter({ text: 'If the error persists, please contact support using /support' });

			return await interaction.reply({ embeds: [unknownError] });
		}
	},
};
