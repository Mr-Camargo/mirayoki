const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('color')
		.setDescription('Choose your favorite color'),
        
	async execute(interaction, client) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('color-select')
					.setPlaceholder('Pick a color...')
					.setMinValues(1)
					.setMaxValues(2)
					.addOptions([
						{
							label: 'Red',
							description: 'Your color is red',
							value: 'red'
						},
						{
							label: 'Blue',
							description: 'Your color is blue',
							value: 'blue'
						},
						{
							label: 'Yellow',
							description: 'Your color is yellow',
							value: 'yellow'
						},
						{
							label: 'Green',
							description: 'Your color is green',
							value: 'green'
						},
						{
							label: 'Purple',
							description: 'Your color is purple',
							value: 'purple'
						},
						{
							label: 'Orange',
							description: 'Your color is orange',
							value: 'orange'
						}

					])
			);

		await interaction.reply({ content: 'What is your fav color?', components: [row]});
	}
};
