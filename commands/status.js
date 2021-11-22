module.exports = {
    name: 'status',
    aliases: ['uptime'],
    description: "Displays current status of the bot, including uptime.",
    execute(message, args, cmd, client, Discord, profileData) {

        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;
        // This variables will be used to calculate uptime

        const currentStatusEN = new Discord.MessageEmbed()

            .setColor('#FC8C16')
            .setTitle('Current status of Mirayoki')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('It\'s ok... I guess...')
            .addFields(
                { name: 'Version', value: process.env.VERSION },
                { name: 'Uptime', value: `${days}d ${hours}h ${minutes}m ${seconds}s` },
                { name: 'Main bot', value: 'Online :green_circle:' },
                { name: 'Commands', value: 'Online :green_circle:' },
                { name: 'General Management', value: 'Online :green_circle:' },
                { name: 'Role Management', value: 'Online :green_circle:' },
                { name: 'Economic System', value: 'Online :green_circle:' },
                { name: 'Google Images Scraper', value: 'Disabled (Use -ihelp for more details) :no_entry:' }
            )
            .setFooter('Type -help for more information about Mirayoki!')

            const currentStatusES = new Discord.MessageEmbed()

            .setColor('#FC8C16')
            .setTitle('Estado actual de Mirayoki')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('Esta bien, supongo...')
            .addFields(
                { name: 'Versión', value: process.env.VERSION },
                { name: 'Tiempo en servicio', value: `${days}d ${hours}h ${minutes}m ${seconds}s` },
                { name: 'Bot Principal', value: 'Activo :green_circle:' },
                { name: 'Comandos', value: 'Activo :green_circle:' },
                { name: 'Administración Principal', value: 'Activo :green_circle:' },
                { name: 'Administración de Roles', value: 'Activo :green_circle:' },
                { name: 'Sistema económico', value: 'Activo :green_circle:' },
                { name: 'Buscador de Imágenes de Google', value: 'Desactivado (Usa -ihelp para más información) :red_circle:' }
            )
            .setFooter('Usa -help para más información acerca de Mirayoki!')

        if (profileData.language == 'en') {
            return message.channel.send(currentStatusEN);
        } else if (profileData.language == 'es') {
            return message.channel.send(currentStatusES);
        } // Returns an informative message with status info
    }
}