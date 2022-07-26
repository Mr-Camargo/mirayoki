const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('choose')
		.setDescription('This or that?')
		.addStringOption(option => option.setName('this').setDescription('Should I choose this...').setRequired(true))
		.addStringOption(option => option.setName('that').setDescription('or that...?').setRequired(true)),

	async execute(interaction) {
		try {
			const options = [interaction.options.getString('this'), interaction.options.getString('that')];

			const chosenOption = options[Math.floor(Math.random() * options.length)];

			const finalChoice = new EmbedBuilder()
				.setColor('#55C2FF')
				.setTitle('A choice has been done...')
				.setDescription(`**${trim(chosenOption, 1024)}**.`);

			return await interaction.reply({ embeds: [finalChoice] });
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