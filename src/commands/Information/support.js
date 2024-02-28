const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('support')
		.setDescription('Get assistance with Mirayoki.'),

	async execute(interaction, client) {
		try {
			const days = Math.floor(client.uptime / 86400000);
			const hours = Math.floor(client.uptime / 3600000) % 24;
			const minutes = Math.floor(client.uptime / 60000) % 60;
			const seconds = Math.floor(client.uptime / 1000) % 60;
			// This variables will be used to calculate uptime

			const support = new EmbedBuilder()

				.setColor('#55C2FF')
				.setTitle('Need more help?')
				.setDescription('Our community is a welcoming and a great place to ask for help')
				.setThumbnail('https://i.postimg.cc/3xrYmKVn/logo.png')
				.addFields(
					{ name: 'Support Server', value: 'Community gathers here to share their ideas, suggestions and questions, and we always want new faces around!' },
					{ name: 'Join Support Server', value: '**Currently Unavailable.**\nFeel free to go to https://mirayoki.com/help for more assistance options.' },
					{ name: 'Debug Information', value: 'Our support community may ask for the following information in order to help you more efficiently, this doesn\'t include any private data and it **should only** be used for support purposes.' },
					{ name: 'Version', value: `${interaction.guild.name} is running **${process.env.OS_VERSION} (${process.env.COMMIT})**` },
					{ name: 'Cluster Uptime', value: `${days}d ${hours}h ${minutes}m ${seconds}s` },
					{ name: 'Server ID', value: `${interaction.guild.id} (${interaction.guild.name})` },
					{ name: 'User ID', value: `${interaction.user.id} (${interaction.user.username})` },
				)
				.setFooter({ text: 'Mirayoki is an open source project of Mirei.' });

			return await interaction.reply({ embeds: [support] });
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
