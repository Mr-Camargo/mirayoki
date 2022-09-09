const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nick')
		.setDescription('Change your nickname, or someone else\'s')
		.addStringOption(option => option.setName('nick').setDescription('The nickname you want to set').setRequired(true))
		.addUserOption(option => option.setName('who').setDescription('The user you want to change the nickname of'))
		.addStringOption(option => option.setName('reason').setDescription('The reason of the nickname change, if any')),

	async execute(interaction) {

		try {
			const newNick = interaction.options.getString('nick');
			const user = interaction.options.getUser('who') ? interaction.options.getUser('who') : interaction.user;
			const member = interaction.guild.members.cache.get(user.id);
			const oldNick = member.displayName;
			const reason = interaction.options.getString('reason') ? interaction.options.getString('reason') : null;

			if (interaction.member.permissions.has([PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ChangeNickname])) {
				if (interaction.guild.members.me.permissions.has([PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ChangeNickname])) {
					if (member.manageable || member.id === process.env.BOT_ID) {
						member.setNickname(newNick, reason);
						const nicknameChanged = new EmbedBuilder()
							.setTitle('Nickname changed')
							.setColor('#55C2FF')
							.setDescription(`${user}'s nickname has been changed.`)
							.setFields([ { name: 'Past Nickname', value: oldNick, inline: true }, { name: 'New nickname', value: newNick, inline: true } ]);
						if (reason) nicknameChanged.addFields([ { name: 'Reason', value: reason } ]);
						if (member.id === user.id) nicknameChanged.setDescription('You have changed your nickname.');
						if (member.id === process.env.BOT_ID) nicknameChanged.setDescription('I have changed my nickname.');
						return await interaction.reply({ embeds: [nicknameChanged] });
					} else {
						const nicknameCantBeChanged = new EmbedBuilder()
							.setTitle('Error')
							.setColor('#FF5733')
							.setDescription(`${user}'s nickname couldn't be changed because they may have higher permissions than Mirayoki.`);
						return await interaction.reply({ embeds: [nicknameCantBeChanged], ephemeral: true });
					}
				} else {
					const noBotPerms = new EmbedBuilder()
						.setColor('#FF5733')
						.setTitle('Error')
						.setDescription('I don\'t have the **Manage Nicknames** and **Change Nickname** permissions to run this command.')
						.setFooter({ text: 'Make sure to add them by modifying my exclusive role!' });

					return await interaction.reply({ embeds: [noBotPerms], ephemeral: true });
				}
			} else {
				const noPerms = new EmbedBuilder()

					.setColor('#FF5733')
					.setTitle('Access denied')
					.setDescription('You don\'t have the **Manage Nicknames** and **Change Nickname** permissions to run this command.');

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