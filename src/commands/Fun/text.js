const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('text')
		.setDescription('Modify text to look cool!')
		.addStringOption(option => option.setName('message').setDescription('What do you want to modify?').setRequired(true))
		.addStringOption(option => option.setName('modifier').setDescription('How am I going to style this?').setRequired(true).addChoices(
			{ name: 'S P A C E D', value: 'spaced_upper' },
			{ name: 's p a c e d', value: 'spaced_lower' },
		)),

	async execute(interaction) {
		try {
			const message = interaction.options.getString('message');
			const modifier = interaction.options.getString('modifier');

			if (message.length > 512) {
				const longText = new EmbedBuilder()
					.setColor('#FF5733')
					.setTitle('Error')
					.setDescription('You can only modify text that does not exceed 512 characters.')
					.setFields({ name: 'You wrote:', value: `${message}` });

				return await interaction.reply({ embeds: [longText] });
			} else {
				const finalText = new EmbedBuilder();
				switch (modifier) {
					case 'spaced_upper':
						finalText.setTitle(trim(message.split('').join(' ').toUpperCase()), 1024);
						break;
					case 'spaced_lower':
						finalText.setTitle(trim(message.split('').join(' ').toLowerCase()), 1024);
						break;
				}
				return await interaction.reply({ embeds: [finalText] });
			}

		} catch (error) {
			const unknownError = new EmbedBuilder()
				.setColor('#FF5733')
				.setTitle('Unknown Error')
				.setDescription(`${error}`)
				.setFooter({ text: 'If the error persists, please contact support using /support' });

			console.error(error);
			return await interaction.reply({ embeds: [unknownError] });
		}
	}
};
