module.exports = {
    name: 'perms',
    description: "Display current permissions",
    execute(message, args, cmd, client, Discord, profileData) {

        // Commented entries are currently postponed because of Discord.js v13 Upgrade

        let CREATE_INSTANT_INVITE = []
        let KICK_MEMBERS = []
        let BAN_MEMBERS = []
        let MANAGE_CHANNELS = []
        let MANAGE_GUILD = []
        let ADD_REACTIONS = []
        let VIEW_AUDIT_LOG = []
        let PRIORITY_SPEAKER = []
        let STREAM = []
        let SEND_TTS_MESSAGES = []
        let MANAGE_MESSAGES = []
        let EMBED_LINKS = []
        let ATTACH_FILES = []
        let READ_MESSAGE_HISTORY = []
        let MENTION_EVERYONE = []
        let USE_EXTERNAL_EMOJIS = []
        let VIEW_GUILD_INSIGHTS = []
        let CONNECT = []
        let SPEAK = []
        let MUTE_MEMBERS = []
        let DEAFEN_MEMBERS = []
        let MOVE_MEMBERS = []
        let USE_VAD = []
        let MANAGE_NICKNAMES = []
        let MANAGE_ROLES = []
        let MANAGE_WEBHOOKS = []
        let MANAGE_EMOJIS_AND_STICKERS = []
        let USE_APPLICATION_COMMANDS = []
        let REQUEST_TO_SPEAK = []
        let MANAGE_THREADS = []
        let USE_PUBLIC_THREADS = []
        let USE_PRIVATE_THREADS = []
        let USE_EXTERNAL_STICKERS = []

        const adminAlertEN = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('**Unlimited Power!**')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`You are an **Administrator** of ${message.guild.name}, so you have all permissions!`)
            .setFooter(`@everyone bow to the great ${message.author.username}`)

        const adminAlertES = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('**Poder ilimitado!**')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Eres un **Administrador** de ${message.guild.name}, por lo que tienes todos los permisos!`)
            .setFooter(`@everyone inclinense al gran ${message.author.username}`)

        if (message.member.permissions.has("ADMINISTRATOR")) {
            if (profileData.language == 'en') {
                message.channel.send(adminAlertEN);
            } else if (profileData.language == 'es') {
                message.channel.send(adminAlertES);
            }
        } else if (profileData.language == 'en') {
            if (message.member.permissions.has("CREATE_INSTANT_INVITE")) {
                CREATE_INSTANT_INVITE = 'You can create invites.'
            }
            if (message.member.permissions.has("KICK_MEMBERS")) {
                KICK_MEMBERS = 'You can kick members.'
            }
            if (message.member.permissions.has("BAN_MEMBERS")) {
                BAN_MEMBERS = 'You can ban members.'
            }
            if (message.member.permissions.has("MANAGE_CHANNELS")) {
                MANAGE_CHANNELS = 'You can manage channels.'
            }
            if (message.member.permissions.has("MANAGE_GUILD")) {
                MANAGE_GUILD = 'You can edit server information.'
            }
            if (message.member.permissions.has("ADD_REACTIONS")) {
                ADD_REACTIONS = 'You can add reactions to messages.'
            }
            if (message.member.permissions.has("VIEW_AUDIT_LOG")) {
                VIEW_AUDIT_LOG = 'You can view this server\'s audit log.'
            }
            if (message.member.permissions.has("PRIORITY_SPEAKER")) {
                PRIORITY_SPEAKER = 'You have Priority Speaker enabled.'
            }
            if (message.member.permissions.has("STREAM")) {
                STREAM = 'You can stream your screen.'
            }
            if (message.member.permissions.has("SEND_TTS_MESSAGES")) {
                SEND_TTS_MESSAGES = 'You can send Text-To-Speech messages.'
            }
            if (message.member.permissions.has("MANAGE_MESSAGES")) {
                MANAGE_MESSAGES = 'You can manage messages.'
            }
            if (message.member.permissions.has("EMBED_LINKS")) {
                EMBED_LINKS = 'You can embed links on your messages.'
            }
            if (message.member.permissions.has("ATTACH_FILES")) {
                ATTACH_FILES = 'You can attach files to your messages.'
            }
            if (message.member.permissions.has("READ_MESSAGE_HISTORY")) {
                READ_MESSAGE_HISTORY = 'You can read the message history.'
            }
            if (message.member.permissions.has("MENTION_EVERYONE")) {
                MENTION_EVERYONE = 'You can mention @everyone in your messages.'
            }
            if (message.member.permissions.has("USE_EXTERNAL_EMOJIS")) {
                USE_EXTERNAL_EMOJIS = 'You can use emojis from other servers.'
            }
            /* if (message.member.permissions.has("VIEW_GUILD_INSIGHTS")) {
                VIEW_GUILD_INSIGHTS = 'You can access the Guild Insights dashboard.'
            } */
            if (message.member.permissions.has("CONNECT")) {
                CONNECT = 'You can connect to voice channels.'
            }
            if (message.member.permissions.has("SPEAK")) {
                SPEAK = 'You can speak in voice channels.'
            }
            if (message.member.permissions.has("MUTE_MEMBERS")) {
                MUTE_MEMBERS = 'You can mute members in voice channels.'
            }
            if (message.member.permissions.has("DEAFEN_MEMBERS")) {
                DEAFEN_MEMBERS = 'You can deafen members in voice channels.'
            }
            if (message.member.permissions.has("MOVE_MEMBERS")) {
                MOVE_MEMBERS = 'You can move members within voice channels.'
            }
            if (message.member.permissions.has("USE_VAD")) {
                USE_VAD = 'You can use Voice Activity Detection in voice channels.'
            }
            if (message.member.permissions.has("MANAGE_NICKNAMES")) {
                MANAGE_NICKNAMES = 'You can manage nicknames of members.'
            }
            if (message.member.permissions.has("MANAGE_ROLES")) {
                MANAGE_ROLES = 'You can create, delete and edit roles.'
            }
            if (message.member.permissions.has("MANAGE_WEBHOOKS")) {
                MANAGE_WEBHOOKS = 'You can manage webhooks.'
            }
            /* if (message.member.permissions.has("MANAGE_EMOJI_AND_STICKERSS")) {
                MANAGE_EMOJIS_AND_STICKERS  = 'You can create and delete emojis and stickers.'
            }
            if (message.member.permissions.has("USE_APPLICATION_COMMANDS")) {
                USE_APPLICATION_COMMANDS = 'You can use app commands.'
            }
            if (message.member.permissions.has("REQUEST_TO_SPEAK")) {
                REQUEST_TO_SPEAK = 'You can request to speak in Stages.'
            }
            if (message.member.permissions.has("MANAGE_THREADS")) {
                MANAGE_THREADS = 'You can create, delete and edit threads.'
            }
            if (message.member.permissions.has("USE_PUBLIC_THREADS")) {
                USE_PUBLIC_THREADS = 'You can send messages in public threads.'
            }
            if (message.member.permissions.has("USE_PRIVATE_THREADS")) {
                USE_PRIVATE_THREADS = 'You can send messages in private threads.'
            }
            if (message.member.permissions.has("USE_EXTERNAL_STICKERS")) {
                USE_EXTERNAL_STICKERS = 'You can use stickers from other servers.'
            } */

            const permsEN = new Discord.MessageEmbed()
                .setColor('#55C2FF')
                .setTitle(`Permissions for ${message.guild.name}`)
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Only the perms you have will be listed, if one doesn't show up, then you don't have it.`)
                .addFields(
                    { name: `Permissions`, value: CREATE_INSTANT_INVITE + '\n' + KICK_MEMBERS + '\n' + BAN_MEMBERS + '\n' + MANAGE_CHANNELS + '\n' + MANAGE_GUILD + '\n' + ADD_REACTIONS + '\n' + VIEW_AUDIT_LOG + '\n' + PRIORITY_SPEAKER + '\n' + STREAM + '\n' + SEND_TTS_MESSAGES + '\n' + MANAGE_MESSAGES + '\n' + EMBED_LINKS + '\n' + ATTACH_FILES + '\n' + READ_MESSAGE_HISTORY + '\n' + MENTION_EVERYONE + '\n' + USE_EXTERNAL_EMOJIS + '\n' + /*VIEW_GUILD_INSIGHTS*/ + '\n' + CONNECT + '\n' + SPEAK + '\n' + MUTE_MEMBERS + '\n' + DEAFEN_MEMBERS + '\n' + MOVE_MEMBERS + '\n' + USE_VAD + '\n' + MANAGE_NICKNAMES + '\n' + MANAGE_ROLES + '\n' + MANAGE_WEBHOOKS + '\n' + MANAGE_EMOJIS_AND_STICKERS + '\n' + USE_APPLICATION_COMMANDS + '\n' + REQUEST_TO_SPEAK + '\n' + MANAGE_THREADS + '\n' + USE_PUBLIC_THREADS + '\n' + USE_PRIVATE_THREADS + '\n' + USE_EXTERNAL_STICKERS},
                )

            return message.channel.send(permsEN)
        }
    }
}


// All the permission flags are available at https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS