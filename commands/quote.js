module.exports = {
    name: 'quote',
    aliases: ['q'],
    description: "Record a string of text on the #quotes channel, usually something a member said that you want to remember",
    async execute(message, args, cmd, client, Discord, profileData) {

        let quote = args.join(' ');
        /* This will merge all the words the user has typed on the message,
        and will return them as a string */

        const date = new Date();

        const [month, day, year] = [calculateMonth(), date.getDate(), date.getFullYear()];
        /* This will give the current day, month, and year
        so it can then be displayed on the quote embed*/

        function calculateMonth() {
            let realMonth;
            let monthLanguage = profileData.language;
            switch (date.getMonth()) {
                case 0:
                    realMonth = "January";
                    if (monthLanguage === "es") realMonth = "Enero"
                    break;
                case 1:
                    realMonth = "February";
                    if (monthLanguage === "es") realMonth = "Febrero"
                    break;
                case 2:
                    realMonth = "March";
                    if (monthLanguage === "es") realMonth = "Marzo"
                    break;
                case 3:
                    realMonth = "April";
                    if (monthLanguage === "es") realMonth = "Abril"
                    break;
                case 4:
                    realMonth = "May";
                    if (monthLanguage === "es") realMonth = "Mayo"
                    break;
                case 5:
                    realMonth = "June";
                    if (monthLanguage === "es") realMonth = "Junio"
                    break;
                case 6:
                    realMonth = "July";
                    if (monthLanguage === "es") realMonth = "Julio"
                    break;
                case 7:
                    realMonth = "August";
                    if (monthLanguage === "es") realMonth = "Agosto"
                    break;
                case 8:
                    realMonth = "September";
                    if (monthLanguage === "es") realMonth = "Septiembre"
                    break;
                case 9:
                    realMonth = "October";
                    if (monthLanguage === "es") realMonth = "Octubre"
                    break;
                case 10:
                    realMonth = "November";
                    if (monthLanguage === "es") realMonth = "Noviembre"
                    break;
                case 11:
                    realMonth = "December";
                    if (monthLanguage === "es") realMonth = "Diciembre"
                    break;
            };
            return realMonth;
        };
        /* This function adds a number to the month array because arrays start at 0,
        so it would be werid for January to be Month 0, and December to be Month 11 */

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
            .setFooter(`${month} ${day}, ${year}`);

        const sentQuoteEN = new Discord.MessageEmbed()
            .setColor('#55C2FF')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setTitle('Quote sent')
            .setDescription(`You just said *"` + quote + `"*, and will be preserved, for life, in the #quotes channel.`)
            .setFooter(`Sent on ${month} ${day}, ${year}`);

        const sentQuoteES = new Discord.MessageEmbed()
            .setColor('#55C2FF')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setTitle('Quote enviada')
            .setDescription(`Acabas de decir *"` + quote + `"*, y será preservado, de por vida, en el canal de #quotes.`)
            .setFooter(`Enviado en ${month} ${day}, ${year}`);

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
            // If there is no 'quotes' channel ...
            if (profileData.language == 'en') {
                return message.channel.send(noChannelEN);
            } else if (profileData.language == 'es') {
                return message.channel.send(noChannelES);
            } // Returns an error message.
        } else if (!args[0]) {
            // If the user quoted nothing ...
            if (profileData.language == 'en') {
                return message.channel.send(noQuoteEN);
            } else if (profileData.language == 'es') {
                return message.channel.send(noQuoteES);
            } // Returns an error message.
        }

        // However, if the user provided a valid quote...
        channel.send(finalQuote).then(() => {
            // ... it is sent to the 'quotes' channel ...
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
            /* In case something goes internally wrong, an error 
           will be logged into the console for developers to see and solve. */
        });
    }
}
