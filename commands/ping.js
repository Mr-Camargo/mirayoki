module.exports = {
    name: 'ping',
    aliases: ['p'],
    description: "This is a ping command",
    execute(message, args, cmd, client, Discord, profileData) {
        const pingMs = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Pong!')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Your latency is ${Date.now() - message.createdTimestamp}ms.`)

        message.channel.send(pingMs);
    }
}