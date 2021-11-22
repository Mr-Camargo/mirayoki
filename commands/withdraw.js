const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'withdraw',
    aliases: ['wdraw'],
    description: "withdraw some money from the bank vault",
    async execute(message, args, cmd, client, Discord, profileData) {

        const amount = args[0];
        // This specifies the amount of bank coins that a user wants to remove from their bank

        const negativeOrNoCoins = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setDescription(`You can't withdraw that amount from your bank account.`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('Well, get some money and save it on your bank!')

        const notEnoughCoins = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setDescription(`You don't have the **` + amount + `** coins in you bank to withdraw`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('Why you don\'t work hard to earn some money?')

        const withdrawed = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Coins succesfully withdrawn')
            .setDescription(`You withdrew **` + amount + `** coins from your bank account.`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('Be careful out there!')

        if (amount % 1 != 0 || amount <= 0) return message.channel.send(negativeOrNoCoins);
        // If the user wants to withdraw zero or less coins, returns an error message.
        try {
            if (amount > profileData.bank) return message.channel.send(notEnoughCoins);
            /* If the amount of coins the user desires to withdraw 
            is not available on their bank, returns an error message */
            await profileModel.findOneAndUpdate({
                userID: message.author.id
                // It locates the user on the database...
            }, {
                $inc: {
                    coins: amount,
                    // ... adds the specified amount of coins to their wallet ...
                    bank: -amount,
                    // ... and removes those coins from their bank.
                }
            });

            return message.channel.send(withdrawed)
            // Finally, it returns a success message.
        } catch (err) {
            console.log(err)
            /* In case something goes internally wrong, an error 
            will be logged into the console for developers to see and solve. */
        }
    }
}