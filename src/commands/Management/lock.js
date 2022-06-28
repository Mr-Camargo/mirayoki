const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

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

			if (!channel.isThread()) {
				channelPermissions = channel.guild.roles.everyone.permissionsIn(channel);
			}

			const locked = new MessageEmbed()
				.setColor('#55C2FF')
				.setTitle('🔒 Locked channel')
				.setDescription(`${channel} has been locked succesfully.`);

			const lockedAlready = new MessageEmbed()
				.setColor('#FF5733')
				.setTitle('Error')
				.setDescription('Looks like the channel you mentioned is already locked.');

			if (interaction.member.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS]) && interaction.guild.available) {
				if (interaction.guild.me.permissions.has([Permissions.FLAGS.MANAGE_MESSAGES, Permissions.FLAGS.CONNECT, Permissions.FLAGS.MANAGE_CHANNELS])) {
					if (channel.isThread()) {
						const cantLockAThread = new MessageEmbed()
							.setColor('#FF5733')
							.setTitle('Error')
							.setDescription(`You cannot lock a thread individually. You may lock ${channel.parent} to lock ${channel}.`);
						return await interaction.reply({ embeds: [cantLockAThread], ephemeral: true });
					} else if (channel.isText() && !channel.isVoice()) {
						if (channelPermissions.has([Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.VIEW_CHANNEL])) {
							channel.permissionOverwrites.edit(channel.guild.roles.everyone, { SEND_MESSAGES: false, CREATE_PUBLIC_THREADS: false, CREATE_PRIVATE_THREADS: false, SEND_MESSAGES_IN_THREADS: false });
							if (hide) {
								channel.permissionOverwrites.edit(channel.guild.roles.everyone, { SEND_MESSAGES: false, CREATE_PUBLIC_THREADS: false, CREATE_PRIVATE_THREADS: false, SEND_MESSAGES_IN_THREADS: false, VIEW_CHANNEL: false });
								locked.setDescription(`${channel} has been locked succesfully and it is now hidden to members.`);
							}
							channel.permissionOverwrites.edit(interaction.member, { SEND_MESSAGES: true, VIEW_CHANNEL: true });
							return await interaction.reply({ embeds: [locked] });
						} else if (hide && !channelPermissions.has([Permissions.FLAGS.SEND_MESSAGES])) {
							channel.permissionOverwrites.edit(channel.guild.roles.everyone, { VIEW_CHANNEL: false });
							locked.setTitle('🔒 Hid channel');
							locked.setDescription(`${channel} was locked already but it is now hidden to members.`);
							return await interaction.reply({ embeds: [locked] });
						} else {
							return await interaction.reply({ embeds: [lockedAlready], ephemeral: true });
						}
					} else if (channel.isVoice()) {
						if (channelPermissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.VIEW_CHANNEL])) {
							channel.permissionOverwrites.edit(channel.guild.roles.everyone, { CONNECT: false, SEND_MESSAGES: false });
							if (hide) {
								channel.permissionOverwrites.edit(channel.guild.roles.everyone, { CONNECT: false, SEND_MESSAGES: false, VIEW_CHANNEL: false });
								locked.setDescription(`${channel} has been locked succesfully and it is now hidden to members.`);
							}
							channel.permissionOverwrites.edit(interaction.member, { CONNECT: true, SEND_MESSAGES: true, VIEW_CHANNEL: true });
							return await interaction.reply({ embeds: [locked] });
						} else if (channelPermissions.has([Permissions.FLAGS.VIEW_CHANNEL]) && hide) {
							channel.permissionOverwrites.edit(channel.guild.roles.everyone, { VIEW_CHANNEL: false });
							locked.setTitle('🔒 Hid channel');
							locked.setDescription(`${channel} was locked already but it is now hidden to members.`);
							return await interaction.reply({ embeds: [locked] });
						} else {
							return await interaction.reply({ embeds: [lockedAlready], ephemeral: true });
						}
					} else {
						const invalidChannel = new MessageEmbed()
							.setColor('#FF5733')
							.setTitle('Error')
							.setDescription('Looks like the channel you mentioned is not an lockable channel, or an unknown error has occured.');

						return await interaction.reply({ embeds: [invalidChannel], ephemeral: true });
					}
				} else {
					const noBotPerms = new MessageEmbed()

						.setColor('#FF5733')
						.setTitle('Access denied')
						.setDescription('Mirayoki does not have permission to manage channels. Please make sure Mirayoki has the following permissions in this server:\n\n-Manage Channels\n-Manage Messages\n-Connect (To Voice Channels)');

					return await interaction.reply({ embeds: [noBotPerms], ephemeral: true });
				}
			} else {
				const noPerms = new MessageEmbed()

					.setColor('#FF5733')
					.setTitle('Access denied')
					.setDescription('You don\'t have the **Manage Channels** permission to run this command.');

				return await interaction.reply({ embeds: [noPerms], ephemeral: true });
			}
		} catch (error) {
			const unknownError = new MessageEmbed()

				.setColor('#FF5733')
				.setTitle('Unknown Error')
				.setDescription(`${error}`)
				.setFooter({ text: 'If the error presists, contact support using /support' });

			return await interaction.reply({ embeds: [unknownError], ephemeral: true });
		}
	}
};