module.exports = {
    name: 'mod',
    description: "adds someone to the mod role",
    execute(client, message, args, Discord) {

        const alreadyRole = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(`For ${message.author.username}`)
            .setDescription('You already have the **Mod** role!')

        const addedRole = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Gave you the role!')
            .setAuthor(`For ${message.author.username}`)
            .setDescription('You now have the **Mod** role!')

        if (message.member.roles.cache.has('796083018937794591')) {
            message.channel.send(alreadyRole);
        } else {
            message.channel.send(addedRole);
            message.member.roles.add('796083018937794591');
        }
    }
}