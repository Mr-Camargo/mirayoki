const { EmbedBuilder, PermissionsBitField, ChannelType, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lock')
		.setDescription('Lock down a channel.')
		.addChannelOption(option => option.setName('channel').setDescription('The channel you want to lock down').setRequired(true))
		.addBooleanOption(option => option.setName('hide').setDescription('Do you wish to hide this channel from members?')),

	async execute(interaction) {
		try {
			const channel = interaction.options.getChannel('channel');
			const hide = interaction.options.getBoolean('hide');
			let channelPermissions = null;

			if (channel.type !== ChannelType.GuildPublicThread || channel.type !== ChannelType.GuildPrivateThread || channel.type !== ChannelType.GuildNewsThread) {
				channelPermissions = channel.permissionsFor(interaction.guild.id);
			}

			const locked = new EmbedBuilder()
				.setColor('#55C2FF')
				.setTitle('🔒 Locked channel')
				.setDescription(`${channel} has been locked successfully.`);

			const lockedAlready = new EmbedBuilder()
				.setColor('#FF5733')
				.setTitle('Error')
				.setDescription('Looks like the channel you mentioned is already locked.');

			if (interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels]) && interaction.guild.available) {
				if (interaction.guild.members.me.permissions.has([PermissionsBitField.Flags.ManageMessages, PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.ManageChannels])) {
					if (channel.type === ChannelType.GuildPublicThread || channel.type === ChannelType.GuildPrivateThread || channel.type === ChannelType.GuildNewsThread) {
						const cantLockAThread = new EmbedBuilder()
							.setColor('#FF5733')
							.setTitle('Error')
							.setDescription(`You cannot lock a thread individually. You may lock ${channel.parent} to lock ${channel}.`);
						return await interaction.reply({ embeds: [cantLockAThread], ephemeral: true });
					} else if (channel.type === ChannelType.GuildText && channel.type !== ChannelType.GuildVoice) {
						if (channelPermissions.has([PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel])) {
							channel.permissionOverwrites.edit(channel.guild.roles.everyone, { SendMessages: false, CreatePublicThreads: false, CreatePrivateThreads: false, SendMessagesInThreads: false });
							if (hide) {
								channel.permissionOverwrites.edit(channel.guild.roles.everyone, { SendMessages: false, CreatePublicThreads: false, CreatePrivateThreads: false, SendMessagesInThreads: false, ViewChannel: false });
								locked.setDescription(`${channel} has been locked successfully and it is now hidden to members.`);
							}
							channel.permissionOverwrites.edit(interaction.member, { SendMessages: true, ViewChannel: true });
							return await interaction.reply({ embeds: [locked] });
						} else if (hide && !channelPermissions.has([PermissionsBitField.Flags.SendMessages])) {
							channel.permissionOverwrites.edit(channel.guild.roles.everyone, { ViewChannel: false });
							locked.setTitle('🔒 Hid channel');
							locked.setDescription(`${channel} was locked already but it is now hidden to members.`);
							return await interaction.reply({ embeds: [locked] });
						} else {
							return await interaction.reply({ embeds: [lockedAlready], ephemeral: true });
						}
					} else if (channel.type === ChannelType.GuildVoice) {
						if (channelPermissions.has([PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.ViewChannel])) {
							channel.permissionOverwrites.edit(channel.guild.roles.everyone, { Connect: false, SendMessages: false });
							if (hide) {
								channel.permissionOverwrites.edit(channel.guild.roles.everyone, { Connect: false, SendMessages: false, ViewChannel: false });
								locked.setDescription(`${channel} has been locked successfully and it is now hidden to members.`);
							}
							channel.permissionOverwrites.edit(interaction.member, { Connect: true, SendMessages: true, ViewChannel: true });
							return await interaction.reply({ embeds: [locked] });
						} else if (channelPermissions.has([PermissionsBitField.Flags.ViewChannel]) && hide) {
							channel.permissionOverwrites.edit(channel.guild.roles.everyone, { ViewChannel: false });
							locked.setTitle('🔒 Hid channel');
							locked.setDescription(`${channel} was locked already but it is now hidden to members.`);
							return await interaction.reply({ embeds: [locked] });
						} else {
							return await interaction.reply({ embeds: [lockedAlready], ephemeral: true });
						}
					} else {
						const invalidChannel = new EmbedBuilder()
							.setColor('#FF5733')
							.setTitle('Error')
							.setDescription('Looks like the channel you mentioned is not an lockable channel, or an unknown error has occurred.');

						console.log(`${channel}.`);
						console.log(`${channel.type}.`);
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