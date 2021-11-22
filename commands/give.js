const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'give',
    description: "give some money to someone, while removing yours.",
    async execute(message, args, cmd, client, Discord, profileData) {
        const amount = args[1];
        // This variable will use the second argument as the amount of coins the user will give

        const target = message.mentions.users.first();
        // This other variable will use the first mention as the target that will recieve the coins

        const noPerms = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Access denied')
            .setDescription(`You don't have the **Administrator** permission to give coins!`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('Why you don\'t ask nicely for the permission?')

        const noTarget = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setDescription(`You need to mention a user to give them coins!`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('It\'s nice to give things to others')

        const deadTarget = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setDescription(`<@` + target + `> doesn\'t exist, or maybe left the server.`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('It\'s a ghost of the past now...')

        const negativeOrNoCoins = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setDescription(`You can\'t give that amount of coins`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('It\'s nice to give things to others')

        const thatsALottaCoins = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setDescription(`You can\'t give more than **1000** coins`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('It\'s nice to give things to others')

        const noUserFound = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setDescription(`Looks like <@` + target + `> doesn't exist on the economic database of Mirayoki. \n \n Why you don't tell them to send a message?`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('Use -support if this problem presists!')

        const noThanks = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('No thank you')
            .setDescription(`I have enough coins, but thank you`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('')


        const gaveCoins = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Coins succesfully given')
            .setDescription(`You gave **` + amount + `** coins to <@` + target + ">!")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('Sharing is caring!')

        if (message.member.permissions.has("ADMINISTRATOR")) {
            // If the user has the Administrator permission on their server
            if (!args.length) return message.channel.send(noTarget);
            // If no arguments are placed, returns an error message.
            if (!target) return message.channel.send(deadTarget);
            // If the target for the coins is not on the server anymore, returns an error message.
            if (target == 795480018469781505) return message.channel.send(noThanks);
            // If the target is Mirayoki, returns an error message.
            if (amount % 1 != 0 || amount <= 0) return message.channel.send(negativeOrNoCoins);
            // If the amount of coins to give is zero or negative, returns an error message.
            if (amount > 1000) return message.channel.send(thatsALottaCoins);
            // If the amount of coins exceed 1000, returns an error message.
            try {
                const targetData = await profileModel.findOne({ userID: target.id });
                // It locates the target user on the database ...
                if (!targetData) return message.channel.send(noUserFound);
                // If the target is not found on the database, returns an error message.

                await profileModel.findOneAndUpdate(
                    {
                        userID: target.id,
                        // Locates the target ...
                    },
                    {
                        $inc: {
                            coins: amount,
                            //... and gives the specified amount of coins.
                        },
                    }
                );

                return message.channel.send(gaveCoins);
                // Finally, it returns a success message.
            } catch (err) {
                console.log(err);
                /* In case something goes internally wrong, an error 
                will be logged into the console for developers to see and solve. */
            }
        } else {
            message.channel.send(noPerms);
            // If the user doesn't have the Administratior permission, returns an error message.
        }
    }
}