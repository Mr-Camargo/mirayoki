module.exports = {
    name: 'unmute',
    aliases: ['um'],
    description: "unmutes someone that has been previously muted",
    execute(message, args, cmd, client, Discord, profileData) {

        const noPerms = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Access denied')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('You don\'t have the **Kick Members** permission to mute someone!')

        const errorUnmute = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('There was an error while unmuting this member. (Did you mention it?)')

        const noImNot = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('You can\'t unmute yourself.')

        const niceTry = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Nice try')
            .setDescription(`I was never muted. And will never be.`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('')


        if (message.member.permissions.has("KICK_MEMBERS")) {
            const target = message.mentions.users.first();
            if (target) {
                if (target == message.author.id) return message.channel.send(noImNot);
                let memberTarget = message.guild.members.cache.get(target.id);
                if (memberTarget == 795480018469781505 || 834492523295801355) return message.channel.send(niceTry);
                const unmuteOK = new Discord.MessageEmbed()

                    .setColor('#55C2FF')
                    .setTitle('Unmuted succesfully')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`<@${memberTarget.user.id}> has been unmuted.`)

                memberTarget.roles.add('796931063120920636');
                memberTarget.roles.remove('796927664475865148');
                message.channel.send(unmuteOK);
                message.delete();
            } else {
                message.channel.send(errorUnmute);
            }
        } else {
            message.channel.send(noPerms);
        }
    }
}