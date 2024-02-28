const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('Get information about Mirayoki.'),

	async execute(interaction, client) {
		try {
			const days = Math.floor(client.uptime / 86400000);
			const hours = Math.floor(client.uptime / 3600000) % 24;
			const minutes = Math.floor(client.uptime / 60000) % 60;
			const seconds = Math.floor(client.uptime / 1000) % 60;
			// These variables do the calculations for the Bot uptime

			const about = new EmbedBuilder()

				.setColor('#55C2FF')
				.setTitle('Mirayoki.')
				.setDescription('The handsome, charming and powerful bot.')
				.setThumbnail('https://i.postimg.cc/rF4pL3YQ/miralogo.png')
				.addFields(
					{ name: 'Version', value: `${interaction.guild.name} is running **${process.env.OS_VERSION} (${process.env.COMMIT})**` },
					{ name: 'Cluster Uptime', value: `${days}d ${hours}h ${minutes}m ${seconds}s` },
					{ name: 'Server ID', value: `${interaction.guild.id} (${interaction.guild.name})` },
					{ name: 'User ID', value: `${interaction.user.id} (${interaction.user.username})` },
				)
				.setFooter({ text: 'Mirayoki is an open source project of Mirei.' });

			return await interaction.reply({ embeds: [about] });
		} catch (error) {
			const unknownError = new EmbedBuilder()
				.setColor('#FF5733')
				.setTitle('Unknown Error')
				.setDescription(`${error}`)
				.setFooter({ text: 'If the error persists, please contact support using /support' });

			return await interaction.reply({ embeds: [unknownError] });
		}
	}
};
