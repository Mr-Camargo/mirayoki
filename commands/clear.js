module.exports = {
    name: 'clear',
    aliases: ['c'],
    cooldown: 10,
    description: "clear last {amount} of messages",
    async execute(message, args, cmd, client, Discord) {

        const noArgs = new Discord.MessageEmbed()

        .setColor('#FF5733')
        .setTitle('Error')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription('Please specify the amount of messages you want to clear!')

        const numbersOnly = new Discord.MessageEmbed()

        .setColor('#FF5733')
        .setTitle('Error')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription('Numbers only please. e.g. -clear 50')

        const manyMessages = new Discord.MessageEmbed()

        .setColor('#FF5733')
        .setTitle('Error')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription('I can only delete 100 messsages at a time.')

        const noClear = new Discord.MessageEmbed()

        .setColor('#FF5733')
        .setTitle('Error')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription('So... I delete nothing?')

        const yesClear = new Discord.MessageEmbed()

        .setColor('#55C2FF')
        .setTitle('Cleared succesfully!')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setFooter('Delete me if you want')

        const noPerms = new Discord.MessageEmbed()

        .setColor('#FF5733')
        .setTitle('Access denied')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription('You don\'t have the permission to run this command.')

        
        if(message.member.roles.cache.has('796083018937794591')){
            if(!args[0]) return message.channel.send(noArgs);
            if(isNaN(args[0])) return message.channel.send(numbersOnly);
            if(args[0] > 100) return message.channel.send(manyMessages);
            if(args[0] < 1) return message.channel.send(noClear);
             await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
                message.channel.bulkDelete(messages);
                message.channel.send(yesClear);
            });
            
        } else {
            message.channel.send(noPerms);
        }
    }
}