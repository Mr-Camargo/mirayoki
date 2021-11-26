module.exports = {
    name: 'clear',
    aliases: ['c'],
    cooldown: 10,
    description: "Clears the last ${amount} of messages",
    async execute(message, args, cmd, client, Discord, profileData) {

        let messagesCleared = undefined
        /* This variable will be used to display on an embed 
        the amount of messages that the user wants to clear */

        if (!isNaN(args[0])) {
            // If the first argument is a number
            if (args[0] < 100 || args[0] == 100) {
                // If that number is equal or less than 100
                messagesCleared = args[0]
            } // Set the variable to the first argument
        } else if (isNaN(args[0]) && args[0] == 'max') {
            // If the first argument is not a number, and that argument is 'max'
            messagesCleared = 100
        } /* Set the variable to 100 messages, which will be the amount 
        of messages that will be cleared with the 'max' argument */

        const noArgsEN = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('Please specify the amount of messages you want to clear!')

        const noArgsES = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('Por favor específica la cantidad de mensajes que quieres borrar!')


        const numbersOnlyEN = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('Numbers only please. e.g. -clear 50')
            .setFooter(`Use '-c max' to delete 100 messages!`)

        const numbersOnlyES = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('Solo números por favor. ej: -clear 50')
            .setFooter(`Usa '-c max' para borrar 100 mensajes!`)

        const manyMessagesEN = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('I can only delete 100 messsages at a time.')
            .setFooter(`Use '-c max' to delete 100 messages!`)

        const manyMessagesES = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('Solo puedo eliminar 100 mensajes a la vez.')
            .setFooter(`Usa '-c max' para borrar 100 mensajes!`)

        const noClearEN = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('So... I delete nothing?')

        const noClearES = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('Entonces... no borro nada?')

        const noPermsEN = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Access denied')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('You don\'t have the **Manage Messages** permission to run this command.')

        const noPermsES = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Acceso denegado')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('No tienes el permiso **Gestionar Mensajes** para usar este comando.')

        let clearedEN = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle(`${messagesCleared} messages cleared successfully!`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        let clearedES = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle(`${messagesCleared} mensajes eliminados exitosamente!`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        if (messagesCleared == 1) {
            if (profileData.language == 'en') {
                clearedEN.setTitle(`${messagesCleared} message cleared successfully!`)
                clearedEN.setFooter(`That wasn't very useful...`)
            } else if (profileData.language == 'es') {
                clearedES.setTitle(`${messagesCleared} mensaje eliminado exitosamente!`)
                clearedES.setFooter(`Eso no fue muy útil...`)
            }
        }

        if (message.member.permissions.has("MANAGE_MESSAGES")) {
            // This will check if the user has the Manage Messages permission on their server
            if (!args[0]) {
                // If the user doesn't give any input ...
                if (profileData.language == 'en') {
                    return message.channel.send(noArgsEN);
                } else if (profileData.language == 'es') {
                    return message.channel.send(noArgsES);
                } // ... returns an error message.
            } else if (args[0] == 'help') {
                // If the first argument is 'help'
                const clearHelpEN = new Discord.MessageEmbed()

                    .setColor('#55C2FF')
                    .setTitle(`Help for 'clear' command`)
                    .setDescription('Keep your channels clean and tidy with Mirayoki.')
                    .addFields(
                        { name: 'Clear (x) messages', value: 'You may want to specify how many messages you want to be cleared.' },
                        { name: '-clear 50', value: 'This will clear the last 50 messages.', inline: true },
                        { name: '-c 25', value: 'This will clear the last 25 messages.', inline: true },
                        { name: 'Clean it the most.', value: 'Mirayoki is able to only delete 100 messages at a time.' },
                        { name: '-c 100', value: 'This will clear the last 100 messages, the maximum Mirayoki can at a time.', inline: true },
                        { name: '-clear max', value: 'This will clear the last 100 messages too, because it is the maximum Mirayoki can at a time.', inline: true },
                    )
                    .setFooter('Use -support if you require more help!')

                const clearHelpES = new Discord.MessageEmbed()

                    .setColor('#55C2FF')
                    .setTitle(`Ayuda para el comando 'clear'`)
                    .setDescription('Mantén tus canales limpios y ordenados con Mirayoki.')
                    .addFields(
                        { name: 'Borra (x) mensajes', value: 'Es posible que quieras especificar cuántos mensajes quieres borrar.' },
                        { name: '-clear 50', value: 'Esto borrará los últimos 50 mensajes', inline: true },
                        { name: '-c 25', value: 'Esto borrará los últimos 25 mensajes', inline: true },
                        { name: 'Limpialo lo más posible.', value: 'Mirayoki solo puede borrar 100 mensajes a la vez.' },
                        { name: '-c 100', value: 'Esto borrará los últimos 100 mensajes, el máximo que Mirayoki puede a la vez.', inline: true },
                        { name: '-clear max', value: 'Esto también borrara los últimos 100 mensajes, porque es el máximo que Mirayoki puede a la vez ', inline: true },
                    )
                    .setFooter('Usa -support si requieres más ayuda!')

                if (profileData.language == 'en') {
                    return message.channel.send(clearHelpEN);
                } else if (profileData.language == 'es') {
                    return message.channel.send(clearHelpES);
                } // Returns an informative message with help
            } else if (isNaN(args[0])) {
                if (args[0] == 'max') {
                    /* If the user's argument is 'max', continues executing the command as 
                    it is a valid argument to delete 100 messages at once */
                }
                // If the user gives an input that is not a number ...
                else if (profileData.language == 'en') {
                    return message.channel.send(numbersOnlyEN);
                } else if (profileData.language == 'es') {
                    return message.channel.send(numbersOnlyES);
                } // ... returns an error message.
            } else if (args[0] > 100) {
                // If the user wants to clear more than 100 messages at once ...
                if (profileData.language == 'en') {
                    return message.channel.send(manyMessagesEN);
                } else if (profileData.language == 'es') {
                    return message.channel.send(manyMessagesES);
                } // ... returns an error message.
            } else if (args[0] < 1) {
                // If the user gives an input below 1 ...
                if (profileData.language == 'en') {
                    return message.channel.send(noClearEN);
                } else if (profileData.language == 'es') {
                    return message.channel.send(noClearES);
                } // ... returns an error message.
            }

            if (!isNaN(args[0])) {
                // If it is a valid number ...
                await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
                    message.channel.bulkDelete(messages);
                    // ... it deletes the messages that the user specified ...
                    if (profileData.language == 'en') {
                        return message.channel.send(clearedEN);
                    } else if (profileData.language == 'es') {
                        return message.channel.send(clearedES);
                    }
                    // ... and returns a success message.
                });
            } else if (isNaN(args[0]) && args[0] == 'max') {
                // If it is not a valid number, but the argument is 'max'
                await message.channel.messages.fetch({ limit: 100 }).then(messages => {
                    message.channel.bulkDelete(messages);
                    // ... it deletes 100 messages, the maximum Mirayoki can at a time ...
                    if (profileData.language == 'en') {
                        return message.channel.send(clearedEN);
                    } else if (profileData.language == 'es') {
                        return message.channel.send(clearedES);
                    }
                    // ... and returns a success message.
                });
            }

        } else {
            // In case the user doesn't have the Manage Messages permission, an error message will appear.
            if (profileData.language == 'en') {
                return message.channel.send(noPermsEN);
            } else if (profileData.language == 'es') {
                return message.channel.send(noPermsES);
            }
        }
    }
}