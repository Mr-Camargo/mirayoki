module.exports = {
    name: 'mod',
    description: "adds someone to the mod role",
    execute(message, args, cmd, client, Discord, profileData) {

        const alreadyRole = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('You already have the **Mod** role!')

        const addedRole = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Gave you the role!')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('You now have the **Mod** role!')

        if (message.member.roles.cache.has('796083018937794591')) {
            message.channel.send(alreadyRole);
        } else {
            message.channel.send(addedRole);
            message.member.roles.add('796083018937794591');
        }
    }
}