module.exports = {
    name: 'ihelp',
    description: "Help for the Image Scraper module.",
    execute(client, message, args, Discord) {
        const iHelp = new Discord.MessageEmbed()

            .setColor('#25c720')
            .setTitle('Help for the Image Search module.')
            .setAuthor(`For ${message.author.username}`)
            .setDescription('Images are searched by the bot via Google™ Images in order to return the most interesting image for you.')
            .addFields(
                { name: '**Important**', value: 'Remember that many people use this bot, and Mirayoki may have problems loading the picture, if a picture Mirayoki sent didn\'t load, please click on the image, and then click "Open Original"' },
            )
            .setFooter('')
            message.channel.send(iHelp)
    }
}
