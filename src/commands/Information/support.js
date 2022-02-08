const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('support')
		.setDescription('Get assistance with Mirayoki.'),

	async execute(interaction, client) {

		let days = Math.floor(client.uptime / 86400000);
		let hours = Math.floor(client.uptime / 3600000) % 24;
		let minutes = Math.floor(client.uptime / 60000) % 60;
		let seconds = Math.floor(client.uptime / 1000) % 60;
		// This variables will be used to calculate uptime

		const support = new MessageEmbed()

			.setColor('#55C2FF')
			.setTitle('Need more help?')
			.setDescription('Our community is a welcoming and a great place to ask for help')
			.setThumbnail('https://i.postimg.cc/3xrYmKVn/logo.png')
			.addFields(
				{ name: 'Support Server', value: 'Community gathers here to share their ideas, suggestions and questions, and we always want new faces around!' },
				{ name: 'Join Support Server', value: 'https://discord.gg/sbxGVCxdTQ' },
				{ name: 'Debug Information', value: 'Our support community may ask for the following information in order to help you more efficently, this doesn\'t include any private data and it **should only** be used for support purposes.' },
				{ name: 'Version', value: `${interaction.guild.name} is running **${process.env.VERSION}**` },
				{ name: 'Uptime', value: `${days}d ${hours}h ${minutes}m ${seconds}s` },
				{ name: 'Server ID', value: `${interaction.guild.id} (${interaction.guild.name})` },
				{ name: 'User ID', value: `${interaction.user.id} (${interaction.user.tag})` },
			)
			.setFooter({ text: 'Mirayoki is an open source project of Slash Studio.' });

		return await interaction.reply({ embeds: [support] });
	}
};
