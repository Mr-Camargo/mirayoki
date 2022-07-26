const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('rng')
		.setDescription('Generate a random number')
		.addIntegerOption(option => option.setName('maximum').setDescription('The maximum number to generate the random number from').setRequired(true))
		.addIntegerOption(option => option.setName('minimum').setDescription('The minimum number to generate the random number from')),

	async execute(interaction) {
		try {
			let minNumber;
			// This variable will be used as the minimum number to generate the random number from

			let maxNumber;
			// This variable will be used as the maximum number to generate the random number from

			const maximumChoice = interaction.options.getInteger('maximum');

			const minimumChoice = interaction.options.getInteger('minimum');

			if (maximumChoice && minimumChoice) {
			// If the user has filled both options

				minNumber = minimumChoice;
				// Treat first option as minimum number

				maxNumber = maximumChoice;
				// And treat second option as maximum number

			} else if (maximumChoice && !minimumChoice && minimumChoice !== 0) {
			// If there is only one option chosen

				minNumber = 1;
				/* As there is no option to define the minimum number,
            the Bot will generate by default a random number using 1
            as a minimum number */

				maxNumber = interaction.options.getInteger('maximum');
			// Treat first option as maximum number
			}

			if (maxNumber > 50000 || minNumber == 0 || maxNumber == 0 || maxNumber < 0 || minNumber < 0 || maxNumber < minNumber || maxNumber === minNumber) {
			/* If the number the user wants to generate is more than 50,000, the minimum number bigger than the maximum,
            the set of numbers are negative numbers, and if the set is also zeros*/

				const invalidNumberRng = new EmbedBuilder()

					.setColor('#FF5733')
					.setTitle('Error')
					.setDescription('You can only generate numbers from **1** and up to **50,000**');

				return await interaction.reply({ embeds: [invalidNumberRng], ephemeral: true });
			// Returns an error message
			} else {
			// If the checks above have passed ...

				const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
				// Generate a random number using the specified set

				const finalRng = new EmbedBuilder()

					.setColor('#55C2FF')
					.setTitle('And the chosen one is...')
					.setDescription(`**${randomNumber}.**`)
					.setFooter({ text: `Generated a number from ${minNumber} to ${maxNumber}` });

				return await interaction.reply({ embeds: [finalRng] });
			// Return a success message with the result
			}
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
