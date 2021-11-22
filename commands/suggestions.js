module.exports = {
    name: 'suggestions',
    aliases: ['suggest', 'suggestion'],
    description: "Suggest something in a server's channel",
    execute(message, args, cmd, client, Discord, profileData) {

        let messageArgs = args.join(' ');
        /* This will merge all the words the user has typed on the message,
        and will return them as a string */

        const noChannel = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('Looks like the Suggestions channel doesn\'t exist... yet. \n \n Why you don\'t *suggest* creating one?')
            .setFooter('See what I did there?')

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
        // This will look up the 'suggestions' channel within the server
        if (!channel) return message.channel.send(noChannel);
        // If no 'suggestions' channel is found, returns an error message.

        channel.send(finalSuggestion).then((msg) => {
            // When the suggestion is sent to the 'suggestions' channel ...
            msg.react('👍');
            msg.react('👎');
            // ... reacts to the suggestion with a like and dislike, for convenience ...
            message.delete();
            // ... deletes the original suggestion ...
            message.channel.send(sentSuggestion);
            // .. and returns a success message.
        }).catch((err) => {
            throw err;
             /* In case something goes internally wrong, an error 
            will be logged into the console for developers to see and solve. */
        });
    }
}