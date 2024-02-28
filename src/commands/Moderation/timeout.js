const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeout')
		.setDescription('Timeout a user')
		.addSubcommand(subcommand =>
			subcommand
				.setName('add')
				.setDescription('Create a timeout')
				.addUserOption(option => option.setName('who').setDescription('The user that you want to timeout').setRequired(true))
				.addStringOption(option => option.setName('duration').setDescription('How long this timeout will be for').setRequired(true))
				.addStringOption(option => option.setName('reason').setDescription('Specify a reason for the timeout')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('remove')
				.setDescription('Remove a timeout')
				.addUserOption(option => option.setName('who').setDescription('The user that you want to remove the timeout from').setRequired(true))
				.addStringOption(option => option.setName('reason').setDescription('Specify a reason for the untimeout'))),

	async execute(interaction, client) {

		try {
			const user = interaction.options.getUser('who');
			const reason = interaction.options.getString('reason');
			const member = interaction.guild.members.cache.get(user.id);

			let rawDuration = interaction.options.getString('duration');
			if (!rawDuration) {
				rawDuration = 10;
			}

			let timeoutedTime;
			if (member.communicationDisabledUntil) {
				const communicationDisabledUntilMilliseconds = member.communicationDisabledUntilTimestamp - Date.now();
				timeoutedTime = ms(communicationDisabledUntilMilliseconds, { long: true });
			}

			const couldntBeContacted = new EmbedBuilder()
				.setColor('#FF5733')
				.setTitle('Important')
				.setDescription(`${user} could not be notified as they may have their DMs closed.`);

			if (interaction.member.permissions.has([PermissionsBitField.Flags.ModerateMembers])) {
				if (interaction.guild.members.me.permissions.has([PermissionsBitField.Flags.ManageMessages])) {
					if (interaction.options.getSubcommand() === 'add') {
						let msDuration;
						let prettyMsDuration;
						try {
							msDuration = ms(rawDuration);
							prettyMsDuration = ms(msDuration, { long: true });
						} catch (error) {
							const invalidDate = new EmbedBuilder()
								.setColor('#FF5733')
								.setTitle('Error')
								.setDescription('Please try to be less specific about the time.')
								.addFields(
									{ name: 'Example', value: '**/timeout add @Antonio 50 minutes** will add a timeout of 50 minutes.' },
								);

							return await interaction.reply({ embeds: [invalidDate], ephemeral: true });
						}
						try {
							if (user.id === process.env.BOT_ID) {
								const cantTimeoutMe = new EmbedBuilder()
									.setColor('#FF5733')
									.setTitle('Error')
									.setDescription('Mirayoki can\'t be timeouted.');

								return await interaction.reply({ embeds: [cantTimeoutMe], ephemeral: true });
							} else if (user.id === interaction.user.id) {
								const cantTimeoutYourself = new EmbedBuilder()
									.setColor('#FF5733')
									.setTitle('Error')
									.setDescription('You can\'t timeout yourself.');

								return await interaction.reply({ embeds: [cantTimeoutYourself], ephemeral: true });
							} else if (member.communicationDisabledUntil) {
								const alreadyTimeouted = new EmbedBuilder()
									.setColor('#FF5733')
									.setTitle('Error')
									.setDescription(`${user} has an active timeout of **${timeoutedTime}** already.`);

								return await interaction.reply({ embeds: [alreadyTimeouted], ephemeral: true });
							} else if (msDuration > 2419200000) {
								const veryLongTimeout = new EmbedBuilder()
									.setColor('#FF5733')
									.setTitle('Error')
									.setDescription('You can only timeout someone up to **28 days**.');

								return await interaction.reply({ embeds: [veryLongTimeout], ephemeral: true });
							} else if (user.id === interaction.guild.ownerId) {
								const cantTimeoutOwner = new EmbedBuilder()
									.setColor('#FF5733')
									.setTitle('Error')
									.setDescription(`You cannot timeout <@${interaction.guild.ownerId}> because they are the owner of this server.`);

								return await interaction.reply({ embeds: [cantTimeoutOwner], ephemeral: true });
							} else if (!member.moderatable || !member.manageable) {
								const cantTimeoutSuperior = new EmbedBuilder()
									.setColor('#FF5733')
									.setTitle('Error')
									.setDescription(`${user} couldn't be timeouted because they may have higher permissions than Mirayoki.`);

								return await interaction.reply({ embeds: [cantTimeoutSuperior], ephemeral: true });
							} else if (member.permissions.has([PermissionsBitField.Flags.Administrator])) {
								const cantTimeoutAdmin = new EmbedBuilder()
									.setColor('#FF5733')
									.setTitle('Error')
									.setDescription(`${user} couldn't be timeouted because they are an Administrator of this server.`);

								return await interaction.reply({ embeds: [cantTimeoutAdmin], ephemeral: true });
							} else {
								member.timeout(msDuration, `Requested by ${interaction.user.username}`);
								const timeoutApplied = new EmbedBuilder()
									.setColor('#55C2FF')
									.setTitle(':clock3: Timeout Applied')
									.setDescription(`A timeout of ${prettyMsDuration} has been applied to ${user}.`);
								const timeoutAppliedDM = new EmbedBuilder()
									.setColor('#55C2FF')
									.setTitle(':clock3: Timeout Applied')
									.setDescription(`You have been timeouted on **${interaction.guild.name}** for **${prettyMsDuration}** by **${interaction.user}**.`);
								if (reason) {
									timeoutApplied.addFields(
										{ name: 'Reason', value: `${reason}` },
									);
									timeoutAppliedDM.addFields(
										{ name: 'Reason', value: `${reason}` },
									);
								}
								await interaction.reply({ embeds: [timeoutApplied] });
								return await client.users.cache.get(member.id).send({ embeds: [timeoutAppliedDM] }).catch(() => {interaction.followUp({ embeds: [couldntBeContacted] });});
							}
						} catch (error) {
							const unknownError = new EmbedBuilder()
								.setColor('#FF5733')
								.setTitle('Unknown Error')
								.setDescription(`${error}`)
								.setFooter({ text: 'If the error persists, please contact support using /support' });

							return await interaction.reply({ embeds: [unknownError] });
						}
					} else if (interaction.options.getSubcommand() === 'remove') {
						try {
							if (user.id === process.env.BOT_ID) {
								const cantUntimeoutMe = new EmbedBuilder()
									.setColor('#FF5733')
									.setTitle('Error')
									.setDescription('Mirayoki can\'t be untimeouted.');

								return await interaction.reply({ embeds: [cantUntimeoutMe], ephemeral: true });
							} else if (!member.communicationDisabledUntil) {
								const cantUntimeout = new EmbedBuilder()
									.setColor('#FF5733')
									.setTitle('Error')
									.setDescription(`${user} doesn't have an active timeout.`);

								return await interaction.reply({ embeds: [cantUntimeout], ephemeral: true });
							} else if (!member.moderatable || !member.manageable) {
								const cantUntimeoutSuperior = new EmbedBuilder()
									.setColor('#FF5733')
									.setTitle('Error')
									.setDescription(`${user} couldn't be untimeouted because they may have higher permissions than Mirayoki.`);

								return await interaction.reply({ embeds: [cantUntimeoutSuperior], ephemeral: true });
							} else {
								member.timeout(null, `Requested by ${interaction.user.username}`);
								const untimeoutApplied = new EmbedBuilder()
									.setColor('#55C2FF')
									.setTitle(':clock3: Timeout Removed')
									.setDescription(`A timeout of ${timeoutedTime} has been removed from ${user}.`);
								const untimeoutAppliedDM = new EmbedBuilder()
									.setColor('#55C2FF')
									.setTitle(':clock3: Timeout Removed')
									.setDescription(`Your timeout of **${timeoutedTime}** on **${interaction.guild.name}** has been removed by **${interaction.user}**.`);
								if (reason) {
									untimeoutApplied.addFields(
										{ name: 'Reason', value: `${reason}` },
									);
									untimeoutAppliedDM.addFields(
										{ name: 'Reason', value: `${reason}` },
									);
								}
								await interaction.reply({ embeds: [untimeoutApplied] });
								return await client.users.cache.get(member.id).send({ embeds: [untimeoutAppliedDM] }).catch(() => {interaction.followUp({ embeds: [couldntBeContacted] });});
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
				} else {
					const noBotPerms = new EmbedBuilder()
						.setColor('#FF5733')
						.setTitle('Error')
						.setDescription('I don\'t have the **Moderate Members** permission to run this command.')
						.setFooter({ text: 'Make sure to add it by modifying my exclusive role!' });

					return await interaction.reply({ embeds: [noBotPerms], ephemeral: true });
				}
			} else {
				const noPerms = new EmbedBuilder()

					.setColor('#FF5733')
					.setTitle('Access denied')
					.setDescription('You don\'t have the **Timeout Members** permission to run this command.');

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