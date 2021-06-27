module.exports = {
    name: 'support',
    description: "Further assistance for the Bot",
    execute(message, args, cmd, client, Discord) {
        const support = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Need more help?')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('Our community is a welcoming and a great place to ask for help')
            .setThumbnail('https://i.postimg.cc/3xrYmKVn/logo.png')
            .addFields(
                { name: 'Support Server', value: 'Community gathers here to share their ideas, suggestions and questions, and we always want new faces around!' },
                { name: 'Join Support Server', value: 'https://discord.gg/sbxGVCxdTQ' },
                { name: 'Debug Information', value: 'Our support community may ask for the following information in order to help you more efficently, this doesn\'t include any private data and it **should only** be used for support purposes.' },
                { name: 'Version', value: `${message.guild.name}, is running ${process.env.VERSION}` },
                { name: 'Server ID', value: `${message.guild.id} (${message.guild.name})` },
                { name: 'User ID', value: `${message.author.id} (${message.author.tag})` },
            )
            .setFooter('Mirayoki Bot is a project of the nonprofit Slash Studio.')
        message.channel.send(support)
    }
}
