module.exports = {
    name: 'quote',
    aliases: ['q'],
    description: "Record a string of text on the #quotes channel, usually something a member said that you want to remember",
    execute(message, args, cmd, client, Discord, profileData) {

        let quote = args.join(' ');
        /* This will merge all the words the user has typed on the message,
        and will return them as a string */

        const date = new Date();

        const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
        /* This will give the current day, month and year so it can then be 
        displayed on the quote*/

        const noChannelEN = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('Looks like the #quotes channel doesn\'t exist... yet. \n \n Why you don\'t create one?')
            .setFooter('Bet it will be useful.')

        const noChannelES = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('Parece que el canal de #quotes no existe... aún. \n \n Porque no creas uno?')
            .setFooter('Te aseguro que será util')

        const finalQuote = new Discord.MessageEmbed()
            .setColor('#FFC300')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`*${quote}*`)
            .setFooter(`${day}/${month}/${year}`)

        const sentQuoteEN = new Discord.MessageEmbed()
            .setColor('#55C2FF')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setTitle('Quote sent')
            .setDescription(`You just said *"` + quote + `"*, and will be preserved, for life, in the #quotes channel.`)
            .setFooter(`${day}/${month}/${year}`);

        const sentQuoteES = new Discord.MessageEmbed()
            .setColor('#55C2FF')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setTitle('Quote enviada')
            .setDescription(`Acabas de decir *"` + quote + `"*, y será preservado, de por vida, en el canal de #quotes.`)
            .setFooter(`${day}/${month}/${year}`);

        const noQuoteEN = new Discord.MessageEmbed()
            .setColor('#FF5733')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setTitle('Error')
            .setDescription(`You just quoted nothing.`)
            .setFooter(`That's not memorable, sorry!`);

        const noQuoteES = new Discord.MessageEmbed()
            .setColor('#FF5733')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setTitle('Error')
            .setDescription(`No citaste nada.`)
            .setFooter(`Eso no es memorable, perdón!`);

        const channel = message.guild.channels.cache.find(c => c.name === 'quotes');
        if (!channel) {
            // If there is no #quotes channel, it returns an error message.
            if (profileData.language == 'en') {
                return message.channel.send(noChannelEN);
            } else if (profileData.language == 'es') {
                return message.channel.send(noChannelES);
            }
        } else if (!args[0]) {
            // If the user quoted nothing, it returns an error message.
            if (profileData.language == 'en') {
                return message.channel.send(noQuoteEN);
            } else if (profileData.language == 'es') {
                return message.channel.send(noQuoteES);
            }
        }

        // However, if the user provided a valid quote...
        channel.send(finalQuote).then(() => {
            // ... it is sent ...
            message.delete();
            // ... the original message deleted ...
            if (profileData.language == 'en') {
                return message.channel.send(sentQuoteEN);
            } else if (profileData.language == 'es') {
                return message.channel.send(sentQuoteES);
            }
            // ... and returns a success message.
        }).catch((err) => {
            throw err;
        });
    }
}
