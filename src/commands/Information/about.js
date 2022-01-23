const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription(`Get information about Mirayoki.`),

    async execute(interaction, client) {

        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;
        // These variables do the calculations for the Bot uptime

        const about = new MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Mirayoki.')
            .setDescription('The handsome, charming and powerful bot.')
            .setThumbnail('https://i.postimg.cc/rF4pL3YQ/miralogo.png')
            .addFields(
                { name: 'Version', value: `${interaction.guild.name} is running **${process.env.VERSION}**` },
                { name: 'Uptime', value: `${days}d ${hours}h ${minutes}m ${seconds}s` },
                { name: 'Server ID', value: `${interaction.guild.id} (${interaction.guild.name})` },
                { name: 'User ID', value: `${interaction.user.id} (${interaction.user.tag})` },
            )
            .setFooter({ text: 'Mirayoki is an open source project of Slash Studio.'})

        await interaction.reply({ embeds: [about] });
    }
};
