const { Guild } = require("discord.js");

module.exports = {
    name: 'kick',
    description: "Kicks someone",
    execute(client, message, args, Discord) {
        const noPerms = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Access denied')
            .setAuthor(`For ${message.author.username}`)
            .setDescription('Are you really trying to kick someone?')

        const errorKick = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(`For ${message.author.username}`)
            .setDescription('There was an error while kicking this member. (Did you mention it?)')

        const member = message.mentions.users.first();
        if (message.member.roles.cache.has('796083018937794591')) {
            if (member) {
                const memberTarget = message.guild.members.cache.get(member.id);
                const kickOK = new Discord.MessageEmbed()

                    .setColor('#55C2FF')
                    .setTitle('Kicked succesfully')
                    .setAuthor(`For ${message.author.username}`)
                    .setDescription(`@${memberTarget.user.id} has been kicked.`)
                memberTarget.kick();
                message.channel.send(kickOK);
            } else {
                message.channel.send(errorKick)
            }
        } else {
            message.channel.send(noPerms);
        }
    }
}