const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Bring the power of Mirayoki to your server'),

	async execute(interaction, client) {

		const invite = new MessageEmbed()

			.setColor('#55C2FF')
			.setTitle('Mirayoki.')
			.setURL('https://discord.com/api/oauth2/authorize?client_id=795480018469781505&permissions=8&scope=applications.commands%20bot')
			.setDescription('The handsome, charming and powerful bot.')
			.setThumbnail('https://i.postimg.cc/rF4pL3YQ/miralogo.png')
			.setFooter({ text: 'Click the link to add it to your server!' });

		return await interaction.reply({ embeds: [invite] });
	}
};
