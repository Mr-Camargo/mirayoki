const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');


const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('word')
		.setDescription('Fetch a random word from the Urban Dictionary'),

	async execute(interaction) {
		try {
			await interaction.deferReply();

			const { data: { list } } = await axios.get('https://api.urbandictionary.com/v0/random').catch((error) => {
				const unknownError = new EmbedBuilder()
					.setColor('#FF5733')
					.setTitle('Unknown Error')
					.setDescription(`${error}`)
					.setFooter({ text: 'If the error persists, please contact support using /support' });

				return interaction.editReply({ embeds: [unknownError] });
			});

			const [answer] = list;

			const definition = new EmbedBuilder()
				.setColor('#EFFF00')
				.setTitle(answer.word)
				.setURL(answer.permalink)
				.addFields(
					{ name: 'Definition', value: trim(answer.definition, 1024) },
					{ name: 'Example', value: trim(answer.example, 1024) },
					{ name: 'Author', value: `${answer.author}`, inline: true },
					{ name: 'Rating', value: `${answer.thumbs_up} 👍 ${answer.thumbs_down} 👎`, inline: true }
				)
				.setFooter({ text: 'Data from urbandictionary.com' });

			return await interaction.editReply({ embeds: [definition] });
		} catch (error) {
			const unknownError = new EmbedBuilder()
				.setColor('#FF5733')
				.setTitle('Unknown Error')
				.setDescription(`${error}`)
				.setFooter({ text: 'If the error persists, please contact support using /support' });

			return await interaction.editReply({ embeds: [unknownError] });
		}
	}
};