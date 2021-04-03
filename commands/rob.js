const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'rob',
    aliases: ['steal', 'mug'],
    description: "steal some money",
    async execute(message, args, cmd, client, Discord, profileData) {

        const amount = Math.floor(Math.random() * 150) + 1;

        const target = message.mentions.users.first();

        const thief = message.author.id

        const niceTry = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Nice try')
            .setDescription(`ROBOTS ARE BETTER THAN YOU.`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('')

        const cantMugYourself = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setDescription(`You can\'t mug yourself.`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('')

        const noTarget = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setDescription(`You need to mention a user to steal coins from them!`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('')

        const deadTarget = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setDescription(`<@` + target + `> doesn\'t exist, or maybe left the server.`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('It\'s a ghost of the past now...')

        const noUserFound = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setDescription(`Looks like <@` + target + `> doesn't exist on the economic database of Mirayoki. \n \n Why you don't tell them to send a message?`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('Use -support if this problem presists!')

        const stoleCoins = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Crime results')
            .setDescription(`You stole **` + amount + `** coins from <@` + target + ">!")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('Now get out the scene, quickly!')

        if (!args.length) return message.channel.send(noTarget);
        if (target == message.author.id) return message.channel.send(cantMugYourself);
        if (target == 795480018469781505) return message.channel.send(niceTry);
        if (!target) return message.channel.send(deadTarget);
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

            await profileModel.findOneAndUpdate(
                {
                    userID: thief,
                },
                {
                    $inc: {
                        coins: amount,
                    },
                }
            );

            return message.channel.send(stoleCoins);
        } catch (err) {
            console.log(err);
        }
    }
}