const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Bring the power of Mirayoki to your server'),

	async execute(interaction) {
		try {
			const invite = new EmbedBuilder()

				.setColor('#55C2FF')
				.setTitle('Mirayoki.')
				.setURL('https://discord.com/api/oauth2/authorize?client_id=795480018469781505&permissions=8&scope=applications.commands%20bot')
				.setDescription('The handsome, charming and powerful bot.')
				.setThumbnail('https://i.postimg.cc/rF4pL3YQ/miralogo.png')
				.setFooter({ text: 'Click the link to add it to your server!' });

			return await interaction.reply({ embeds: [invite] });
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
