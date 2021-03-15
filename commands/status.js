module.exports = {
    name: 'status',
    description: "Displays status",
    execute(client, message, args, Discord) {

        const newEmbed = new Discord.MessageEmbed()

            .setColor('#25c720')
            .setTitle('Current status of Mirayoki Bot')
            // .setURL('url') to add a link to the title
            // .setAuthor('name', 'img url')
            .setDescription('Everything looks fine.')
            // .setThumbnail('img url') to add small image next to title
            .addFields(
                { name: 'Main bot', value: 'Online :white_check_mark:' },
                { name: 'Commands', value: 'Online :white_check_mark:' },
                { name: 'General Management', value: 'Online :white_check_mark:' },
                { name: 'Role Management', value: 'Online :white_check_mark:' },
                { name: 'Google Images Scraper', value: 'Online :white_check_mark:' }
            )
            // .setImage('img url') to add a big image at the bottom
            // .setTimestamp() If you want to actual date
            .setFooter('Type -help for more information about this bot!') // , 'img url') to add image

        message.channel.send(newEmbed);
    }
}