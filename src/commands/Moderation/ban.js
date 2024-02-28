const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a user from the server')
		.addUserOption(option => option.setName('who').setDescription('The user that you want to ban').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Specify a reason for the ban')),

	async execute(interaction, client) {
		try {
			const user = interaction.options.getUser('who');
			const reason = interaction.options.getString('reason');
			const member = interaction.guild.members.cache.get(user.id);

			const couldntBeContacted = new EmbedBuilder()
				.setColor('#FF5733')
				.setTitle('Important')
				.setDescription(`${user} could not be notified as they may have their DMs closed.`);

			if (interaction.member.permissions.has([PermissionsBitField.Flags.BanMembers])) {
				if (interaction.guild.members.me.permissions.has([PermissionsBitField.Flags.BanMembers])) {
					try {
						if (user.id === process.env.BOT_ID) {
							const cantBanMe = new EmbedBuilder()
								.setColor('#FF5733')
								.setTitle('Error')
								.setDescription('Mirayoki can\'t be banned this way, if you want me to leave your server kick me within the Discord app.')
								.setFooter({ text: 'Sorry if I disappointed you' });

							return await interaction.reply({ embeds: [cantBanMe], ephemeral: true });
						} else if (user.id === interaction.user.id) {
							const cantBanYourself = new EmbedBuilder()
								.setColor('#FF5733')
								.setTitle('Error')
								.setDescription('You can\'t ban yourself.');

							return await interaction.reply({ embeds: [cantBanYourself], ephemeral: true });
						} else if (user.id === interaction.guild.ownerId) {
							const cantBanOwner = new EmbedBuilder()
								.setColor('#FF5733')
								.setTitle('Error')
								.setDescription(`You cannot ban <@${interaction.guild.ownerId}> because they are the owner of this server.`);

							return await interaction.reply({ embeds: [cantBanOwner], ephemeral: true });
						} else if (!member.bannable || !member.manageable) {
							const cantBanSuperior = new EmbedBuilder()
								.setColor('#FF5733')
								.setTitle('Error')
								.setDescription(`${user} couldn't be banned because they may have higher permissions than Mirayoki.`);

							return await interaction.reply({ embeds: [cantBanSuperior], ephemeral: true });
						} else if (member.permissions.has([PermissionsBitField.Flags.Administrator])) {
							const cantBanAdmin = new EmbedBuilder()
								.setColor('#FF5733')
								.setTitle('Error')
								.setDescription(`${user} couldn't be banned because they are an Administrator of this server.`);

							return await interaction.reply({ embeds: [cantBanAdmin], ephemeral: true });
						} else {
							const banned = new EmbedBuilder()
								.setColor('#55C2FF')
								.setTitle(':no_entry_sign: Banned')
								.setDescription(`You have banned ${user}.`);
							const bannedDM = new EmbedBuilder()
								.setColor('#55C2FF')
								.setTitle(':no_entry_sign: Banned')
								.setDescription(`You have been banned from **${interaction.guild.name}** by **${interaction.user}**.`);
							if (reason) {
								banned.addFields(
									{ name: 'Reason', value: `${reason}` },
								);
								bannedDM.addFields(
									{ name: 'Reason', value: `${reason}` },
								);
							}
							await interaction.reply({ embeds: [banned] });
							await client.users.cache.get(member.id).send({ embeds: [bannedDM] }).catch(() => {interaction.followUp({ embeds: [couldntBeContacted] });});
							return member.ban({ reason: `Requested by ${interaction.user.username}` });
						}
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
						.setDescription('I don\'t have the **Ban Members** permission to run this command.')
						.setFooter({ text: 'Make sure to add it by modifying my exclusive role!' });

					return await interaction.reply({ embeds: [noBotPerms], ephemeral: true });
				}
			} else {
				const noPerms = new EmbedBuilder()

					.setColor('#FF5733')
					.setTitle('Access denied')
					.setDescription('You don\'t have the **Ban Members** permission to run this command.');

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