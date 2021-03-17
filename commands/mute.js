const ms = require('ms');
module.exports = {
    name: 'mute',
    aliases: ['m'],
    description: "just mute",
    execute(message, args, cmd, client, Discord) {
        const noPerms = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Access denied')
            .setAuthor(`For ${message.author.username}`)
            .setDescription('Are you really trying to mute someone?')

        const errorMute = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(`For ${message.author.username}`)
            .setDescription('There was an error while muting this member. (Did you mention it?)')

        if (message.member.roles.cache.has('796083018937794591')) {
            const target = message.mentions.users.first();
            if (target) {
                let memberTarget = message.guild.members.cache.get(target.id);
                if (!args[1]) {
                    const muteOK = new Discord.MessageEmbed()

                        .setColor('#55C2FF')
                        .setTitle('Muted succesfully')
                        .setAuthor(`For ${message.author.username}`)
                        .setDescription(`<@${memberTarget.user.id}> has been muted.`)
                    memberTarget.roles.remove('796931063120920636');
                    memberTarget.roles.add('796927664475865148');
                    message.channel.send(muteOK);
                    return
                }
                const timedMuteOK = new Discord.MessageEmbed()

                    .setColor('#55C2FF')
                    .setTitle('Muted succesfully')
                    .setAuthor(`For ${message.author.username}`)
                    .setDescription(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`)
                memberTarget.roles.remove('796931063120920636');
                memberTarget.roles.add('796927664475865148');
                message.channel.send(timedMuteOK);

                setTimeout(function () {
                    memberTarget.roles.remove('796927664475865148');
                    memberTarget.roles.add('796931063120920636');
                }, ms(args[1]))
            } else {
                message.channel.send(errorMute);
            }
        } else {
            message.channel.send(noPerms);
        }
    }
}