module.exports = {
    name: 'invite',
    aliases: ['inv', 'invitar'],
    description: "invite the bot to your server and enjoy the power of Mirayoki.",
    execute(message, args, cmd, client, Discord, profileData) {
        const inviteEN = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Bring the power of Mirayoki to your Server.')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('With powerful moderation, timed mutes, management and more, for free.')
            .setThumbnail('https://i.postimg.cc/rF4pL3YQ/miralogo.png')
            .addFields(
                { name: 'Invite now:', value: 'https://tiny.one/invite' },
            )
            .setFooter('Type -about for more information about this bot!')

        const inviteES = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Lleva el poder de Mirayoki a tu Servidor.')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('Con poderosa moderación, silenciadores por tiempo, administración y más, gratis.')
            .setThumbnail('https://i.postimg.cc/rF4pL3YQ/miralogo.png')
            .addFields(
                { name: 'Invita ahora:', value: 'https://tiny.one/invite' },
            )
            .setFooter('Usa -about para más informacion acerca de este bot!')

            if (profileData.language == 'en') {
                return message.channel.send(inviteEN);
        } else if (profileData.language == 'es') {
                return message.channel.send(inviteES);
        }
    }
}