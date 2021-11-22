const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'language',
    aliases: ['idioma', 'lang'],
    description: "Set up your preferred language for Mirayoki.",
    async execute(message, args, cmd, client, Discord, profileData) {
        let language = null
        // This variable will be used when viewing the settings

        const languageChoice = args[0]
        /* This variable will be set with the first argument
        when the user wants to change their language settings */

        if (profileData.language == 'en') {
            language = 'English'
        } else if (profileData.language == 'es') {
            language = 'Español'
        } /* This will check the language of the user
        on the database and will set the langauge the menu is viewed */

        const menuEN = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Language')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`You are using Mirayoki in **${language}**.`)
            .addFields(
                { name: 'Change Language', value: `In order to change your language, please run the following commands:` },
                { name: 'English 🇬🇧', value: `-lang en`, inline: true },
                { name: 'Español 🇪🇸', value: `-lang es`, inline: true },
            )
            .setFooter('This setting will sync across servers, and will only have effect on you.')

        const languageSetEN = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Language set')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`You are now using Mirayoki in **English**.`)
            .setFooter('This setting will be synced across servers instantly, and will only have effect on you.')

        const invalidEN = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('That is not a valid option.')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`You are using Mirayoki in **${language}**.`)
            .addFields(
                { name: 'Change Language', value: `In order to change your language, please run the following commands:` },
                { name: 'English 🇬🇧', value: `-lang en`, inline: true },
                { name: 'Español 🇪🇸', value: `-lang es`, inline: true },
            )
            .setFooter('This setting will sync across servers, and will only have effect on you.')


        const menuES = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Idioma')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Estas usando Mirayoki en **${language}**.`)
            .addFields(
                { name: 'Cambiar Idioma', value: `Para poder cambiar el Idioma, por favor escribe el comando de tu idioma preferido:` },
                { name: 'English 🇬🇧', value: `-lang en`, inline: true },
                { name: 'Español 🇪🇸', value: `-lang es`, inline: true },
            )
            .setFooter('Este ajuste se sincronizará entre tus servidores y solo afectará tu experiencia.')

        const languageSetES = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Idioma configurado')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Estas usando Mirayoki ahora en **Español**.`)
            .setFooter('Este ajuste se sincronizará entre tus servidores instántaneamente y solo afectará tu experiencia.')

        const invalidES = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Esa no es una opción válida.')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Estas usando Mirayoki en **${language}**.`)
            .addFields(
                { name: 'Cambiar Idioma', value: `Para poder cambiar el Idioma, por favor escribe el comando de tu idioma preferido:` },
                { name: 'English 🇬🇧', value: `-lang en`, inline: true },
                { name: 'Español 🇪🇸', value: `-lang es`, inline: true },
            )
            .setFooter('Este ajuste se sincronizará entre tus servidores y solo afectará tu experiencia.')


        if (languageChoice == 'en') {
            // If the user choose English for their new language ... 
            await profileModel.findOneAndUpdate({
                userID: message.author.id
                // ... it locates the user ...
            }, {
                $set: {
                    language: languageChoice,
                    // ... and sets the new language.
                }
            });
            message.channel.send(languageSetEN);
            // When it's done, returns a success message.
        } else if (languageChoice == 'es') {
            // If the user choose Spanish for their new language ... 
            await profileModel.findOneAndUpdate({
                userID: message.author.id
                // ... it locates the user ...
            }, {
                $set: {
                    language: languageChoice,
                    // ... and sets the new language.
                }
            });
            message.channel.send(languageSetES);
            // When it's done, returns a success message.
        } else if (!languageChoice) {
            // If there is no language choice on the message ...
            if (profileData.language == 'en') {
                return message.channel.send(menuEN);
            } else if (profileData.language == 'es') {
                return message.channel.send(menuES);
            } // ... Returns an informative message containing the menu
        } else if (languageChoice !== 'en' || 'es') {
            // If the language choice on the message is not supported yet ...
            if (profileData.language == 'en') {
                return message.channel.send(invalidEN);
            } else if (profileData.language == 'es') {
                return message.channel.send(invalidES);
            } // ... returns an error message containing the menu
        }
    }
}