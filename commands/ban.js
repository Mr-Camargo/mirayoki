module.exports = {
    name: 'ban',
    aliases: ['b'],
    description: "the big hammer",
    execute(message, args, cmd, client, Discord, profileData) {

        const member = message.mentions.users.first();
        // This variable specifies the member who will be banned

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
            // This will check if the user has the Ban Members permission on their server
            if (member) {
                if (member == message.author.id) return message.channel.send(noImNot);
                // This is a security measure, so no one can ban themselves
                const memberTarget = message.guild.members.cache.get(member.id);
                /* Once the Bot has checked that the user that was specified is 
                NOT the author of that message, then the target gets noted for a soon-to-be ban */
                if (memberTarget == process.env.BOT_ID) return message.channel.send(niceTry);
                /* This now checks that the user doesn't want to ban Mirayoki 
                using a command from itself, as it would break the bot.*/
                const banOK = new Discord.MessageEmbed()

                    .setColor('#55C2FF')
                    .setTitle('Banned succesfully')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`@${memberTarget.user.id} has been banned.`)
                memberTarget.ban();
                // Once all those checks have passed, the specified member is banned...
                message.channel.send(banOK);
                // ... and returns a success message.
                message.delete();
            } else {
                message.channel.send(errorBan)
                /* If the user doesn't mention someone when banning, or if the specified user has 
                left the server already, an error message appears. */
            }
        } else {
            message.channel.send(noPerms);
            // In case the user doesn't have the Ban Members permission, an error message will appear.
        }
    }
}