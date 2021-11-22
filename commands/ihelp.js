module.exports = {
    name: 'ihelp',
    aliases: ['ih'],
    description: "Help for the Image Scraper module.",
    execute(message, args, cmd, client, Discord, profileData) {
        const sorryEN = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('The image search function will be down for a while.')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('Due to code limitation and networking issues Image Search is temporally disabled.')
            .setFooter('Again, sorry, use -support to get updates about this issue!')

        const sorryES = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('La función de buscar imagen estará abajo por un tiempo.')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('Debido a limitaciones de código y problemas de red, Buscar Imagen esta temporalmente desactivado.')
            .setFooter('Lo sentimos, por favor usa -support para obtener actualizaciones de este problema!')

        if (profileData.language == 'en') {
                return message.channel.send(sorryEN);
        } else if (profileData.language == 'es') {
                return message.channel.send(sorryES);
        } // Returns an error message with the explanation of this problem


        /* const iHelp = new Discord.MessageEmbed()

        .setColor('#25c720')
        .setTitle('Help for the Image Search module.')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription('Images are searched by the bot via Google™ Images in order to return the most interesting image for you.')
        .addFields(
            { name: '**Important**', value: 'Remember that many people use this bot, and Mirayoki may have problems loading the picture, if a picture Mirayoki sent didn\'t load, please click on the image, and then click "Open Original"' },
        )
        .setFooter('')
        message.channel.send(iHelp) */
    }
}
