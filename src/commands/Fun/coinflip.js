const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('coinflip')
		.setDescription('Will it be heads or tails?'),

	async execute(interaction, client) {

		let coin;
		// This variable will be used to represent the side on which the coin fell

		const randomConstant = Math.floor(Math.random() * 2) + 1;
		// This is the random constant, that decides which side the coin will fall

		if (randomConstant === 1) {
			// If the random number is 1, then the coin is set to fall on the Heads side.
			coin = 'Heads';
		} else if (randomConstant === 2) {
			// But if the random number is 2, then it is set to fall on the Tails side.
			coin = 'Tails';
		}

		const flippedCoin = new MessageEmbed()

			.setColor('#55C2FF')
			.setTitle('You flipped a coin...')
			.setDescription(`**${coin}.**`);

		return interaction.reply({ embeds: [flippedCoin] });
		// Returns a success message with the result
	}
};
