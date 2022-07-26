const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder, ChannelType } = require('discord.js');
const ms = require('ms');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('slowmode')
		.setDescription('Control the flow of the conversation by enabling slowmode in the channel')
		.addNumberOption(option => option.setName('seconds').setDescription('The time you want for slowmode, in seconds. Remove slowmode by using 0 seconds.').setRequired(true))
		.addChannelOption(option => option.setName('channel').setDescription('The channel where you want the slowmode, it will be applied to the current channel if there is none')),

	async execute(interaction) {
		try {
			let channel = interaction.channel;
			if (interaction.options.getChannel('channel')) {
				channel = interaction.options.getChannel('channel');
			}
			const chosenTime = Math.round(interaction.options.getNumber('seconds'));

			const time = ms(chosenTime * 1000, { long: true });

			const newSlowmode = new EmbedBuilder()

				.setColor('#55C2FF')
				.setTitle('Slowmode applied')
				.setDescription(`${channel} now has a slowmode of **${time}**`);

			const removedSlowmode = new EmbedBuilder()

				.setColor('#55C2FF')
				.setTitle('Slowmode removed')
				.setDescription(`${channel} doesn't have a slowmode anymore.`);

			const alreadySlowmode = new EmbedBuilder()

				.setColor('#FF5733')
				.setTitle('Error')
				.setDescription(`${channel} already has a slowmode of **${time}**.`);

			const noSlowmodeToRemove = new EmbedBuilder()

				.setColor('#FF5733')
				.setTitle('Error')
				.setDescription(`${channel} doesn't have a slowmode.`);

			const invalidSlowmode = new EmbedBuilder()

				.setColor('#FF5733')
				.setTitle('Error')
				.setDescription('You can only set a slowmode up to **6 hours** (21600 seconds)');

			const noPerms = new EmbedBuilder()

				.setColor('#FF5733')
				.setTitle('Access denied')
				.setDescription('You don\'t have the **Manage Channels** permission to run this command.');

			if (interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) {
				if (channel.type === ChannelType.GuildText) {
					try {
						if (chosenTime === 0) {
							if (channel.rateLimitPerUser === 0) {
								return await interaction.reply({ embeds: [noSlowmodeToRemove], ephemeral: true });
							} else {
								channel.setRateLimitPerUser(chosenTime, `Requested by ${interaction.user.tag}`);
								return await interaction.reply({ embeds: [removedSlowmode] });
							}
						} else if (chosenTime < 0 || chosenTime > 21600) {
							return await interaction.reply({ embeds: [invalidSlowmode], ephemeral: true });
						} else if (chosenTime > 0 || chosenTime < 21600) {
							if (channel.rateLimitPerUser === chosenTime) {
								return await interaction.reply({ embeds: [alreadySlowmode], ephemeral: true });
							} else {
								if (chosenTime >= 60) {
									newSlowmode.setFooter({ text: `Specifically ${chosenTime} seconds` });
								}
								channel.setRateLimitPerUser(chosenTime, `Requested by ${interaction.user.tag}`);
								return await interaction.reply({ embeds: [newSlowmode] });
							}
						}
					} catch (error) {
						const unknownError = new EmbedBuilder()
							.setColor('#FF5733')
							.setTitle('Unknown Error')
							.setDescription(`${error}`)
							.setFooter({ text: 'If the error persists, please contact support using /support' });

						return await interaction.reply({ embeds: [unknownError] });
					}
				} else if (channel.type === ChannelType.GuildVoice) {
					const thatsAVoiceChannel = new EmbedBuilder()
						.setColor('#FF5733')
						.setTitle('Error')
						.setDescription(`Looks like ${channel} is a voice channel.`);
					return await interaction.reply({ embeds: [thatsAVoiceChannel], ephemeral: true });
				} else {
					const invalidChannel = new EmbedBuilder()
						.setColor('#FF5733')
						.setTitle('Error')
						.setDescription('Looks like the channel you mentioned is not a text channel.');
					return await interaction.reply({ embeds: [invalidChannel], ephemeral: true });
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
