const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'work',
    description: "Gives you a random amout of coins as a reward of trading your time...",
    async execute(message, args, cmd, client, Discord, profileData) {

        const randomNumber = Math.floor(Math.random() * 250) + 1;
        // This is the random constant, it will decide how many coins the user gets for working.

        const beg4Money = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Work results')
            .setDescription(`${message.author.username}, you worked hard and got **${randomNumber}**`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('Make it rain!')

        try {
            await profileModel.findOneAndUpdate({
                userID: message.author.id,
                // Locates the target ...
            }, {
                $inc: {
                    coins: randomNumber,
                    // ... and adds the random amount of coins to their wallet ...
                }
            });

            return message.channel.send(beg4Money);
            // ... and returns a success message.
        } catch (err) {
            console.log(err)
            /* In case something goes internally wrong, an error 
            will be logged into the console for developers to see and solve. */
        }
    }
}