const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'work',
    description: "Gives you a random amout of coins as a reward of trading your time...",
    async execute(message, args, cmd, client, Discord, profileData) {

        const randomNumber = Math.floor(Math.random() * 250) + 1;
        // To modify the range of earning modify the "* MaxNumber) + MinNumber;
        const response = await profileModel.findOneAndUpdate({
            userID: message.author.id,
        }, {
            $inc: {
                coins: randomNumber,
            }
        });
        const beg4Money = new Discord.MessageEmbed()

        .setColor('#55C2FF')
        .setTitle('Work results')
        .setDescription(`${message.author.username}, you worked hard and got **${randomNumber}**`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setFooter('Make it rain!')

        return message.channel.send(beg4Money);
    }
}