module.exports = {
    name: 'ping',
    aliases: ['p'],
    description: "This is a ping command",
    execute(message, args, cmd, client, Discord, profileData) {
        const pingEN = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Pong!')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Your latency is ${Date.now() - message.createdTimestamp}ms.`)

        const pingES = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Pong!')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Tu latencia es ${Date.now() - message.createdTimestamp}ms.`)

        if (profileData.language == 'en') {
            return message.channel.send(pingEN);
        } else if (profileData.language == 'es') {
            return message.channel.send(pingES);
        }
    }
}