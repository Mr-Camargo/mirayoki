module.exports = {
    name: 'about',
    aliases: ['v', 'abt', 'version'],
    description: "Technical information about the bot.",
    execute(message, args, cmd, client, Discord) {
        const about = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Mirayoki.')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('The handsome, charming and powerful bot.')
            .setThumbnail('https://i.postimg.cc/3xrYmKVn/logo.png')
            .addFields(
                { name: 'Version', value: `${message.guild.name}, is running ${process.env.VERSION}` },
                { name: 'Server ID', value: `${message.guild.id} (${message.guild.name})` },
                { name: 'User ID', value: `${message.author.id} (${message.author.tag})` },
            )
            .setFooter('Mirayoki Bot is a project of the nonprofit Slash Studio.')
        message.channel.send(about)
    }
}
