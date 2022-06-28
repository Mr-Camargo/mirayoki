const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

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

			if (!channel.isThread()) {
				channelPermissions = channel.guild.roles.everyone.permissionsIn(channel);
			}

			const unlocked = new MessageEmbed()
				.setColor('#55C2FF')
				.setTitle('🔓 Unlocked channel')
				.setDescription(`${channel} has been unlocked succesfully.`);

			const unlockedAlready = new MessageEmbed()
				.setColor('#FF5733')
				.setTitle('Error')
				.setDescription('Looks like the channel you mentioned is already unlocked.');

			if (interaction.member.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS]) && interaction.guild.available) {
				if (interaction.guild.me.permissions.has([Permissions.FLAGS.MANAGE_MESSAGES, Permissions.FLAGS.CONNECT, Permissions.FLAGS.MANAGE_CHANNELS])) {
					if (channel.isThread()) {
						const cantUnlockAThread = new MessageEmbed()
							.setColor('#FF5733')
							.setTitle('Error')
							.setDescription(`You cannot unlock a thread individually. You may unlock ${channel.parent} to unlock ${channel}.`);
						return await interaction.reply({ embeds: [cantUnlockAThread], ephemeral: true });
					} else if (channel.isText() && !channel.isVoice()) {
						if (!channelPermissions.has([Permissions.FLAGS.SEND_MESSAGES] || !channelPermissions.has([Permissions.FLAGS.VIEW_CHANNEL]))) {
							channel.permissionOverwrites.edit(channel.guild.roles.everyone, { SEND_MESSAGES: true, CREATE_PUBLIC_THREADS: null, CREATE_PRIVATE_THREADS: null, SEND_MESSAGES_IN_THREADS: null });
							if (show) {
								channel.permissionOverwrites.edit(channel.guild.roles.everyone, { SEND_MESSAGES: true, CREATE_PUBLIC_THREADS: null, CREATE_PRIVATE_THREADS: null, SEND_MESSAGES_IN_THREADS: null, VIEW_CHANNEL: true });
								unlocked.setDescription(`${channel} has been unlocked succesfully and it is now visible to members.`);
							}
							channel.permissionOverwrites.delete(interaction.member);
							return await interaction.reply({ embeds: [unlocked] });
						} else if (!channelPermissions.has([Permissions.FLAGS.VIEW_CHANNEL]) && show) {
							channel.permissionOverwrites.edit(channel.guild.roles.everyone, { VIEW_CHANNEL: true });
							unlocked.setTitle('🔓 Channel shown');
							unlocked.setDescription(`${channel} was unlocked already but it is now visible to members.`);
							return await interaction.reply({ embeds: [unlocked] });
						} else {
							return await interaction.reply({ embeds: [unlockedAlready], ephemeral: true });
						}
					} else if (channel.isVoice()) {
						if (!channelPermissions.has([Permissions.FLAGS.CONNECT])) {
							channel.permissionOverwrites.edit(channel.guild.roles.everyone, { CONNECT: true, SEND_MESSAGES: true });
							if (show) {
								channel.permissionOverwrites.edit(channel.guild.roles.everyone, { CONNECT: true, SEND_MESSAGES: true, VIEW_CHANNEL: true });
								unlocked.setDescription(`${channel} has been unlocked succesfully and it is now visible to members.`);
							}
							channel.permissionOverwrites.delete(interaction.member);
							return await interaction.reply({ embeds: [unlocked] });
						} else if (!channelPermissions.has([Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.CONNECT]) && show) {
							channel.permissionOverwrites.edit(channel.guild.roles.everyone, { VIEW_CHANNEL: true });
							unlocked.setTitle('🔓 Channel shown');
							unlocked.setDescription(`${channel} was unlocked already but it is now visible to members.`);
							return await interaction.reply({ embeds: [unlocked] });
						} else {
							return await interaction.reply({ embeds: [unlockedAlready], ephemeral: true });
						}
					} else {
						const invalidChannel = new MessageEmbed()
							.setColor('#FF5733')
							.setTitle('Error')
							.setDescription('Looks like the channel you mentioned is not an unlockable channel, or an unknown error has occured.');

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