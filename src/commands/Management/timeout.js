const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
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

		if (interaction.member.permissions.has([Permissions.FLAGS.MODERATE_MEMBERS])) {
			if (interaction.options.getSubcommand() === 'add') {
				let msDuration;
				let prettyMsDuration;
				try {
					msDuration = ms(rawDuration);
					prettyMsDuration = ms(msDuration, { long: true });
				} catch (error) {
					const invalidDate = new MessageEmbed()
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
						const cantTimeoutMe = new MessageEmbed()
							.setColor('#FF5733')
							.setTitle('Error')
							.setDescription('Mirayoki can\'t be timeouted.');

						return await interaction.reply({ embeds: [cantTimeoutMe], ephemeral: true });
					} else if (user.id === interaction.user.id) {
						const cantTimeoutYourself = new MessageEmbed()
							.setColor('#FF5733')
							.setTitle('Error')
							.setDescription('You can\'t timeout yourself.');

						return await interaction.reply({ embeds: [cantTimeoutYourself], ephemeral: true });
					} else if (member.communicationDisabledUntil) {
						const alreadyTimeouted = new MessageEmbed()
							.setColor('#FF5733')
							.setTitle('Error')
							.setDescription(`${user} has an active timeout of **${timeoutedTime}** already.`);

						return await interaction.reply({ embeds: [alreadyTimeouted], ephemeral: true });
					} else if (msDuration > 2419200000) {
						const veryLongTimeout = new MessageEmbed()
							.setColor('#FF5733')
							.setTitle('Error')
							.setDescription('You can only timeout someone up to **28 days**.');

						return await interaction.reply({ embeds: [veryLongTimeout], ephemeral: true });
					} else if (user.id === interaction.guild.ownerId) {
						const cantTimeoutOwner = new MessageEmbed()
							.setColor('#FF5733')
							.setTitle('Error')
							.setDescription(`You cannot timeout <@${interaction.guild.ownerId}> because they are the owner of this server.`);

						return await interaction.reply({ embeds: [cantTimeoutOwner], ephemeral: true });
					} else if (!member.moderatable || !member.manageable) {
						const cantTimeoutSuperior = new MessageEmbed()
							.setColor('#FF5733')
							.setTitle('Error')
							.setDescription(`${user} couldn't be timeouted because they may have higher permissions than Mirayoki.`);

						return await interaction.reply({ embeds: [cantTimeoutSuperior], ephemeral: true });
					} else if (member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) {
						const cantTimeoutAdmin = new MessageEmbed()
							.setColor('#FF5733')
							.setTitle('Error')
							.setDescription(`${user} couldn't be timeouted because they are an Administrator of this server.`);

						return await interaction.reply({ embeds: [cantTimeoutAdmin], ephemeral: true });
					} else {
						member.timeout(msDuration, `Requested by ${interaction.user}`);
						const timeoutApplied = new MessageEmbed()
							.setColor('#55C2FF')
							.setTitle(':clock3: Timeout Applied')
							.setDescription(`A timeout of ${prettyMsDuration} has been applied to ${user}.`);
						const timeoutAppliedDM = new MessageEmbed()
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
						client.users.cache.get(member.id).send({ embeds: [timeoutAppliedDM] });
						return await interaction.reply({ embeds: [timeoutApplied] });
					}
				} catch (error) {
					console.error(`An error has ocurred while trying to add a timeout to ${user.tag} at ${interaction.guild.name}: ${error}`);
				}
			} else if (interaction.options.getSubcommand() === 'remove') {
				try {
					if (user.id === process.env.BOT_ID) {
						const cantUntimeoutMe = new MessageEmbed()
							.setColor('#FF5733')
							.setTitle('Error')
							.setDescription('Mirayoki can\'t be untimeouted.');

						return await interaction.reply({ embeds: [cantUntimeoutMe], ephemeral: true });
					} else if (!member.communicationDisabledUntil) {
						const cantUntimeout = new MessageEmbed()
							.setColor('#FF5733')
							.setTitle('Error')
							.setDescription(`${user} doesn't have an active timeout.`);

						return await interaction.reply({ embeds: [cantUntimeout], ephemeral: true });
					} else if (!member.moderatable || !member.manageable) {
						const cantUntimeoutSuperior = new MessageEmbed()
							.setColor('#FF5733')
							.setTitle('Error')
							.setDescription(`${user} couldn't be untimeouted because they may have higher permissions than Mirayoki.`);

						return await interaction.reply({ embeds: [cantUntimeoutSuperior], ephemeral: true });
					} else {
						member.timeout(null, `Requested by ${interaction.user}`);
						const untimeoutApplied = new MessageEmbed()
							.setColor('#55C2FF')
							.setTitle(':clock3: Timeout Removed')
							.setDescription(`A timeout of ${timeoutedTime} has been removed from ${user}.`);
						const untimeoutAppliedDM = new MessageEmbed()
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
						client.users.cache.get(member.id).send({ embeds: [untimeoutAppliedDM] });
						return await interaction.reply({ embeds: [untimeoutApplied] });
					}
				} catch (error) {
					console.error(`An error has ocurred while trying to remove a timeout to ${user.tag} at ${interaction.guild.name}: ${error}`);
				}
			}
		} else {
			const noPerms = new MessageEmbed()

				.setColor('#FF5733')
				.setTitle('Access denied')
				.setDescription('You don\'t have the **Timeout Members** permission to run this command.');

			return await interaction.reply({ embeds: [noPerms], ephemeral: true });
		}
	}
};