const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const wait = require('util').promisify(setTimeout);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Tidy up your channel by deleting messages.')
		.addIntegerOption(option => option.setName('quantity').setDescription('The amount of messages (Up to 100)').setRequired(true)),

	async execute(interaction) {

		const quantity = interaction.options.getInteger('quantity');

		const manyMessages = new MessageEmbed()

			.setColor('#FF5733')
			.setTitle('Error')
			.setDescription('I can only delete up to 100 messsages at a time.');

		const noClear = new MessageEmbed()

			.setColor('#FF5733')
			.setTitle('Error')
			.setDescription('So... I delete nothing?');

		const noPerms = new MessageEmbed()

			.setColor('#FF5733')
			.setTitle('Access denied')
			.setDescription('You don\'t have the **Manage Messages** permission to run this command.');

		const cleared = new MessageEmbed()

			.setColor('#55C2FF')
			.setTitle(`${quantity} messages cleared successfully!`);


		if (interaction.member.permissions.has([Permissions.FLAGS.MANAGE_MESSAGES])) {
			try {
				if (parseInt(quantity) <= 0) {
					return await interaction.reply({ embeds: [noClear], ephemeral: true });
				} else if (parseInt(quantity) === 1) {
					cleared.setTitle(`${quantity} message cleared successfully!`);
				} else if (parseInt(quantity) > 100) {
					return await interaction.reply({ embeds: [manyMessages], ephemeral: true });
				}

				interaction.channel.bulkDelete(parseInt(quantity), true);
				await interaction.reply({ embeds: [cleared] });
				await wait(2000);
				return await interaction.deleteReply();
			} catch {
				console.error();
			}
		} else {
			return await interaction.reply({ embeds: [noPerms], ephemeral: true });
		}
	}
};
