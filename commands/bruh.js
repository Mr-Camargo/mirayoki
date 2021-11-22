module.exports = {
    name: 'bruh',
    description: "bruh lol",
    execute(message, args, cmd, client, Discord, profileData) {

        const bruh = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('bruh')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        message.channel.send(bruh);
        // bruh
    }
}