module.exports = {
    name: 'coinflip',
    aliases: ['coin', 'flip'],
    description: 'Flips a coin, and gives you the result on chat.',
    async execute(message, args, cmd, client, Discord, profileData) {

        var coin = null

        const randomConstant = Math.floor(Math.random() * 2) + 1;

        if (randomConstant > 1) {
            coin = 'Heads'
        } else if (randomConstant < 2) {
            coin = 'Tails'
        }

        if (profileData.language == 'es') {
            if (coin == 'Heads') {
                coin = 'Cara'
            } else if (coin == 'Tails') {
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
        }
    }
}