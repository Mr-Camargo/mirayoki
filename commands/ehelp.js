module.exports = {
    name: 'ehelp',
    aliases: ['eh'],
    description: "Gives you information about the economic system of the bot.",
    execute(message, args, cmd, client, Discord) {

        const modhelp = new Discord.MessageEmbed()

            .setColor('#25c720')
            .setTitle('Help for the economy system.')
            .setDescription('__My prefix is "-"__')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Basic Commands', value: 'Useful commands to start using Mirayoki Economy.' },
                { name: '-work', value: 'Earn some money the nice and legal way.', inline: true },
                { name: '-balance, -bal', value: 'Check how many money is in your wallet and bank account.', inline: true },
                { name: '-rob, -steal, -mug', value: 'Take someone\'s hard earned wallet money the bad way.', inline: true },
                { name: 'Management', value: 'Commands to manage your server\'s economy.' },
                { name: '-give', value: 'Gives a specified amount of coins, ex: -give @PoorGuy 100', inline: true },
                { name: '-wallettake, -wtake', value: 'Removes some coins from the wallet, ex: -wtake @BadGuy 500 (These coins will be destroyed.)', inline: true },
                { name: '-banktake, -btake', value: 'Removes some coins from the bank, ex: -btake @BannedGirl 300 (These coins will be destroyed.)', inline: true },
            )
            .setFooter('If you are still having trouble, be sure to type -support for more help!')
        message.channel.send(modhelp);
    }
}