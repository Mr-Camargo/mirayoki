module.exports = {
    name: 'adminhelp',
    description: "Gives you information about the management of the bot.",
    execute(client, message, args, Discord) {

        const newEmbed = new Discord.MessageEmbed()

            .setColor('#25c720')
            .setTitle('Help for mods/admins.')
            .setDescription('__My prefix is "-"__')
            // .setURL('url') to add a link to the title
            .setAuthor(`For ${message.author.username}`)
            // .setThumbnail('img url') to add small image next to title
            .addFields(
                { name: 'Punishments', value: 'Useful commands to punish the bad guys.' },
                { name: '-mute', value: 'Mutes someone, ex: -mute @Mr_Camargo or -mute @Lic_Copiloto 5m to make a timed mute. (**Timed Mutes Up to 24 Days**)', inline: true },
                { name: '-kick', value: 'Kicks someone, ex: -kick @OlmedoOrla', inline: true },
                { name: '-ban', value: 'Bans someone, ex: -ban @HackerPro, to unban someone refer to your admin.', inline: true },
                { name: 'Channel management', value: 'Commands to keep your channels clean and tidy.' },
                { name: '-clear', value: 'Clears recent messages from a channel, ex: -clear 50', inline: true },
                { name: 'Other modules help', value: 'Different help for different things.' },
                { name: '-ihelp', value: 'Help information for the Image Search module', inline: true },
                { name: '-help', value: 'General help about the bot.', inline: true },
                { name: '-rhelp', value: 'Help information for the role module', inline: true },
            )
            // .setImage('img url') to add a big image at the bottom
            // .setTimestamp() If you want to actual date
            .setFooter('Ur greeeat mod did I told ya?') // , 'img url') to add image

        message.channel.send(newEmbed);
    }
}