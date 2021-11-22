module.exports = {
    name: 'coinflip',
    aliases: ['coin', 'flip'],
    description: 'Flips a coin, and gives you the result on chat.',
    async execute(message, args, cmd, client, Discord, profileData) {

        var coin = null
        // This variable will be used to represent the side on which the coin fell

        const randomConstant = Math.floor(Math.random() * 2) + 1;
        // This is the random constant, that decides which side the coin will fall

        if (randomConstant === 1) {
            // If the random number is 1, then the coin is set to fall on the Heads side.
            coin = 'Heads'
        } else if (randomConstant === 2) {
            // But if the random number is 2, then it is set to fall on the Tails side.
            coin = 'Tails'
        }

        /* This translates the string that contains
         the name of face where the coin fell */
        if (profileData.language == 'es') {
            if (coin === 'Heads') {
                coin = 'Cara'
            } else if (coin === 'Tails') {
                coin = 'Cruz'
            }
        }

        const flippedCoinEN = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('You flipped a coin...')
            .setDescription(`**${coin}.**`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        const flippedCoinES = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Volteaste una moneda...')
            .setDescription(`**${coin}.**`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        if (profileData.language == 'en') {
            return message.channel.send(flippedCoinEN);
        } else if (profileData.language == 'es') {
            return message.channel.send(flippedCoinES);
        } // Returns a success message with the result
    }
}