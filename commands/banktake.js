const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'banktake',
    aliases: ['btake'],
    description: "destroy some money from someone (bank edition)",
    async execute(message, args, cmd, client, Discord, profileData) {
        const amount = args[1];

        const target = message.mentions.users.first();

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
            if (!args.length) return message.channel.send(noTarget);
            if (!target) return message.channel.send(deadTarget);
            if (target == 795480018469781505) return message.channel.send(niceTry);
            if (amount % 1 != 0 || amount <= 0) return message.channel.send(negativeOrNoCoins);
            if (amount > 1000) return message.channel.send(thatsALottaCoins);
            try {
                const targetData = await profileModel.findOne({ userID: target.id });
                if (!targetData) return message.channel.send(noUserFound);

                await profileModel.findOneAndUpdate(
                    {
                        userID: target.id,
                    },
                    {
                        $inc: {
                            coins: -amount,
                        },
                    }
                );

                return message.channel.send(deletedCoins);
            } catch (err) {
                console.log(err);
            }
        } else {
            message.channel.send(noPerms);
        }
    }
}