const { Guild } = require("discord.js");
// The Guild constant requires the Discord.js library in order to have data

module.exports = {
    name: 'kick',
    aliases: ['k'],
    description: "Kicks someone",
    execute(message, args, cmd, client, Discord, profileData) {
        const noPerms = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Access denied')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('You don\'t have the **Kick Members** permission to kick someone!')

        const errorKick = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('There was an error while kicking this member. (Did you mention it?)')

        const noImNot = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('There is a button to leave the server, so no need to kick yourself')

        const niceTry = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Nice try')
            .setDescription(`ROBOTS ARE BETTER THAN YOU.`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('')

        const member = message.mentions.users.first();
        if (message.member.permissions.has("KICK_MEMBERS")) {
            // This will check if the user has the Kick Members permission on their server
            if (member) {
                if (member == message.author.id) return message.channel.send(noImNot);
                // This is a security measure, so no one can kick themselves
                const memberTarget = message.guild.members.cache.get(member.id);
                /* Once the Bot has checked that the user that was specified is 
                NOT the author of that message, then the target gets noted for a soon-to-be kick */
                if (memberTarget == process.env.BOT_ID) return message.channel.send(niceTry);
                /* This now checks that the user doesn't want 
                to kick Mirayoki using a command from itself, as it would break the bot.*/
                const kickOK = new Discord.MessageEmbed()

                    .setColor('#55C2FF')
                    .setTitle('Kicked succesfully')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`@${memberTarget.user.id} has been kicked.`)
                memberTarget.kick();
                // Once all those checks have passed, the specified member is kicked...
                message.channel.send(kickOK);
                // ... and returns a success message.
                message.delete();
            } else {
                message.channel.send(errorKick)
                /* If the user doesn't mention someone when kicking, or if the specified person has 
                left the server already, an error message appears. */
            }
        } else {
            message.channel.send(noPerms);
            // In case the user doesn't have the Ban Members permission, an error message will appear.
        }
    }
}