module.exports = {
    name: 'invite',
    aliases: ['inv'],
    description: "invite the bot to your server and enjoy the power of Mirayoki.",
    execute(message, args, cmd, client, Discord, profileData) {
        const inviteMe = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Bring the power of Mirayoki to your Server.')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('With powerful moderation, timed mutes, management and more, for free.')
            .setThumbnail('https://i.postimg.cc/xCbhVM7N/discord-avatar-512-2.png')
            .addFields(
                { name: 'Invite now:', value: 'https://tiny.one/invite' },
            )
            .setFooter('Type -help for more information about this bot!')

        message.channel.send(inviteMe);
    }
}