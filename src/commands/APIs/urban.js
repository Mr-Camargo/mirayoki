const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');


const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('urban')
		.setDescription('Look up a word in Urban Dictionary')
		.addStringOption(option => option.setName('word').setDescription('The word/phrase you want to lookup').setRequired(true)),

	async execute(interaction, client) {
		await interaction.deferReply();
		const term = interaction.options.getString('word');
		const query = new URLSearchParams({ term });

		const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

		if (!list.length) {

			const noDefinition = new MessageEmbed()
				.setColor('#FF5733')
				.setTitle('Error')
				.setDescription(`No definition was found for **${term}**`);

			return await interaction.editReply({ embeds: [noDefinition] });
		}

		const [answer] = list;

		const definition = new MessageEmbed()
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
	}
};