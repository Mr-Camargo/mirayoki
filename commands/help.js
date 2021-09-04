module.exports = {
    name: 'help',
    aliases: ['h'],
    description: "Gives you information about the bot.",
    execute(message, args, cmd, client, Discord, profileData) {

        const helpMenuEN = new Discord.MessageEmbed()

            .setColor('#25c720')
            .setTitle('Need help huh?')
            .setDescription('__My prefix is "-"__')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Version', value: `${message.guild.name} is running **${process.env.VERSION}**` },
                { name: 'Commands', value: 'Useful basic features to help you in your Discord tasks.' },
                { name: '-ping, -p', value: 'Replies to you with your actual ping', inline: true },
                { name: '-status', value: 'Tells you current status of the bot', inline: true },
                { name: 'Useful Commands', value: 'Commands made to enhance your Discord Experience.' },
                { name: '-language, -lang', value: 'Set up your preferred language to use Mirayoki.', inline: true },
                { name: '-image, -img', value: 'Searches an Image Online and returns it to you.', inline: true },
                { name: '-suggest, -suggestion', value: 'Suggest anything, and place it on the server\'s #suggestions channel.', inline: true },
                { name: 'Fun commands', value: 'Commands that are on Mirayoki because it can do it, and for fun, too.' },
                { name: '-perms', value: '*~flex with your permissions~* (and know them too)', inline: true },
                { name: '-bruh', value: 'bruh bruh bruh', inline: true },
                { name: '-coinflip, -coin, -flip', value: 'Flip a coin.', inline: true },
                { name: '-die, -roll', value: 'Throw a die.', inline: true },
                { name: 'Other modules help', value: 'Different help for different things.' },
                { name: '-ihelp, -ih', value: 'Help information for the Image Search module', inline: true },
                { name: '-ehelp, -eh', value: 'Help information about the economy system.', inline: true },
                { name: '-adminhelp, -ahelp, -modhelp', value: 'Help information about the Administration of the bot', inline: true },
            )
            .setFooter('If you are still having trouble, be sure to type -support for more help!')

            const helpMenuES = new Discord.MessageEmbed()

            .setColor('#25c720')
            .setTitle('Necesitas ayuda?')
            .setDescription('__Mi prefijo es "-"__')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Versión', value: `${message.guild.name} esta corriendo ${process.env.VERSION}` },
                { name: 'Comandos', value: 'Comandos indispensables y básicos para apoyarte en tu día a día en Discord.' },
                { name: '-ping, -p', value: 'Te indica tu ping actual', inline: true },
                { name: '-status', value: 'Te indica el status actual del bot.', inline: true },
                { name: 'Comandos útiles', value: 'Comandos hechos para mejorar tu experiencia en Discord.' },
                { name: '-language, -lang', value: 'Configura tu lenguaje preferido para usar Mirayoki.', inline: true },
                { name: '-image, -img', value: 'Busca una imagen en línea y te regresa el resultado.', inline: true },
                { name: '-suggest, -suggestion', value: 'Sugiere algo y ponlo en el canal #suggestions de tu servidor.', inline: true },
                { name: 'Otros Comandos', value: 'Comandos que estan en Mirayoki porque lo puede hacer, y por diversión también.' },
                { name: '-perms', value: '*~presume tus permisos~* (y conocelos tambíen)', inline: true },
                { name: '-bruh', value: 'bruh bruh bruh', inline: true },
                { name: '-coinflip, -coin, -flip', value: 'Voltea una moneda', inline: true },
                { name: '-die, -roll', value: 'Tira un dado.', inline: true },
                { name: 'Ayuda para otros módulos', value: 'Ayuda diferente para cosas diferentes.' },
                { name: '-ihelp, -ih', value: 'Información de ayuda para la búsqueda de imágenes en línea', inline: true },
                { name: '-ehelp, -eh', value: 'Información de ayuda para el sistema económico.', inline: true },
                { name: '-adminhelp, -ahelp, -modhelp', value: 'Información de ayuda acerca la administración del bot.', inline: true },
            )
            .setFooter('Si aún tienes problemas, asegúrate de usar el commando -support para asistencia!')

        if (profileData.language == 'en') {
            return message.channel.send(helpMenuEN);
        } else if (profileData.language == 'es') {
            return message.channel.send(helpMenuES);
        }
    }
}