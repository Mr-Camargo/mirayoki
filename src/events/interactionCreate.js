const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {

		let days = Math.floor(client.uptime / 86400000);
		let hours = Math.floor(client.uptime / 3600000) % 24;
		let minutes = Math.floor(client.uptime / 60000) % 60;
		let seconds = Math.floor(client.uptime / 1000) % 60;
		// These variables do the calculations for the Bot uptime

		if (interaction.isCommand()) {
			const command = client.commands.get(interaction.commandName);

			if (!command) return;

			try {
				await command.execute(interaction, client);
			} catch (error) {
				console.error(error);

				const severeError = new MessageEmbed()

					.setColor('#611d0e')
					.setTitle('Severe Error')
					.setDescription(`An error out of the reach of Mirayoki has happened while trying to execute this command. \n
                    This should not happen. \n
                    **If you are seeing this, contact our support team IMMEDIATELY.**`)
					.addFields(
						{ name: 'Customer Support', value: '***Please***, take the time to report this incident as quickly as possible, just screenshot this embed and explain what you did before this error appeared.' },
						{ name: 'Version', value: `${interaction.guild.name} is running **${process.env.VERSION}**` },
						{ name: 'Uptime', value: `${days}d ${hours}h ${minutes}m ${seconds}s` },
						{ name: 'Actual Time', value: `${Date()}` },
						{ name: 'Server ID', value: `${interaction.guild.id} (${interaction.guild.name})`},
						{ name: 'User ID', value: `${interaction.user.id} (${interaction.user.tag})`},
						{ name: 'Support Server', value: 'https://discord.gg/sbxGVCxdTQ' },
					);

				await interaction.reply({ embeds: [severeError], ephemeral: true });
			}
		} else if (interaction.isSelectMenu()) {
			if (interaction.customId === 'color-select') {
				let colors = '';
				await interaction.values.forEach(async value => {
					colors += `${value} `;
				});
				await interaction.reply({ content: `Your favorite colors are: ${colors}` });
			}
		}
	}
};