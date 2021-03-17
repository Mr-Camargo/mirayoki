module.exports = {
    name: 'ban',
    aliases: ['b'],
    description: "the big hammer",
    execute(message, args, cmd, client, Discord) {

        const errorBan = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(`For ${message.author.username}`)
            .setDescription('There was an error while banning this member. (Did you mention it?)')

        const noPerms = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Access denied')
            .setAuthor(`For ${message.author.username}`)
            .setDescription('Are you really trying to ban someone?')

        const member = message.mentions.users.first();
        if (message.member.roles.cache.has('796083018937794591')) {
            if (member) {
                const memberTarget = message.guild.members.cache.get(member.id);
                const banOK = new Discord.MessageEmbed()

                    .setColor('#55C2FF')
                    .setTitle('Banned succesfully')
                    .setAuthor(`For ${message.author.username}`)
                    .setDescription(`@${memberTarget.user.id} has been banned.`)
                memberTarget.ban();
                message.channel.send(banOK);
            } else {
                message.channel.send(errorBan)
            }
        } else {
            message.channel.send(noPerms);
            //message.channel.send('Are you really trying to ban someone?');
        }
    }
}