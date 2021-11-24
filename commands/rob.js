const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'rob',
    aliases: ['steal', 'mug'],
    description: "steal some money",
    async execute(message, args, cmd, client, Discord, profileData) {

        const amount = Math.floor(Math.random() * 150) + 1;
        /* This variable will generate a random number which will
        be the amount that will be stolen from the target */

        const target = message.mentions.users.first();
        // This variable will be used to specify the user whose coins will be stolen

        const thief = message.author.id
        /* This variable will contain the thief's ID, which will be
        used to add the coins to their account. */

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
        // If no target is mentioned, returns an error message.
        if (target == message.author.id) return message.channel.send(cantMugYourself);
        // If the target is the same person as the thief, returns an error message.
        if (target == process.env.BOT_ID) return message.channel.send(niceTry);
        // If the target is Mirayoki, returns an error message.
        if (!target) return message.channel.send(deadTarget);
        // If the target is not available on the server, returns an error message.
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
                        // ... and removes the coins.
                    },
                }
            );

            await profileModel.findOneAndUpdate(
                {
                    userID: thief,
                    // Then, it locates the thief ...
                },
                {
                    $inc: {
                        coins: amount,
                        // ... and gives the stolen coins.
                    },
                }
            );

            return message.channel.send(stoleCoins);
            // Finally, returns a success message
        } catch (err) {
            console.log(err);
            /* In case something goes internally wrong, an error 
        will be logged into the console for developers to see and solve. */
        }
    }
}