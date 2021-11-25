module.exports = {
    name: 'dev',
    description: "Includes advanced tools for Slash staff to troubleshoot more easily",
    async execute(message, args, cmd, client, Discord, profileData) {

        // This variables will help with authentication of staff members
        let clearanceLvl = null
        let isStaff = false

        const date = new Date();

        /* All these flags are assigned manually by higher Staff Members,
        and a clearance level is assigned to every new employee/contributor 
        depending their position */
        if (profileData.clearanceLvl == 'X') {
            clearanceLvl = "**X** | Full access"
            isStaff = true
        } else if (profileData.clearanceLvl == 'IV') {
            clearanceLvl = "**IV** | DB Access, Inspection and Suspension"
            isStaff = true
        } else if (profileData.clearanceLvl == 'III') {
            clearanceLvl = "**III** | Logs and Inspection"
            isStaff = true
        } else if (profileData.clearanceLvl == 'II') {
            clearanceLvl = "**II** | Logs and Restricted DB"
            isStaff = true
        } else if (profileData.clearanceLvl == 'I') {
            clearanceLvl = "**I** | Logs"
            isStaff = true
        } else if (profileData.clearanceLvl == 'none' || null) {
            clearanceLvl = "No Clearance"
        }

        const beepbeep = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('*beep beep*')
            .setDescription(`Welcome back, ${message.author}`)
            .setThumbnail(profileData.staffPfp)
            .addFields(
                { name: 'Logged in as:', value: message.author.tag },
                { name: 'Clearance Level', value: clearanceLvl },
                { name: 'Staff Unit', value: profileData.staffUnit },
                { name: 'GitHub Clearance', value: profileData.gitHubClearance },
            )

        const boopboop = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Access Denied')
            .setDescription(`You, ${message.author}, don't have any clearance level over Mirayoki, be a Staff Member or GitHub contributor.`)
            .setFooter(`You tried to operate Mirayoki as ${message.author.tag}`)

        const help = new Discord.MessageEmbed()

            .setColor('#55C2FF')
            .setTitle('Need Help?')
            .setDescription(`Remember your clearance level is **${profileData.clearanceLvl}**`)
            .addFields(
                { name: 'Clearance **X**', value: 'Usually the CEO, it can do anything.' },
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

        if (!isStaff) return message.channel.send(boopboop);
        // If the user is not on the database as a staff member, returns an error message.
        else if (isStaff) {
            if (args[0] === 'reboot') {
                // If the first argument is 'reboot'
                message.channel.send(rebooting).then(m => {
                    // Will inform the staff member about the reboot attempt
                    console.log(`${message.author.tag} started a reboot at ${date}`)
                    // Mirayoki will log that a reboot attempt was started by the staff member
                    client.destroy(); {
                        // The Mirayoki process will end ...
                        client.login(process.env.SECRET_TOKEN);
                        // ... and will boot up again
                        console.log(`${message.author.tag} rebooted Mirayoki at ${date}`)
                        // Mirayoki will log that a succesful reboot was done by the staff member 
                        message.channel.send(rebooted)
                        // Will inform the staff member about the succesful reboot
                        client.user.setActivity(process.env.ACTIVITY, { type: process.env.ACTIVITY_TYPE })
                            .then(presence => console.log(`Rich Presence rebooted succesfully as "${presence.activities[0].type} ${presence.activities[0].name}" at ${date}`))
                            // This will just print the Rich Presence that you have chosen for Mirayoki.
                            .catch(console.error);
                    };
                });
            } else if (args[0] === 'help') {
                // If the first argument is 'help'
                return message.channel.send(help)
                // Returns an informative message with help
            } else if (!args[0]) {
                // If there are no arguments
                return message.channel.send(beepbeep)
                // Returns an informative message with the staff member's information
            }
        }
    }
}