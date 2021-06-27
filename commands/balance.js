module.exports = {
    name: 'balance',
    aliases: ['bal'],
    description: "Gives you your current balance",
    execute(message, args, cmd, client, Discord, profileData) {
        const urBalance = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Balance')
            .setDescription(`Wallet: ${profileData.coins} coins \n \n Bank Account: ${profileData.bank} coins \n`)
            .setAuthor(message.author.tag)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('Make it rain!')

        message.channel.send(urBalance);
    }
}