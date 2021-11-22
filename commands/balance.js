module.exports = {
    name: 'balance',
    aliases: ['bal'],
    description: "Gives you your current balance",
    execute(message, args, cmd, client, Discord, profileData) {
        const balanceEN = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Balance')
            .setDescription(`Wallet: ${profileData.coins} coins \n \n Bank Account: ${profileData.bank} coins \n`)
            .setAuthor(message.author.tag)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('Make it rain!')

        const balanceES = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Saldo')
            .setDescription(`Billetera: ${profileData.coins} monedas \n \n Banco: ${profileData.bank} monedas \n`)
            .setAuthor(message.author.tag)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('Hazlo llover!')

        if (profileData.language == 'en') {
            return message.channel.send(balanceEN);
        } else if (profileData.language == 'es') {
            return message.channel.send(balanceES);
        } // Returns an informative message with the user's balance
    }
}