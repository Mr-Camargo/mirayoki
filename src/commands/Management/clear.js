const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');
const wait = require('util').promisify(setTimeout);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Tidy up your channel by deleting messages.')
		.addIntegerOption(option => option.setName('quantity').setDescription('The amount of messages (Up to 100)').setRequired(true)),

	async execute(interaction) {
		try {
			const quantity = interaction.options.getInteger('quantity');

			const manyMessages = new EmbedBuilder()

				.setColor('#FF5733')
				.setTitle('Error')
				.setDescription('I can only delete up to 100 messages at a time.');

			const noClear = new EmbedBuilder()

				.setColor('#FF5733')
				.setTitle('Error')
				.setDescription('So... I delete nothing?');

			const noPerms = new EmbedBuilder()

				.setColor('#FF5733')
				.setTitle('Access denied')
				.setDescription('You don\'t have the **Manage Messages** permission to run this command.');

			const cleared = new EmbedBuilder()

				.setColor('#55C2FF')
				.setTitle(`${quantity} messages cleared successfully!`);


			if (interaction.member.permissions.has([PermissionsBitField.Flags.ManageMessages])) {
				if (interaction.guild.members.me.permissions.has([PermissionsBitField.Flags.ManageMessages])) {
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
						await wait(4000);
						return await interaction.deleteReply();
					} catch (error) {
						const unknownError = new EmbedBuilder()
							.setColor('#FF5733')
							.setTitle('Unknown Error')
							.setDescription(`${error}`)
							.setFooter({ text: 'If the error persists, please contact support using /support' });

						return await interaction.reply({ embeds: [unknownError] });
					}
				} else {
					const noBotPerms = new EmbedBuilder()
						.setColor('#FF5733')
						.setTitle('Error')
						.setDescription('I don\'t have the **Manage Messages** permission to run this command.')
						.setFooter({ text: 'Make sure to add it by modifying my exclusive role!' });

					return await interaction.reply({ embeds: [noBotPerms], ephemeral: true });
				}
			} else {
				return await interaction.reply({ embeds: [noPerms], ephemeral: true });
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
