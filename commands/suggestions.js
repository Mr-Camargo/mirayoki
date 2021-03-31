module.exports = {
    name: 'suggestions',
    aliases: ['suggest', 'suggestion'],
    description: "Suggest something",
    execute(message, args, cmd, client, Discord) {

        const noChannel = new Discord.MessageEmbed()

        .setColor('#FF5733')
        .setTitle('Error')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription('Looks like the Suggestions channel doesn\'t exist... yet. \n \n Why you don\'t *suggest* creating one?')
        .setFooter('See what I did there?')

        let messageArgs = args.join(' ');

        const finalSuggestion = new Discord.MessageEmbed()
        .setColor('#FFC300')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(messageArgs)
        .setFooter('Is this a good suggestion?');

        const sentSuggestion = new Discord.MessageEmbed()
        .setColor('#55C2FF')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Done! Your suggestion **"` + messageArgs + `"** is now on the suggestions channel.`);

        const channel = message.guild.channels.cache.find(c => c.name === 'suggestions');
        if(!channel) return message.channel.send(noChannel);

        channel.send(finalSuggestion).then((msg) =>{
            msg.react('👍');
            msg.react('👎');
            message.delete();
            message.channel.send(sentSuggestion);
        }).catch((err)=>{
            throw err;
        });
    }
}
