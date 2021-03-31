module.exports = {
    name: 'adminhelp',
    aliases: ['ahelp', 'modhelp'],
    description: "Gives you information about the management of the bot.",
    execute(message, args, cmd, client, Discord) {

        const modhelp = new Discord.MessageEmbed()

            .setColor('#25c720')
            .setTitle('Help for mods/admins.')
            .setDescription('__My prefix is "-"__')
            // .setURL('url') to add a link to the title
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            // .setThumbnail('img url') to add small image next to title
            .addFields(
                { name: 'Punishments', value: 'Useful commands to punish the bad guys.' },
                { name: '-mute, -m', value: 'Mutes someone, ex: -mute @Mr_Camargo or -m @Lic_Copiloto 5m to make a timed mute. (**Timed Mutes Up to 24 Days**)', inline: true },
                { name: '-kick, -k', value: 'Kicks someone, ex: -kick @OlmedoOrla', inline: true },
                { name: '-ban, -b', value: 'Bans someone, ex: -ban @HackerPro, to unban someone refer to your admin.', inline: true },
                { name: 'Channel management', value: 'Commands to keep your channels clean and tidy.' },
                { name: '-clear, -c', value: 'Clears recent messages from a channel, ex: -clear 50', inline: true },
                { name: 'Other modules help', value: 'Different help for different things.' },
                { name: '-ihelp, -ih', value: 'Help information for the Image Search module', inline: true },
                { name: '-help, -h', value: 'General help about the bot.', inline: true },
                { name: '-rhelp', value: 'Help information for the role module', inline: true },
            )
            // .setImage('img url') to add a big image at the bottom
            // .setTimestamp() If you want to actual date
            .setFooter('Ur greeeat mod did I told ya?') // , 'img url') to add image

        message.channel.send(modhelp);
    }
}