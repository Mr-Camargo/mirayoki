module.exports = {
    name: 'ping',
    description: "This is a ping command",
    execute(client, message, args, Discord) {
        const newEmbed = new Discord.MessageEmbed()
    
        .setColor('#55C2FF')
        .setTitle('Pong!')
        .setDescription(`Your latency is ${Date.now() - message.createdTimestamp}ms.`)

        message.channel.send(newEmbed);
    }
}