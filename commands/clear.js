module.exports = {
    name: 'clear',
    aliases: ['c'],
    cooldown: 10,
    description: "clear last {amount} of messages",
    async execute(message, args, cmd, client, Discord, profileData) {

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

        const numbersOnlyES = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('Solo números por favor. ej: -clear 50')

        const manyMessagesEN = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('I can only delete 100 messsages at a time.')

        const manyMessagesES = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('Solo puedo eliminar 100 mensajes a la vez.')

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

        const yesClearEN = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Cleared succesfully!')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('Delete me if you want')

        const yesClearES = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Eliminado exitosamente!')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('Borrame si quieres')

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


        if (message.member.permissions.has("MANAGE_MESSAGES")) {
            if (!args[0]) {
                if (profileData.language == 'en') {
                    return message.channel.send(noArgsEN);
                } else if (profileData.language == 'es') {
                    return message.channel.send(noArgsES);
                }
            } else if (isNaN(args[0])) {
                if (profileData.language == 'en') {
                    return message.channel.send(numbersOnlyEN);
                } else if (profileData.language == 'es') {
                    return message.channel.send(numbersOnlyES);
                }
            } else if (args[0] > 100) {
                if (profileData.language == 'en') {
                    return message.channel.send(manyMessagesEN);
                } else if (profileData.language == 'es') {
                    return message.channel.send(manyMessagesES);
                }
            } else if (args[0] < 1) {
                if (profileData.language == 'en') {
                    return message.channel.send(noClearEN);
                } else if (profileData.language == 'es') {
                    return message.channel.send(noClearES);
                }
            }
            await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
                message.channel.bulkDelete(messages);
                if (profileData.language == 'en') {
                    return message.channel.send(yesClearEN);
                } else if (profileData.language == 'es') {
                    return message.channel.send(yesClearES);
                }
            });

        } else {
            if (profileData.language == 'en') {
                return message.channel.send(noPermsEN);
            } else if (profileData.language == 'es') {
                return message.channel.send(noPermsES);
            }
        }
    }
}