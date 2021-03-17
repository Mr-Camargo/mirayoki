module.exports = {
    name: 'ping',
    aliases: ['p'],
    description: "This is a ping command",
    execute(message, args, cmd, client, Discord) {
        const pingMs = new Discord.MessageEmbed()
    
        .setColor('#55C2FF')
        .setTitle('Pong!')
        .setDescription(`Your latency is ${Date.now() - message.createdTimestamp}ms.`)

        message.channel.send(pingMs);
    }
}