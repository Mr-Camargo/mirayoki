const { EmbedBuilder, InteractionType } = require('discord.js');
const color = require('cli-color');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {

		const days = Math.floor(client.uptime / 86400000);
		const hours = Math.floor(client.uptime / 3600000) % 24;
		const minutes = Math.floor(client.uptime / 60000) % 60;
		const seconds = Math.floor(client.uptime / 1000) % 60;
		// These variables do the calculations for the Bot uptime

		if (interaction.type === InteractionType.ApplicationCommand) {
			const command = client.commands.get(interaction.commandName);

			if (!command) return;

			try {
				if (interaction.guild == null) {
					// If the user wants to use commands in a Direct Message ...
					const noDMCommands = new EmbedBuilder()

						.setColor('#FF5733')
						.setTitle('Error')
						.setDescription('Mirayoki doesn\'t work on **Direct Messages** *yet*.');

					return await interaction.reply({ embeds: [noDMCommands], ephemeral: true });
					// ... An error message will appear.
				} else {
					await command.execute(interaction, client);
				}
			} catch (error) {
				console.log(color.redBright('FATAL'), `An error has ocurred while executing an interaction: ${error}`, color.blackBright(`at ${Date()}`));

				const severeError = new EmbedBuilder()

					.setColor('#611d0e')
					.setTitle('Severe Error')
					.setDescription(`An error out of the reach of Mirayoki has happened while trying to execute this command. \n
                    This should not happen. \n
                    **If you are seeing this, contact our support team IMMEDIATELY.**`)
					.addFields(
						{ name: 'Customer Support', value: '***Please***, take the time to report this incident as quickly as possible, just screenshot this embed and explain what you did before this error appeared.' },
						{ name: 'Version', value: `${interaction.guild.name} is running **${process.env.OS_VERSION} (${process.env.COMMIT})**` },
						{ name: 'Cluster Uptime', value: `${days}d ${hours}h ${minutes}m ${seconds}s` },
						{ name: 'Actual Time', value: `${Date()}` },
						{ name: 'Server ID', value: `${interaction.guild.id} (${interaction.guild.name})` },
						{ name: 'User ID', value: `${interaction.user.id} (${interaction.user.tag})` },
						{ name: 'Support Server', value: '**Currently Unavailable.**\nFeel free to go to https://mirayoki.com/help for more assistance options.' },
					);

				return await interaction.reply({ embeds: [severeError], ephemeral: true });
			}
		}
	}
};