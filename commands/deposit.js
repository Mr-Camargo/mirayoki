const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'deposit',
    aliases: ['dep'],
    description: "deposit quickly in your bank account (yeah without making line, how awesome is that?)",
    async execute(message, args, cmd, client, Discord, profileData) {

        const amount = args[0];
        // This specifies the amount of wallet coins that a user wants to deposit into their bank

        const negativeOrNoCoins = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setDescription(`You can't deposit that amount to your bank account.`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('Well, get some money and save it on your bank!')

        const notEnoughCoins = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setDescription(`You don't have the **` + amount + `** coins to deposit on your bank`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('Well, get some money and save it on your bank!')

        const deposited = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Coins succesfully deposited')
            .setDescription(`You deposited **` + amount + `** coins into your bank safe!`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('These coins will be safe in the safe!')

        if (amount % 1 != 0 || amount <= 0) return message.channel.send(negativeOrNoCoins);
        // If the user wants to deposit zero or less coins, returns an error message.
        try {
            if (amount > profileData.coins) return message.channel.send(notEnoughCoins);
            /* If the amount of coins the user desires to deposit 
            is not available on their wallet, returns an error message */
            await profileModel.findOneAndUpdate({
                // It locates the user on the database...
                userID: message.author.id
            }, {
                $inc: {
                    coins: -amount,
                    // ... removes the specified amount of coins from their wallet ...
                    bank: amount,
                    // ... and adds the specified amount of coins to their bank.

                }
            });

            return message.channel.send(deposited)
            // Finally, it returns a success message.
        } catch (err) {
            console.log(err)
            /* In case something goes internally wrong, an error 
            will be logged into the console for developers to see and solve. */
        }
    }
}