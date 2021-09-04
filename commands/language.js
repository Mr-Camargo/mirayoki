const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'language',
    aliases: ['idioma', 'lang'],
    description: "Set up your preferred language for Mirayoki.",
    async execute(message, args, cmd, client, Discord, profileData) {
        let language = null

        const languageChoice = args[0]

        if (profileData.language == 'en') {
            language = 'English'
        } else if (profileData.language == 'es') {
            language = 'Español'
        }

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
            await profileModel.findOneAndUpdate({
                userID: message.author.id
            }, {
                $set: {
                    language: languageChoice,
                }
            });
            message.channel.send(languageSetEN);
        } else if (languageChoice == 'es') {
            await profileModel.findOneAndUpdate({
                userID: message.author.id
            }, {
                $set: {
                    language: languageChoice,
                }
            });
            message.channel.send(languageSetES);
        } else if (!languageChoice) {
            if (profileData.language == 'en') {
                return message.channel.send(menuEN);
            } else if (profileData.language == 'es') {
                return message.channel.send(menuES);
            }
        } else if (languageChoice !== 'en' || 'es') {
            if (profileData.language == 'en') {
                return message.channel.send(invalidEN);
            } else if (profileData.language == 'es') {
                return message.channel.send(invalidES);
            }
        }
    }
}