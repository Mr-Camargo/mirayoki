module.exports = {
    name: 'dev',
    description: "Includes advanced tools for Slash staff to troubleshoot more easily",
    async execute(message, args, cmd, client, Discord, profileData) {
        let isStaff = message.author.id == '431531456372670484';
        const date = new Date();

        let clearanceLvl = 'None'
        if (profileData.clearanceLvl == 'X') {
            clearanceLvl = "**X** | Full access"
        } else if (profileData.clearanceLvl == 'IV') {
            clearanceLvl = "**IV** | DB Access, Inspection and Suspension"
        } else if (profileData.clearanceLvl == 'III') {
            clearanceLvl = "**III** | Logs and Inspection"
        } else if (profileData.clearanceLvl == 'II') {
            clearanceLvl = "**II** | Logs and Restricted DB"
        } else if (profileData.clearanceLvl == 'I') {
            clearanceLvl = "**I** | Logs"
        } else if (profileData.clearanceLvl == 'none') {
            clearanceLvl = "No Clearance"
        }
        const beepbeep = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('*beep beep*')
            .setDescription(`Welcome back, ${message.author}`)
            .addFields(
                { name: 'Logged in as:', value: message.author.tag },
                { name: 'Clearance Level', value: clearanceLvl },
                { name: 'Staff Unit', value: profileData.staffUnit },
                { name: 'GitHub Clearance', value: profileData.gitHubClearance },
            )

        const help = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Need Help?')
            .setDescription(`Remember your clearance level is **${profileData.clearanceLvl}**`)
            .addFields(
                { name: 'Clearance **X**', value: 'Usually the CEO, it can do anything.'},
                { name: '-reboot', value: 'Reboots the bot, stops service for a few seconds.', inline: true },
            )
        const rebooting = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Rebooting...')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('This may take up to 5 minutes.')
            .setFooter(`Logged in as ${message.author.tag}`)

        const rebooted = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Rebooted!')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Ping is ${Date.now() - message.createdTimestamp}ms.`)
            .setFooter(`Logged in as ${message.author.tag}`)

        if (!isStaff) return message.channel.send('No ur bad');
        if (args[0] === 'reboot') {
            message.channel.send(rebooting).then(m => {
                console.log(`${message.author.tag} started a reboot at ${date}`)
                client.destroy(); {
                    client.login(process.env.SECRET_TOKEN);
                    console.log(`${message.author.tag} rebooted Mirayoki at ${date}`)
                    message.channel.send(rebooted)
                };
            });
        } else if (args[0] === 'help') {
            message.channel.send(help)
        } else if (!args[0]) {
            message.channel.send(beepbeep)
        }
    }
}