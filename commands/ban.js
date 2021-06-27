module.exports = {
    name: 'ban',
    aliases: ['b'],
    description: "the big hammer",
    execute(message, args, cmd, client, Discord) {

        const member = message.mentions.users.first();

        const errorBan = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('There was an error while banning this member. (Did you mention it?)')

        const noPerms = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Access denied')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('You don\'t have the **Ban Members** permission to ban someone!')

        const noImNot = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('There is a button to leave the server, so no need to ban yourself, you just leave and don\'t come back.')

        const niceTry = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Nice try')
            .setDescription(`ROBOTS ARE BETTER THAN YOU.`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('')



        if (message.member.permissions.has("BAN_MEMBERS")) {
            if (member) {
                if (member == message.author.id) return message.channel.send(noImNot);
                const memberTarget = message.guild.members.cache.get(member.id);
                if (memberTarget == 795480018469781505 || 834492523295801355) return message.channel.send(niceTry);
                const banOK = new Discord.MessageEmbed()

                    .setColor('#55C2FF')
                    .setTitle('Banned succesfully')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`@${memberTarget.user.id} has been banned.`)
                memberTarget.ban();
                message.channel.send(banOK);
                message.delete();
            } else {
                message.channel.send(errorBan)
            }
        } else {
            message.channel.send(noPerms);
        }
    }
}