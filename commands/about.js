module.exports = {
    name: 'about',
    aliases: ['v', 'abt', 'version'],
    description: "Technical information about the bot.",
    execute(message, args, cmd, client, Discord, profileData) {
        const aboutEN = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Mirayoki.')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('The handsome, charming and powerful bot.')
            .setThumbnail('https://i.postimg.cc/rF4pL3YQ/miralogo.png')
            .addFields(
                { name: 'Version', value: `${message.guild.name} is running ${process.env.VERSION}` },
                { name: 'Server ID', value: `${message.guild.id} (${message.guild.name})` },
                { name: 'User ID', value: `${message.author.id} (${message.author.tag})` },
            )
            .setFooter('Mirayoki is a project of Slash Studio.')

        const aboutES = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Mirayoki.')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('El guapísimo, brillante y poderoso bot.')
            .setThumbnail('https://i.postimg.cc/rF4pL3YQ/miralogo.png')
            .addFields(
                { name: 'Versión', value: `${message.guild.name} esta corriendo ${process.env.VERSION}` },
                { name: 'ID de Servidor', value: `${message.guild.id} (${message.guild.name})` },
                { name: 'ID de Usuario', value: `${message.author.id} (${message.author.tag})` },
            )
            .setFooter('Mirayoki es un proyecto de la empresa Slash Studio.')
            if (profileData.language == 'en') {
                return message.channel.send(aboutEN);
            } else if (profileData.language == 'es') {
                return message.channel.send(aboutES);
            }
    }
}
