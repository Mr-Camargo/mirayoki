module.exports = {
    name: 'status',
    aliases: ['uptime'],
    description: "Displays current status of the bot, including uptime.",
    execute(message, args, cmd, client, Discord, profileData) {

        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        const currentStatus = new Discord.MessageEmbed()

            .setColor('#FC8C16')
            .setTitle('Current status of Mirayoki')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('It\'s ok... I guess...')
            .addFields(
                { name: 'Version', value: process.env.VERSION },
                { name: 'Uptime', value: `${days}d ${hours}h ${minutes}m ${seconds}s` },
                { name: 'Main bot', value: 'Online :white_check_mark:' },
                { name: 'Commands', value: 'Online :white_check_mark:' },
                { name: 'General Management', value: 'Online :white_check_mark:' },
                { name: 'Role Management', value: 'Online :white_check_mark:' },
                { name: 'Economic System', value: 'Online :white_check_mark:' },
                { name: 'Google Images Scraper', value: 'Disabled (Use -ihelp for more details) :no_entry:' }
            )
            .setFooter('Type -help for more information about this bot!')

        message.channel.send(currentStatus);
    }
}