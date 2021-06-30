const { Guild } = require("discord.js");

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
            if (member) {
                if (member == message.author.id) return message.channel.send(noImNot);
                const memberTarget = message.guild.members.cache.get(member.id);
                if (memberTarget == 795480018469781505 || 834492523295801355) return message.channel.send(niceTry);
                const kickOK = new Discord.MessageEmbed()

                    .setColor('#55C2FF')
                    .setTitle('Kicked succesfully')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`@${memberTarget.user.id} has been kicked.`)
                memberTarget.kick();
                message.channel.send(kickOK);
                message.delete();
            } else {
                message.channel.send(errorKick)
            }
        } else {
            message.channel.send(noPerms);
        }
    }
}