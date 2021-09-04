module.exports = {
    name: 'support',
    description: "Further assistance for the Bot",
    execute(message, args, cmd, client, Discord, profileData) {

        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        const supportEN = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Need more help?')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('Our community is a welcoming and a great place to ask for help')
            .setThumbnail('https://i.postimg.cc/3xrYmKVn/logo.png')
            .addFields(
                { name: 'Support Server', value: 'Community gathers here to share their ideas, suggestions and questions, and we always want new faces around!' },
                { name: 'Join Support Server', value: 'https://discord.gg/sbxGVCxdTQ' },
                { name: 'Debug Information', value: 'Our support community may ask for the following information in order to help you more efficently, this doesn\'t include any private data and it **should only** be used for support purposes.' },
                { name: 'Version', value: `${message.guild.name} is running **${process.env.VERSION}**` },
                { name: 'Uptime', value: `${days}d ${hours}h ${minutes}m ${seconds}s` },
                { name: 'Server ID', value: `${message.guild.id} (${message.guild.name})` },
                { name: 'User ID', value: `${message.author.id} (${message.author.tag})` },
            )
            .setFooter('Mirayoki is a project of Slash Studio.')

            const supportES = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Necesitas más ayuda?')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('Nuestra comunidad es un lugar acogedor para pedir ayuda.')
            .setThumbnail('https://i.postimg.cc/3xrYmKVn/logo.png')
            .addFields(
                { name: 'Servidor de Soporte', value: 'Nuestra comunidad se reúne aquí para compartir sus ideas, sugerencias y preguntas. **[SOLO INGLÉS]***' },
                { name: 'Unirse al Servidor de Soporte', value: 'https://discord.gg/sbxGVCxdTQ' },
                { name: 'Información de depuración', value: 'Nuestra comunidad de soporte puede preguntar por la siguiente información para ayudarte a resolver tu problema más rápido, esto no incluye información privada pero debe ser usado **solo** para propositos de soporte.' },
                { name: 'Versión', value: `${message.guild.name} está corriendo **${process.env.VERSION}**` },
                { name: 'Tiempo en servicio', value: `${days}d ${hours}h ${minutes}m ${seconds}s` },
                { name: 'ID de Servidor', value: `${message.guild.id} (${message.guild.name})` },
                { name: 'ID de Usuario', value: `${message.author.id} (${message.author.tag})` },
            )
            .setFooter('Mirayoki es un proyecto de Slash Studio.')
            
            if (profileData.language == 'en') {
                return message.channel.send(supportEN);
            } else if (profileData.language == 'es') {
                return message.channel.send(supportES);
            }
    }
}
