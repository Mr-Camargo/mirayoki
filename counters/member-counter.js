/* This is not yet implemented, but it will work as a member counter
 that updates the name of a voice channel */

/* module.exports =  async (client) =>{
    const guild = client.guilds.cache.get('795484085149368341');
    setInterval(() =>{
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('795484085606285324');
        channel.setName(`Members: ${memberCount.toLocaleString()}`);
        console.log('Member Count Synced')
    }, 5000000);
} */

/* 5000000ms is the default time
 5000ms is the testing time

 If member counter doesn't sync instantly with New Users, remember that Discord
 has a cooldown for bots for doing this, and may take up to 3 hours to sync with 
 the module. */