module.exports = {
    name: 'help',
    description: "Gives you information about the bot.",
    execute(client, message, args, Discord) {

        const newEmbed = new Discord.MessageEmbed()

            .setColor('#25c720')
            .setTitle('Need help huh?')
            .setDescription('__My prefix is "-"__')
            // .setURL('url') to add a link to the title
            .setAuthor(`For ${message.author.username}`)
            // .setThumbnail('img url') to add small image next to title
            .addFields(
                { name: 'Commands', value: 'Useful basic features to help you in your Discord tasks.' },
                { name: '-ping', value: 'Replies to you with your actual ping', inline: true },
                { name: '-perms', value: 'Tells you your permissions on this server', inline: true },
                { name: '-status', value: 'Tells you current status of the bot', inline: true },
                { name: 'Useful Commands', value: 'Commands made to enhance your Discord Experience.' },
                { name: '-image', value: 'Searches an Image Online and returns it to you.', inline: true },
                { name: 'Other modules help', value: 'Different help for different things.' },
                { name: '-ihelp', value: 'Help information for the Image Search module', inline: true },
                { name: '-rhelp', value: 'Help information for the role module', inline: true },
                { name: '-adminhelp', value: 'Help information about the Administration of the bot', inline: true },
            )
            // .setImage('img url') to add a big image at the bottom
            // .setTimestamp() If you want to actual date
            .setFooter('If you are still having trouble, be sure to type -support for help!') // , 'img url') to add image

        message.channel.send(newEmbed);
    }
}