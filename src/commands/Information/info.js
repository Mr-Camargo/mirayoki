const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Get information from a member, or this server.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('user')
				.setDescription('Information about yourself, or a user')
				.addUserOption(option => option.setName('who').setDescription('The user that you want to know about')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('server')
				.setDescription('Information about this server')),

	async execute(interaction) {
		try {
			if (interaction.options.getSubcommand() === 'user') {

				let user = interaction.user;

				const requestedUser = interaction.options.getUser('who');

				if (requestedUser && requestedUser !== user) {
					user = requestedUser;

					if (user.id === process.env.BOT_ID) {
						const me = new EmbedBuilder()
							.setColor('#55C2FF')
							.setTitle('This is **me**.')
							.setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
							.addFields(
								{ name: 'Bot Name', value: `${user.username}` },
								{ name: 'Bot ID', value: process.env.BOT_ID },
								{ name: 'I was created:', value: 'An afternoon of July 4, 2021, at 02:33:35 UTC' }
							)
							.setFooter({ text: 'Thank you for your interest of knowing me' });

						return await interaction.reply({ embeds: [me] });
					} else {
						const them = new EmbedBuilder()
							.setColor('#55C2FF')
							.setTitle(`This is **${user.username}**.`)
							.setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
							.addFields(
								{ name: 'Username', value: `${user.username}` },
								{ name: 'User ID', value: `${user.id}` },
								{ name: 'Joined Discord:', value: `${user.createdAt}` },
							)
							.setFooter({ text: 'Both of you are beautiful!' });

						return await interaction.reply({ embeds: [them] });
					}

				} else if (!requestedUser || requestedUser === user) {

					const you = new EmbedBuilder()
						.setColor('#55C2FF')
						.setTitle('This is you.')
						.setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
						.addFields(
							{ name: 'Username', value: `${user.username}` },
							{ name: 'User ID', value: `${user.id}` },
							{ name: 'Joined Discord:', value: `${user.createdAt}` },
						)
						.setFooter({ text: 'You are beautiful!' });

					return await interaction.reply({ embeds: [you] });
				}
			} else if (interaction.options.getSubcommand() === 'server') {
				const serverInfo = new EmbedBuilder()
					.setColor('#55C2FF')
					.setTitle(`This is **${interaction.guild.name}**.`)
					.setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
					.addFields(
						{ name: 'Server Name', value: `${interaction.guild.name}` },
						{ name: 'Server ID', value: `${interaction.guild.id}` },
						{ name: 'Created at:', value: `${interaction.guild.createdAt}` },
						{ name: 'Owned by:', value: `<@!${interaction.guild.ownerId}>` },
					)
					.setFooter({ text: 'This server is pretty cool!' });

				return await interaction.reply({ embeds: [serverInfo] });
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