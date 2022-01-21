const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription(`Replies with the bot's current ping`),

	async execute(interaction) {
		const pinging = new MessageEmbed()

		.setColor('#55C2FF')
		.setTitle('Pinging...')

		const sent = await interaction.reply({ embeds: [pinging], fetchReply: true });

		const ping = new MessageEmbed()

			.setColor('#55C2FF')
			.setTitle('Pong!')
			.setDescription(`Latency is ${sent.createdTimestamp - interaction.createdTimestamp}ms`)
			
		interaction.editReply({ embeds: [ping]});
		/* Returns an informative message with the ping, which is calculated
		with the time the Bot took to read and reply to the message. */
	},
};
