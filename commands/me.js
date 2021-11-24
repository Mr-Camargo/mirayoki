const { guildMember } = require("discord.js");

module.exports = {
    name: 'me',
    description: 'Gives you information about your Discord account.',
    async execute(message, args, cmd, client, Discord, profileData) {

        let user = null
        /* This will be set with the user ID of the user that requests 
        their information or the user whose information is being requested. */

        let checkingOtherUser = null
        /* This will be set if the user who wants to know 
        their information is not the sender of the message. */

        if (!args[0]) {
            // If no other arguments are made on the command ...
            user = message.author;
            checkingOtherUser = false
            // ... the Bot supposes the user wants to know their own info.
        } else if (args[0]) {
            // If there is an argument made on the command ...
            if (message.mentions.members.first()) {
                // It looks if there is a mention on the command ...
                user = message.mentions.users.first()
                // ... and sets the mentioned user to use for the command.
                if (user == message.author) {
                    // If the mentioned user is the sender of the message ...
                    checkingOtherUser = false
                    // ... the Bot realizes there is no other user to check than the sender itself.
                } else if (user) {
                    // However, if there is a mention of someone that is not the sender of the message ...
                    checkingOtherUser = true
                    // ... the Bot then will be looking for info of someone else that is not the sender.
                }
            } else {
                if (args[0] == 'help') {
                    // If the first argument is 'help'
                    user = undefined
                    checkingOtherUser = undefined
                    // The Bot will then proceed to provide a help message, and leaving empty the query.
                } else {
                    // If no arguments are made
                    user = message.author
                    checkingOtherUser = false
                    /* The Bot will fill the query with the sender of the message and 
                    will treat this as a personal query */
                }
            }
        }

        if (user && !checkingOtherUser) {
            // If the user is the sender of the command, and it is not checking any other user

            const member = message.guild.member(user);

            const activities = [];

            // This will fill a variable with the user's activity
            for (const activity of user.presence.activities.values()) {
                switch (activity.type) {
                    case 'PLAYING':
                        if (profileData.language == 'en') {
                            activities.push(`Playing **${activity.name}**`);
                        } if (profileData.language == 'es') {
                            activities.push(`Jugando a **${activity.name}**`);
                        }
                        break;
                    case 'LISTENING':
                        if (profileData.language == 'en') {
                            if (user.bot) activities.push(`Listening to **${activity.name}**`);
                            else activities.push(`Listening to **${activity.details}** by **${activity.state}**`);
                        } else if (profileData.language == 'es') {
                            if (user.bot) activities.push(`Escuchando **${activity.name}**`);
                            else activities.push(`Escuchando **${activity.details}** de **${activity.state}**`);
                        }
                        break;
                    case 'WATCHING':
                        if (profileData.language == 'en') {
                            activities.push(`Watching **${activity.name}**`);
                        }
                        else if (profileData.language == 'es') {
                            activities.push(`Viendo **${activity.name}**`);
                        }
                        break;
                    case 'STREAMING':
                        if (profileData.language == 'en') {
                            activities.push(`Streaming **${activity.name}**`);
                        }
                        else if (profileData.language == 'es') {
                            activities.push(`En directo **${activity.name}**`);
                        }
                        break;
                    case 'CUSTOM_STATUS':
                        customStatus = activity.state;
                        break;
                }
            }

            let userStatus = null

            // This will fill a variable with the user's online status
            if (user.presence.status == "online") {
                if (profileData.language == 'en') {
                    userStatus = ":green_circle: Online"
                } else if (profileData.language == 'es') {
                    userStatus = ":green_circle: En línea"
                }
            } else if (user.presence.status == "idle") {
                if (profileData.language == 'en') {
                    userStatus = ":crescent_moon: Idle"
                } else if (profileData.language == 'es') {
                    userStatus = ":crescent_moon: Ausente"
                }
            } else if (user.presence.status == "dnd") {
                if (profileData.language == 'en') {
                    userStatus = ":no_entry: Do Not Disturb"
                } else if (profileData.language == 'es') {
                    userStatus = ":no_entry: No Molestar"
                }
            } else if (user.presence.status == "offline") {
                if (profileData.language == 'en') {
                    userStatus = ":white_circle: Invisible/Offline"
                } else if (profileData.language == 'es') {
                    userStatus = ":white_circle: Invisible/Fuera de línea"
                }
            }

            const meEN = new Discord.MessageEmbed()
                .setColor('#55C2FF')
                .setTitle(`This is you.`)
                .setDescription(`And you are **${user.username}**.`)
                .setThumbnail(user.avatarURL({ dynamic: true }))
                .addFields(
                    { name: 'Username', value: user.tag },
                    { name: 'Server Nickname', value: member.displayName },
                    { name: 'User ID', value: user.id },
                    { name: `Status`, value: userStatus + '\n' + activities },
                    { name: 'Joined Discord:', value: user.createdAt },
                    { name: `Roles on ${message.guild.name}`, value: '' + member.roles.cache.map(r => r).join(' | ') + '' },
                )
                .setFooter('You are beautiful!')

            const meES = new Discord.MessageEmbed()
                .setColor('#55C2FF')
                .setTitle(`Este eres tu.`)
                .setDescription(`Y tu eres **${user.username}**.`)
                .setThumbnail(user.avatarURL({ dynamic: true }))
                .addFields(
                    { name: 'Nombre de usuario', value: user.tag },
                    { name: 'Apodo en el servidor', value: member.displayName },
                    { name: 'ID de usuario', value: user.id },
                    { name: `Estado`, value: userStatus + '\n' + activities },
                    { name: 'Te uniste a Discord:', value: user.createdAt },
                    { name: `Roles en ${message.guild.name}`, value: '' + member.roles.cache.map(r => r).join(' | ') + '' },
                )
                .setFooter('Eres una gran persona!')

            if (profileData.language == 'en') {
                return message.channel.send(meEN)
            } else if (profileData.language == 'es') {
                return message.channel.send(meES)
            } // Returns an informative message with the user's information

        } else if (user && checkingOtherUser) {
            // If the user is not the sender of the command, and it is checking other user

            const member = message.guild.member(user);

            const activities = [];

            // This will fill a variable with the user's activity
            for (const activity of user.presence.activities.values()) {
                switch (activity.type) {
                    case 'PLAYING':
                        if (profileData.language == 'en') {
                            activities.push(`Playing **${activity.name}**`);
                        } if (profileData.language == 'es') {
                            activities.push(`Jugando a **${activity.name}**`);
                        }
                        break;
                    case 'LISTENING':
                        if (profileData.language == 'en') {
                            if (user.bot) activities.push(`Listening to **${activity.name}**`);
                            else activities.push(`Listening to **${activity.details}** by **${activity.state}**`);
                        } else if (profileData.language == 'es') {
                            if (user.bot) activities.push(`Escuchando **${activity.name}**`);
                            else activities.push(`Escuchando **${activity.details}** de **${activity.state}**`);
                        }
                        break;
                    case 'WATCHING':
                        if (profileData.language == 'en') {
                            activities.push(`Watching **${activity.name}**`);
                        }
                        else if (profileData.language == 'es') {
                            activities.push(`Viendo **${activity.name}**`);
                        }
                        break;
                    case 'STREAMING':
                        if (profileData.language == 'en') {
                            activities.push(`Streaming **${activity.name}**`);
                        }
                        else if (profileData.language == 'es') {
                            activities.push(`En directo **${activity.name}**`);
                        }
                        break;
                    case 'CUSTOM_STATUS':
                        customStatus = activity.state;
                        break;
                }
            }

            let userStatus = null

            // This will fill a variable with the user's online status
            if (user.presence.status == "online") {
                if (profileData.language == 'en') {
                    userStatus = ":green_circle: Online"
                } else if (profileData.language == 'es') {
                    userStatus = ":green_circle: En línea"
                }
            } else if (user.presence.status == "idle") {
                if (profileData.language == 'en') {
                    userStatus = ":crescent_moon: Idle"
                } else if (profileData.language == 'es') {
                    userStatus = ":crescent_moon: Ausente"
                }
            } else if (user.presence.status == "dnd") {
                if (profileData.language == 'en') {
                    userStatus = ":no_entry: Do Not Disturb"
                } else if (profileData.language == 'es') {
                    userStatus = ":no_entry: No Molestar"
                }
            } else if (user.presence.status == "offline") {
                if (profileData.language == 'en') {
                    userStatus = ":white_circle: Invisible/Offline"
                } else if (profileData.language == 'es') {
                    userStatus = ":white_circle: Invisible/Fuera de línea"
                }
            }

            const themEN = new Discord.MessageEmbed()
                .setColor('#55C2FF')
                .setTitle(`This is **${user.username}**.`)
                .setThumbnail(user.avatarURL({ dynamic: true }))
                .addFields(
                    { name: 'Username', value: user.tag },
                    { name: 'Server Nickname', value: member.displayName },
                    { name: 'User ID', value: user.id },
                    { name: `Status`, value: userStatus + '\n' + activities },
                    { name: 'Joined Discord:', value: user.createdAt },
                    { name: `Roles on ${message.guild.name}`, value: '' + member.roles.cache.map(r => r).join(' | ') + '' },
                )
                .setFooter('You and them are beautiful!')

            const themES = new Discord.MessageEmbed()
                .setColor('#55C2FF')
                .setTitle(`Este es **${user.username}**.`)
                .setThumbnail(user.avatarURL({ dynamic: true }))
                .addFields(
                    { name: 'Nombre de usuario', value: user.tag },
                    { name: 'Apodo en el servidor', value: member.displayName },
                    { name: 'ID de usuario', value: user.id },
                    { name: `Estado`, value: userStatus + '\n' + activities },
                    { name: 'Se unieron a Discord:', value: user.createdAt },
                    { name: `Roles en ${message.guild.name}`, value: '' + member.roles.cache.map(r => r).join(' | ') + '' },
                )
                .setFooter('Tu y ellos son grandes personas!')

            const thatsMeEN = new Discord.MessageEmbed()
                .setColor('#55C2FF')
                .setTitle(`This is **me**.`)
                .setThumbnail(user.avatarURL({ dynamic: true }))
                .addFields(
                    { name: 'Username', value: 'Mirayoki#9244' },
                    { name: 'Server Nickname', value: member.displayName },
                    { name: 'Bot ID', value: process.env.BOT_ID },
                    { name: `Status`, value: userStatus + '\n' + activities },
                    { name: 'I was created:', value: 'An afternoon of July 4, 2021, at 02:33:35 UTC' },
                    { name: `Roles in ${message.guild.name}`, value: '' + member.roles.cache.map(r => r).join(' | ') + '' },
                )
                .setFooter('Thank you for your interenst of knowing me :)')

            const thatsMeES = new Discord.MessageEmbed()
                .setColor('#55C2FF')
                .setTitle(`Este soy **yo**.`)
                .setThumbnail(user.avatarURL({ dynamic: true }))
                .addFields(
                    { name: 'Nombre de usuario', value: 'Mirayoki#9244' },
                    { name: 'Apodo en el servidor', value: member.displayName },
                    { name: 'ID de Bot', value: process.env.BOT_ID },
                    { name: `Estado`, value: userStatus + '\n' + activities },
                    { name: 'Fui creado:', value: 'Una tarde de Junio 4, 2021, a las 02:33:35 UTC' },
                    { name: `Roles en ${message.guild.name}`, value: '' + member.roles.cache.map(r => r).join(' | ') + '' },
                )
                .setFooter('Gracias por querer conocerme :)')

            if (user.id === process.env.BOT_ID) {
                // If the sender of the message wants to get information about Mirayoki
                if (profileData.language == 'en') {
                    return message.channel.send(thatsMeEN)
                } else if (profileData.language == 'es') {
                    return message.channel.send(thatsMeES)
                } // Returns an informative message with Mirayoki's information
            } else if (profileData.language == 'en') {
                return message.channel.send(themEN)
            } else if (profileData.language == 'es') {
                return message.channel.send(themES)
            } // Returns an informative message with the requested user's information

        } else if (user == undefined && checkingOtherUser == undefined) {
            // If the user requested help, making the Bot leave the query empty

            const helpEN = new Discord.MessageEmbed()

                .setColor('#55C2FF')
                .setTitle(`How to view someone's public information`)
                .setDescription(`With Mirayoki, you can see more in-depth details about yourself or someone else!`)
                .addFields(
                    { name: 'What can you view', value: 'Mirayoki respects user privacy, that\'s why we ask to the Discord\'s API to give us information about a user, and Mira just displays that information for you.' },
                    { name: 'Username', value: 'Your Username at Discord is how people can mention/befriend you.', inline: true },
                    { name: 'Server Nickname', value: 'This is how you are named **in this server only**.', inline: true },
                    { name: 'User ID', value: 'This unique identifier is given to you when you first create your Discord account, and never changes.', inline: true },
                    { name: 'Status', value: 'Your online status.', inline: true },
                    { name: 'Joined Discord', value: 'This is the exact date and time you created your Discord account, provided by Discord\'s API.', inline: true },
                    { name: `Roles on ${message.guild.name}`, value: `Lists all your roles on **${message.guild.name} ONLY**.`, inline: true },
                    { name: 'How to check', value: 'Know how to use the -me command.' },
                    { name: `-me`, value: 'This provides all the public information about you.', inline: true },
                    { name: '-me @Sum1Else', value: 'This provides all the public information about someone else you mention.', inline: true },
                )
                .setFooter('If you are still having trouble, be sure to type -support for more help!')

            const helpES = new Discord.MessageEmbed()

                .setColor('#55C2FF')
                .setTitle(`Como ver la información publica de alguien`)
                .setDescription(`Con Mirayoki, puedes ver información a más profundidad acerca de ti o alguien más!`)
                .addFields(
                    { name: 'Qué puedes ver', value: 'Mirayoki respeta la privacidad de sus usuarios, por eso, usamos la API de Discord para que nos proporcione información acerca de ti, y Mirayoki la presentará hacia ti.' },
                    { name: 'Nombre de Usuario', value: 'Tu Nombre de Usuario en Discord se usa para que la gente te pueda mensajear/agregar de amigo.', inline: true },
                    { name: 'Apodo en el servidor', value: 'Este es tu nombre **sólo en este servidor**.', inline: true },
                    { name: 'ID de Usuario', value: 'Uste identificador único es asignado a ti cuando creas tu cuenta de Discord, y nunca cambia.', inline: true },
                    { name: 'Estado', value: 'Tu estado en línea.', inline: true },
                    { name: 'Te uniste a Discord.', value: 'Este es el día y hora específico cuando creaste tu cuenta de Discord. proporcionada por la API de Discord.', inline: true },
                    { name: `Roles en ${message.guild.name}`, value: `Lista todos tus roles en **${message.guild.name} SOLAMENTE**.`, inline: true },
                    { name: 'Cómo ver', value: 'Aprende cómo usar el commando -me.' },
                    { name: `-me`, value: 'Esto te dará toda tu información pública acerca de ti.', inline: true },
                    { name: '-me @Algu1enMa5', value: 'Esto te dará toda la información pública acerca de alguien más.', inline: true },
                )
                .setFooter('Si aún tienes problemas, asegúrate de usar el commando -support para asistencia!')

            if (profileData.language == 'en') {
                return message.channel.send(helpEN)
            } else if (profileData.language == 'es') {
                return message.channel.send(helpES)
            } // Returns an informative message with help

        } else {
            // If there is an error that doesn't let Mirayoki get information about the requested user
            const errorEN = new Discord.MessageEmbed()

                .setColor('#FF5733')
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setTitle(`Error`)
                .setDescription(`Something bad happened while trying to get data for this user!`)
                .setFooter('If you are still having trouble, be sure to type -support for more help!')

            const errorES = new Discord.MessageEmbed()

                .setColor('#FF5733')
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setTitle(`Error`)
                .setDescription(`Algo malo pasó al tratar de obtener información acerca de este usuario!`)
                .setFooter('Si aún tienes problemas, asegúrate de usar el commando -support para asistencia!')

            if (profileData.language == 'en') {
                return message.channel.send(errorEN)
            } else if (profileData.language == 'es') {
                return message.channel.send(errorES)
            } // Returns an error message
        }
    }
}