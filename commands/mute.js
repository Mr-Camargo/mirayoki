const ms = require('ms');
// Timed mutes require the ms module
module.exports = {
    name: 'mute',
    aliases: ['m'],
    description: "mutes someone, and dont let them read or write any messages (Think of it as a soft ban)",
    execute(message, args, cmd, client, Discord, profileData) {
        const noPerms = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Access denied')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('You don\'t have the **Kick Members** permission to mute someone!')

        const errorMute = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('There was an error while muting this member. (Did you mention it?)')

        const noImNot = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('You can\'t mute yourself.')

        const niceTry = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Nice try')
            .setDescription(`ROBOTS ARE BETTER THAN YOU.`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('')

        if (message.member.permissions.has("KICK_MEMBERS")) {
            // This will check if the user has the Kick Members permission on their server
            const target = message.mentions.users.first();
            if (target) {
                if (target == message.author.id) return message.channel.send(noImNot);
                // This is a security measure, so no one can mute themselves
                let memberTarget = message.guild.members.cache.get(target.id);
                /* Once the Bot has checked that the user that was specified is 
               NOT the author of that message, then the target gets noted for a soon-to-be mute */
                if (memberTarget == 795480018469781505 || 834492523295801355) return message.channel.send(niceTry);
                /* This checks that the user doesn't want to mute Mirayoki
                using a command from itself, as it would break the bot.*/
                if (!args[1]) {
                    const muteOK = new Discord.MessageEmbed()

                        .setColor('#55C2FF')
                        .setTitle('Muted succesfully')
                        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                        .setDescription(`<@${memberTarget.user.id}> has been muted.`)
                    memberTarget.roles.remove('796931063120920636');
                    memberTarget.roles.add('796927664475865148');
                    /* Once all those checks have passed, 
                    the specified member is muted using roles */
                    message.channel.send(muteOK);
                    // ... and returns a success message.
                    message.delete();
                    return
                }
                const timedMuteOK = new Discord.MessageEmbed()

                    .setColor('#55C2FF')
                    .setTitle('Muted succesfully')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`)
                memberTarget.roles.remove('796931063120920636');
                memberTarget.roles.add('796927664475865148');
                message.channel.send(timedMuteOK);
                message.delete();

                /* Once all those checks have passed, 
                the specified member is muted using roles... */
                setTimeout(function () {
                    memberTarget.roles.remove('796927664475865148');
                    memberTarget.roles.add('796931063120920636');
                }, ms(args[1]))
                // and the specified time
            } else {
                message.channel.send(errorMute);
                /* If the user doesn't mention someone when muting, or if the specified user has 
                left the server already, an error message appears. */
            }
        } else {
            message.channel.send(noPerms);
            // In case the user doesn't have the Kick Members permission, an error message will appear.
        }
    }
}