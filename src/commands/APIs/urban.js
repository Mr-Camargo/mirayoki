const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const restricted = require('../../sets/restrictedWords.js');


const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('urban')
		.setDescription('Look up a word in Urban Dictionary')
		.addStringOption(option => option.setName('word').setDescription('The word/phrase you want to lookup').setRequired(true)),

	async execute(interaction) {
		try {
			await interaction.deferReply();
			const term = interaction.options.getString('word');
			const query = new URLSearchParams({ term });

			const { data: { list } } = await axios.get(`https://api.urbandictionary.com/v0/define?${query}`).catch((error) => {
				const unknownError = new EmbedBuilder()
					.setColor('#FF5733')
					.setTitle('Unknown Error')
					.setDescription(`${error}`)
					.setFooter({ text: 'If the error persists, please contact support using /support' });

				return interaction.editReply({ embeds: [unknownError] });
			});

			if (!list.length) {
				const noDefinition = new EmbedBuilder()
					.setColor('#FF5733')
					.setTitle('Error')
					.setDescription(`No definition was found for **${term}**`);

				return await interaction.editReply({ embeds: [noDefinition] });
			} else if (restricted.words.includes(term)) {
				const restrictedWord = new EmbedBuilder()
					.setColor('#FF5733')
					.setTitle('Error')
					.setDescription(`The word **${term}** is restricted because it is known to generate trouble with mirayoki.`)
					.setFields({ name: 'See it online', value: `https://urbandictionary.com/${term}` });

				return await interaction.editReply({ embeds: [restrictedWord] });
			}

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