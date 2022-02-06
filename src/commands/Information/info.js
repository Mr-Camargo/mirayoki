const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription(`Get information from a member, or this server.`)
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Information about yourself, or a user')
                .addUserOption(option => option.setName('who').setDescription('The user that you want to know about')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Information about this server')),

    async execute(interaction, client) {
        if (interaction.options.getSubcommand() === 'user') {
            let user = interaction.user;

            if (interaction.options.getUser('who')) {
                user = interaction.options.getUser('who')

                if (user.id === process.env.BOT_ID) {
                    const me = new MessageEmbed()
                        .setColor('#55C2FF')
                        .setTitle(`This is **me**.`)
                        .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
                        .addFields(
                            { name: 'Username', value: `${user.tag}` },
                            { name: 'Bot ID', value: process.env.BOT_ID },
                            { name: 'I was created:', value: 'An afternoon of July 4, 2021, at 02:33:35 UTC' }
                        )
                        .setFooter({ text: 'Thank you for your interest of knowing me' })

                    return await interaction.reply({ embeds: [me] })
                } else {
                    const them = new MessageEmbed()
                        .setColor('#55C2FF')
                        .setTitle(`This is **${user.username}**.`)
                        .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
                        .addFields(
                            { name: 'Username', value: `${user.tag}` },
                            { name: 'User ID', value: `${user.id}` },
                            { name: 'Joined Discord:', value: `${user.createdAt}` },
                        )
                        .setFooter({ text: 'Both of you are beautiful!' })

                    return await interaction.reply({ embeds: [them] });
                };

            } else if (!interaction.options.getUser('who')) {

                const you = new MessageEmbed()
                    .setColor('#55C2FF')
                    .setTitle(`This is you.`)
                    .setDescription(`And you are **${user.username}**.`)
                    .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
                    .addFields(
                        { name: 'Username', value: `${user.tag}` },
                        { name: 'User ID', value: `${user.id}` },
                        { name: 'Joined Discord:', value: `${user.createdAt}` },
                    )
                    .setFooter({ text: 'You are beautiful!' })

                return await interaction.reply({ embeds: [you] })
            }
        } else if (interaction.options.getSubcommand() === 'server') {
            const serverInfo = new MessageEmbed()
                .setColor('#55C2FF')
                .setTitle(`This is **${interaction.guild.name}**.`)
                .setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
                .addFields(
                    { name: 'Server Name', value: `${interaction.guild.name}`},
                    { name: 'Server ID', value: `${interaction.guild.id}`},
                    { name: 'Created at:', value: `${interaction.guild.createdAt}`},
                    { name: 'Owned by:', value: `<@!${interaction.guild.ownerId}>`},
                )
                .setFooter({ text: 'This server is pretty cool!' })

            return await interaction.reply({ embeds: [serverInfo] });
        }
    }
};