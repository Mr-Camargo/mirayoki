const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unlock')
		.setDescription('Remove the lockdown from a channel.')
		.addChannelOption(option => option.setName('channel').setDescription('The channel you want to unlock').setRequired(true))
		.addBooleanOption(option => option.setName('show').setDescription('Do you wish to show this channel to members?')),

	async execute(interaction) {
		try {
			const channel = interaction.options.getChannel('channel');
			const show = interaction.options.getBoolean('show');
			let channelPermissions = null;

			if (channel.type !== ChannelType.GuildPublicThread || channel.type !== ChannelType.GuildPrivateThread || channel.type !== ChannelType.GuildNewsThread) {
				channelPermissions = channel.permissionsFor(interaction.guild.id);
			}

			const unlocked = new EmbedBuilder()
				.setColor('#55C2FF')
				.setTitle('🔓 Unlocked channel')
				.setDescription(`${channel} has been unlocked successfully.`);

			const unlockedAlready = new EmbedBuilder()
				.setColor('#FF5733')
				.setTitle('Error')
				.setDescription('Looks like the channel you mentioned is already unlocked.');

			if (interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels]) && interaction.guild.available) {
				if (interaction.guild.members.me.permissions.has([PermissionsBitField.Flags.ManageMessages, PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.ManageChannels])) {
					if (channel.type === ChannelType.GuildPublicThread || channel.type === ChannelType.GuildPrivateThread || channel.type === ChannelType.GuildNewsThread) {
						const cantUnlockAThread = new EmbedBuilder()
							.setColor('#FF5733')
							.setTitle('Error')
							.setDescription(`You cannot unlock a thread individually. You may unlock ${channel.parent} to unlock ${channel}.`);
						return await interaction.reply({ embeds: [cantUnlockAThread], ephemeral: true });
					} else if (channel.type === ChannelType.GuildText && channel.type !== ChannelType.GuildVoice) {
						if (!channelPermissions.has([PermissionsBitField.Flags.SendMessages] || !channelPermissions.has([PermissionsBitField.Flags.ViewChannel]))) {
							channel.permissionOverwrites.edit(channel.guild.roles.everyone, { SendMessages: true, CreatePublicThreads: null, CreatePrivateThreads: null, SendMessagesInThreads: null });
							if (show) {
								channel.permissionOverwrites.edit(channel.guild.roles.everyone, { SendMessages: true, CreatePublicThreads: null, CreatePrivateThreads: null, SendMessagesInThreads: null, ViewChannel: true });
								unlocked.setDescription(`${channel} has been unlocked successfully and it is now visible to members.`);
							}
							channel.permissionOverwrites.delete(interaction.member);
							return await interaction.reply({ embeds: [unlocked] });
						} else if (!channelPermissions.has([PermissionsBitField.Flags.ViewChannel]) && show) {
							channel.permissionOverwrites.edit(channel.guild.roles.everyone, { ViewChannel: true });
							unlocked.setTitle('🔓 Channel shown');
							unlocked.setDescription(`${channel} was unlocked already but it is now visible to members.`);
							return await interaction.reply({ embeds: [unlocked] });
						} else {
							return await interaction.reply({ embeds: [unlockedAlready], ephemeral: true });
						}
					} else if (channel.type === ChannelType.GuildVoice) {
						if (!channelPermissions.has([PermissionsBitField.Flags.Connect])) {
							channel.permissionOverwrites.edit(channel.guild.roles.everyone, { Connect: true, SendMessages: true });
							if (show) {
								channel.permissionOverwrites.edit(channel.guild.roles.everyone, { Connect: true, SendMessages: true, ViewChannel: true });
								unlocked.setDescription(`${channel} has been unlocked successfully and it is now visible to members.`);
							}
							channel.permissionOverwrites.delete(interaction.member);
							return await interaction.reply({ embeds: [unlocked] });
						} else if (!channelPermissions.has([PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.Connect]) && show) {
							channel.permissionOverwrites.edit(channel.guild.roles.everyone, { ViewChannel: true });
							unlocked.setTitle('🔓 Channel shown');
							unlocked.setDescription(`${channel} was unlocked already but it is now visible to members.`);
							return await interaction.reply({ embeds: [unlocked] });
						} else {
							return await interaction.reply({ embeds: [unlockedAlready], ephemeral: true });
						}
					} else {
						const invalidChannel = new EmbedBuilder()
							.setColor('#FF5733')
							.setTitle('Error')
							.setDescription('Looks like the channel you mentioned is not an unlockable channel, or an unknown error has occurred.');

						return await interaction.reply({ embeds: [invalidChannel], ephemeral: true });
					}
				} else {
					const noBotPerms = new EmbedBuilder()

						.setColor('#FF5733')
						.setTitle('Access denied')
						.setDescription('Mirayoki does not have permission to manage channels. Please make sure Mirayoki has the following permissions in this server:\n\n-Manage Channels\n-Manage Messages\n-Connect (To Voice Channels)');

					return await interaction.reply({ embeds: [noBotPerms], ephemeral: true });
				}
			} else {
				const noPerms = new EmbedBuilder()

					.setColor('#FF5733')
					.setTitle('Access denied')
					.setDescription('You don\'t have the **Manage Channels** permission to run this command.');

				return await interaction.reply({ embeds: [noPerms], ephemeral: true });
			}
		} catch (error) {
			const unknownError = new EmbedBuilder()

				.setColor('#FF5733')
				.setTitle('Unknown Error')
				.setDescription(`${error}`)
				.setFooter({ text: 'If the error persists, please contact support using /support' });

			return await interaction.reply({ embeds: [unknownError], ephemeral: true });
		}
	}
};