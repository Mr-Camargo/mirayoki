const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'give',
    description: "give some money to someone, while removing yours.",
    async execute(message, args, cmd, client, Discord, profileData) {
        const amount = args[1];

        const target = message.mentions.users.first();

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
            if (!args.length) return message.channel.send(noTarget);
            if (!target) return message.channel.send(deadTarget);
            if (target == 795480018469781505) return message.channel.send(noThanks);
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
                            coins: amount,
                        },
                    }
                );

                return message.channel.send(gaveCoins);
            } catch (err) {
                console.log(err);
            }
        } else {
            message.channel.send(noPerms);
        }
    }
}