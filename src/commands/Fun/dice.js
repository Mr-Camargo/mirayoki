const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('dice')
		.setDescription('Throw a dice')
		.addIntegerOption(option => option.setName('faces').setDescription('The amount of faces the dice will have (Up to 120)')),

	async execute(interaction, client) {

		let numberFaces = interaction.options.getInteger('faces');

		if (!numberFaces && numberFaces !== 0) {
			numberFaces = 6;
			/* If there are no arguments for a desired dice size,
             a standard six-faced will be rolled */
		} else if (numberFaces > 120 || numberFaces < 3 || numberFaces === 0) {
			/* If the user wants to roll a die with more than 120 faces,
            or a dice with less than 3 faces*/

			const invalidDice = new MessageEmbed()

				.setColor('#FF5733')
				.setTitle('You can\'t throw that dice.')
				.setDescription('You can only throw dice with up to **120** faces and with at least **3** faces.');

			return await interaction.reply({ embeds: [invalidDice], ephemeral: true });
			// Returns an error message
		}

		const diceResult = Math.floor(Math.random() * numberFaces) + 1;
		/* This uses the specified faces (6 for default) and
        rolls the dice generating a random number between numberFaces and 1 */

		const finalDice = new MessageEmbed()

			.setColor('#55C2FF')
			.setTitle('You threw a die...')
			.setDescription(`**${diceResult}.**`)
			.setFooter({ text: `Threw a dice with ${numberFaces} faces.` });

		return await interaction.reply({ embeds: [finalDice] });
		// Returns a success message with the result
	}
};
