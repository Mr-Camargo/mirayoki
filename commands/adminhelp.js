module.exports = {
    name: 'adminhelp',
    aliases: ['ahelp', 'modhelp'],
    description: "Gives you information about the management of the bot.",
    execute(message, args, cmd, client, Discord, profileData) {

        const modhelpEN = new Discord.MessageEmbed()

            .setColor('#25c720')
            .setTitle('Help for mods/admins.')
            .setDescription('__My prefix is "-"__')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Punishments', value: 'Useful commands to punish the bad guys.' },
                { name: '-mute, -m', value: 'Mutes someone, ex: -mute @Mr_Camargo or -m @Lic_Copiloto 5m to make a timed mute. (**Timed Mutes Up to 24 Days**)', inline: true },
                { name: '-kick, -k', value: 'Kicks someone, ex: -kick @OlmedoOrla', inline: true },
                { name: '-ban, -b', value: 'Bans someone, ex: -ban @HackerPro, to unban someone refer to your admin.', inline: true },
                { name: 'Channel management', value: 'Commands to keep your channels clean and tidy.' },
                { name: '-clear, -c', value: 'Clears recent messages from a channel, ex: -clear 50', inline: true },
            )
            .setFooter('Moderate with love.')

        const modhelpES = new Discord.MessageEmbed()

            .setColor('#25c720')
            .setTitle('Ayuda para mods/admins.')
            .setDescription('__Mi prefijo es "-"__')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Castigos', value: 'Comandos útiles para castigar a los tipos malos.' },
                { name: '-mute, -m', value: 'Silencia a alguien, ej: -mute @Mr_Camargo o -m @Lic_Copiloto 5m para silenciar por tiempo. (**Silencio por tiempo hasta 24 días**)', inline: true },
                { name: '-kick, -k', value: 'Explusa a alguien, ej: -kick @OlmedoOrla', inline: true },
                { name: '-ban, -b', value: 'Banea a alguien, ej: -ban @HackerPro, para desbanear a alguien por favor comúnicate con tu admin.', inline: true },
                { name: 'Administración de canales', value: 'Comandos para mantener tus canales limpios y relucientes.' },
                { name: '-clear, -c', value: 'Borra mensajes recientes de un canal, ej: -clear 50', inline: true },
            )
            .setFooter('Modera con amor.')

        if (profileData.language == 'en') {
            return message.channel.send(modhelpEN);
        } else if (profileData.language == 'es') {
            return message.channel.send(modhelpES);
        } // Returns an informative message
    }
}