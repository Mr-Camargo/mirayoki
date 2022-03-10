const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a user from the server')
		.addUserOption(option => option.setName('who').setDescription('The user that you want to kick').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Specify a reason for the kick')),

	async execute(interaction, client) {

		const user = interaction.options.getUser('who');
		const reason = interaction.options.getString('reason');
		const member = interaction.guild.members.cache.get(user.id);

		if (interaction.member.permissions.has([Permissions.FLAGS.KICK_MEMBERS])) {
			try {
				if (user.id === process.env.BOT_ID) {
					const cantKickMe = new MessageEmbed()
						.setColor('#FF5733')
						.setTitle('Error')
						.setDescription('Mirayoki can\'t be kicked this way, if you want me to leave your server kick me within the Discord app.')
						.setFooter({ text: 'Sorry if I disappointed you' });

					return await interaction.reply({ embeds: [cantKickMe], ephemeral: true });
				} else if (user.id === interaction.user.id) {
					const cantKickYourself = new MessageEmbed()
						.setColor('#FF5733')
						.setTitle('Error')
						.setDescription('You can\'t kick yourself.');

					return await interaction.reply({ embeds: [cantKickYourself], ephemeral: true });
				} else if (user.id === interaction.guild.ownerId) {
					const cantKickOwner = new MessageEmbed()
						.setColor('#FF5733')
						.setTitle('Error')
						.setDescription(`You cannot kick <@${interaction.guild.ownerId}> because they are the owner of this server.`);

					return await interaction.reply({ embeds: [cantKickOwner], ephemeral: true });
				} else if (!member.kickable || !member.manageable) {
					const cantKickSuperior = new MessageEmbed()
						.setColor('#FF5733')
						.setTitle('Error')
						.setDescription(`${user} couldn't be kicked because they may have higher permissions than Mirayoki.`);

					return await interaction.reply({ embeds: [cantKickSuperior], ephemeral: true });
				} else if (member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) {
					const cantKickAdmin = new MessageEmbed()
						.setColor('#FF5733')
						.setTitle('Error')
						.setDescription(`${user} couldn't be kicked because they are an Administrator of this server.`);

					return await interaction.reply({ embeds: [cantKickAdmin], ephemeral: true });
				} else {
					const kicked = new MessageEmbed()
						.setColor('#55C2FF')
						.setTitle(':boom: Kicked')
						.setDescription(`You have kicked ${user}.`);
					const kickedDM = new MessageEmbed()
						.setColor('#55C2FF')
						.setTitle(':boom: Kicked')
						.setDescription(`You have been kicked on **${interaction.guild.name}** by **${interaction.user}**.`);
					if (reason) {
						kicked.addFields(
							{ name: 'Reason', value: `${reason}` },
						);
						kickedDM.addFields(
							{ name: 'Reason', value: `${reason}` },
						);
					}
					await client.users.cache.get(member.id).send({ embeds: [kickedDM] });
					member.kick(`Requested by ${interaction.user.tag}`);
					return await interaction.reply({ embeds: [kicked] });
				}
			} catch (error) {
				console.error(`An error has ocurred while trying to kick ${user.tag} from ${interaction.guild.name}: ${error}`);
			}
		} else {
			const noPerms = new MessageEmbed()

				.setColor('#FF5733')
				.setTitle('Access denied')
				.setDescription('You don\'t have the **Kick Members** permission to run this command.');

			return await interaction.reply({ embeds: [noPerms], ephemeral: true });
		}
	}
};