module.exports = {
    name: 'ihelp',
    aliases: ['ih'],
    description: "Help for the Image Scraper module.",
    execute(message, args, cmd, client, Discord) {
        const sorry = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('The image search function will be down for a while.')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('Due to code limitation and networking issues Image Search is temporally disabled.')
            .setFooter('Again, sorry, use -support to get updates about this issue!')
            message.channel.send(sorry)

        //const iHelp = new Discord.MessageEmbed()

            //.setColor('#25c720')
            //.setTitle('Help for the Image Search module.')
            //.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            //.setDescription('Images are searched by the bot via Google™ Images in order to return the most interesting image for you.')
            //.addFields(
            //    { name: '**Important**', value: 'Remember that many people use this bot, and Mirayoki may have problems loading the picture, if a picture Mirayoki sent didn\'t load, please click on the image, and then click "Open Original"' },
            //)
            //.setFooter('')
            //message.channel.send(iHelp)
    }
}
