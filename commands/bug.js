module.exports = {
    name: 'bug',
    aliases: ['error', 'report', 'reportar'],
    description: "Few simple steps to report any errors to Slash devs.",
    execute(message, args, cmd, client, Discord, profileData) {

        const instructionsEN = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Oh no.')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('You found an error? Bad grammar? Incorrect translations? \n If so, I would be so grateful that you reported it.')
            .addFields(
                { name: 'How to report:', value: 'Join our support server (https://discord.gg/sbxGVCxdTQ) and open a ticket, we will get to you ASAP.' },
                { name: 'Developer?', value: 'Go straight to our GitHub (https://github.com/Slashy-Studio/mirayoki) and create an issue, our head devs will get to ya.' },
            )
            .setFooter('Thank you for your help!')

        const instructionsES = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Uh oh.')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('Encontraste un error? Mala gramática? Traducciones incorrectas? \n Si es asi, estaría muy agardecido que lo reportaras.')
            .addFields(
                { name: 'Cómo reportar:', value: 'Únete a nuestro servidor de soporte (https://discord.gg/sbxGVCxdTQ) y abre un ticket, estaremos contigo a la de ayer.' },
                { name: 'Desarrollador?', value: 'Ve directo a nuestro GitHub (https://github.com/Slashy-Studio/mirayoki) y crea un Issue, nuestros ingenieros lo recibirán y le darán seguimiento.' },
            )
            .setFooter('Gracias por tu apoyo!')

        if (profileData.language == 'en') {
            return message.channel.send(instructionsEN);
        } else if (profileData.language == 'es') {
            return message.channel.send(instructionsES);
        } // Returns an informative message
    }
}