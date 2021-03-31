module.exports = {
    name: 'unmute',
    aliases: ['um'],
    description: "unmutes",
    execute(message, args, cmd, client, Discord) {

        const noPerms = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Access denied')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('Are you really trying to unmute someone?')

        const errorUnmute = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('There was an error while unmuting this member. (Did you mention it?)')

        if (message.member.roles.cache.has('796083018937794591')) {
            const target = message.mentions.users.first();
            if (target) {
                let memberTarget = message.guild.members.cache.get(target.id);
                const unmuteOK = new Discord.MessageEmbed()

                    .setColor('#55C2FF')
                    .setTitle('Unmuted succesfully')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`<@${memberTarget.user.id}> has been unmuted.`)

                memberTarget.roles.add('796931063120920636');
                memberTarget.roles.remove('796927664475865148');
                message.channel.send(unmuteOK);
            } else {
                message.channel.send(errorUnmute);
            }
        } else {
            message.channel.send(noPerms);
        }
    }
}