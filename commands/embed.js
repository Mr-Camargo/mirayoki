module.exports = {
    name: 'embed',
    description: "Embed test",
    execute(message, args, cmd, client, Discord, profileData) {

    const newEmbed = new Discord.MessageEmbed()
    
        .setColor('#55C2FF')
        .setTitle('Permissions')
        // .setURL('url') to add a link to the title
        // .setAuthor('name', 'img url')
        .setDescription('This displays your active permissions')
        // .setThumbnail('img url') to add small image next to title
        .addFields(
            {name: 'bruh', value:'Noice'},
            {name: 'no', value:'bruh'}
        )
        // .setImage('img url') to add a big image at the bottom
        // .setTimestamp() If you want to actual date
        .setFooter('This is a nice embed') // , 'img url') to add image

        message.channel.send(newEmbed);
    }
}