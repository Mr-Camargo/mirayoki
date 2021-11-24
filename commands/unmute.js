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
            // This will check if the user has the Kick Members permission on their server
            const target = message.mentions.users.first();
            if (target) {
                if (target == message.author.id) return message.channel.send(noImNot);
                /* This is a security measure, so no one can unmute themselves
                 (that makes no sense and maybe its impossible) */
                let memberTarget = message.guild.members.cache.get(target.id);
                /* Once the Bot has checked that the user that was specified is 
               NOT the author of that message, then the target gets noted for a soon-to-be unmute */
                if (memberTarget ==  process.env.BOT_ID) return message.channel.send(niceTry);
                /* This checks that the user doesn't want to unmute Mirayoki
                using a command from itself, as it would break the bot.*/
                const unmuteOK = new Discord.MessageEmbed()

                    .setColor('#55C2FF')
                    .setTitle('Unmuted succesfully')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`<@${memberTarget.user.id}> has been unmuted.`)

                memberTarget.roles.add('796931063120920636');
                memberTarget.roles.remove('796927664475865148');
                /* Once all those checks have passed, 
                the specified member is unmuted using roles */
                message.channel.send(unmuteOK);
                // ... and returns a success message.
                message.delete();
            } else {
                message.channel.send(errorUnmute);
                /* If the user doesn't mention someone when unmuting, or if the specified user has 
                left the server already, an error message appears. */
            }
        } else {
            message.channel.send(noPerms);
            // In case the user doesn't have the Kick Members permission, an error message will appear.
        }
    }
}