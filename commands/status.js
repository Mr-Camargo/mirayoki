module.exports = {
    name: 'status',
    description: "Displays status",
    execute(message, args, cmd, client, Discord) {

        const newEmbed = new Discord.MessageEmbed()

            .setColor('#FC8C16')
            .setTitle('Current status of Mirayoki')
            // .setURL('url') to add a link to the title
            // .setAuthor('name', 'img url')
            .setDescription('It\'s ok... I guess...')
            // .setThumbnail('img url') to add small image next to title
            .addFields(
                { name: 'Main bot', value: 'Online :white_check_mark:' },
                { name: 'Commands', value: 'Online :white_check_mark:' },
                { name: 'General Management', value: 'Online :white_check_mark:' },
                { name: 'Role Management', value: 'Online :white_check_mark:' },
                { name: 'Google Images Scraper', value: 'Disabled (Use -ihelp for more details) :no_entry:' }
            )
            // .setImage('img url') to add a big image at the bottom
            // .setTimestamp() If you want to actual date
            .setFooter('Type -help for more information about this bot!') // , 'img url') to add image

        message.channel.send(newEmbed);
    }
}