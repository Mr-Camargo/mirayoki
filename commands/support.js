module.exports = {
    name: 'support',
    description: "Further assistance for the Bot",
    execute(message, args, cmd, client, Discord) {
        const iHelp = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Need more help?')
            .setAuthor(`For ${message.author.username}`)
            .setDescription('Our community is a welcoming and a great place to ask for help')
            .setThumbnail('https://i.postimg.cc/CLWRJf9Q/Aperture-Logo.png')
            .addFields(
                { name: 'Support Server', value: 'Community gathers here to share their ideas, suggestions and questions, and we always want new faces around!' },
                { name: 'Join Support Server', value: 'http://discord.gg/ys8rW23' }
            )
            .setFooter('Mirayoki Bot is a project of the Nonprfit Organization Aperture, Inc.')
            message.channel.send(iHelp)
    }
}
