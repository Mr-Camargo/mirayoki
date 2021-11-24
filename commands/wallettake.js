const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'wallettake',
    aliases: ['wtake'],
    description: "destroy some money from someone",
    async execute(message, args, cmd, client, Discord, profileData) {
        const amount = args[1];
        // This specifies the amount of wallet coins that an admin/mod wants to remove from a member

        const target = message.mentions.users.first();
        // And this specifies the member who will have their wallet coins removed

        const noPerms = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Access denied')
            .setDescription(`You don't have the **Administrator** permission to remove coins!`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('Why you don\'t ask nicely for the permission?')

        const noTarget = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setDescription(`You need to mention a user to remove their coins!`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        const deadTarget = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setDescription(`<@` + target + `> doesn\'t exist, or maybe left the server.`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        const negativeOrNoCoins = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setDescription(`You can\'t remove that amount of coins`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        const thatsALottaCoins = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setDescription(`You can\'t remove more than **1000** coins`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        const noUserFound = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setDescription(`Looks like <@` + target + `> doesn't exist on the economic database of Mirayoki. \n \n Why you don't tell them to send a message?`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('Use -support if this problem presists!')

        const niceTry = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Nice try')
            .setDescription(`ROBOTS ARE BETTER THAN YOU.`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('')

        const deletedCoins = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Coins succesfully removed')
            .setDescription(`You removed **` + amount + `** coins from <@` + target + ">.")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        if (message.member.permissions.has("ADMINISTRATOR")) {
        // This will check if the admin/mod has the Administrator permission on their server
            if (!args.length) return message.channel.send(noTarget);
            // This will check if the admin/mod has not specified a target, and returns an error message.
            if (!target) return message.channel.send(deadTarget);
            // If the target is not on the server anymore, returns an error message.
            if (target == process.env.BOT_ID) return message.channel.send(niceTry);
            // If the admin/mod wants to remove wallet coins from Mirayoki, returns an error message
            if (amount % 1 != 0 || amount <= 0) return message.channel.send(negativeOrNoCoins);
            // If the admin/mod chooses a number that is below one, returns an error message.
            if (amount > 1000) return message.channel.send(thatsALottaCoins);
            // If the admin/mod tries to remove more than 1000 wallet coins at once, returns an error message.
            try {
                // If it is a valid target ...
                const targetData = await profileModel.findOne({ userID: target.id });
                // ... looks up the target on the database ...
                if (!targetData) return message.channel.send(noUserFound);
                // If the mentioned target is not on the database, returns an error message

                await profileModel.findOneAndUpdate(
                    {
                        userID: target.id,
                        // ... locates the target ...
                    },
                    {
                        $inc: {
                            coins: -amount,
                            // ... and removes the specified amount of coins.
                        },
                    }
                );

                return message.channel.send(deletedCoins);
                // Finally, it returns a success message.
            } catch (err) {
                console.log(err);
                /* In case something goes internally wrong, an error 
                will be logged into the console for developers to see and solve. */
            }
        } else {
            message.channel.send(noPerms);
            /* If the user who is executing the command doesn't have the Administrator 
            permission on their server, it will return an error message. */
        }
    }
}