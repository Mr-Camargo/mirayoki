module.exports = {
    name: 'ehelp',
    aliases: ['eh'],
    description: "Gives you information about the economic system of the bot.",
    execute(message, args, cmd, client, Discord, profileData) {

        const ehelpEN = new Discord.MessageEmbed()

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
                { name: '-wallettake, -wtake', value: 'Removes some coins from the wallet, ex: -wtake @BadGuy 500 (**These coins will be destroyed.**)', inline: true },
                { name: '-banktake, -btake', value: 'Removes some coins from the bank, ex: -btake @BannedGirl 300 (**These coins will be destroyed.**)', inline: true },
            )
            .setFooter('If you are still having trouble, be sure to type -support for more help!')

        const ehelpES = new Discord.MessageEmbed()

            .setColor('#25c720')
            .setTitle('Ayuda para el sistema económico.')
            .setDescription('__Mi prefijo es "-"__')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Comandos básicos', value: 'Comandos para empezar a utilizar la economía Mirayoki.' },
                { name: '-work', value: 'Gana un poco de dinero de la manera legal y regular.', inline: true },
                { name: '-balance, -bal', value: 'Revisa cuanto saldo hay en tu billetera y en tu cuenta de banco.', inline: true },
                { name: '-rob, -steal, -mug', value: 'Toma el dinero honestamente ganado de la billetera de alguien de la manera poco amable.', inline: true },
                { name: 'Administración', value: 'Comandos para administrar la economía de tu servidor.' },
                { name: '-give', value: 'Da una cantidad especificada de monedas a alguien. ej: -give @PoorGuy 100', inline: true },
                { name: '-wallettake, -wtake', value: 'Elimina monedas de la billetera de alguien. ej: -wtake @BadGuy 500 (**Estas monedas serán destruidas.**)', inline: true },
                { name: '-banktake, -btake', value: 'Elimina monedas de la cuenta de banco de alguien. ej: -btake @BannedGirl 300 (**Estas monedas serán destruidas.**)', inline: true },
            )
            .setFooter('Si aún tienes problemas, asegúrate de usar el commando -support para asistencia!')

        if (profileData.language == 'en') {
            return message.channel.send(ehelpEN);
        } else if (profileData.language == 'es') {
            return message.channel.send(ehelpES);
        } // Returns an informative message with help
    }
}