const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");

module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member){
        const { user, guild } = member;


        const Logger = new WebhookClient({
            //https://discord.com/api/webhooks/954800677073334333/Hk8phjuSdhf4ATR9oegmeP6V6k9EEuXl2RojHEXkFh93UoVc5e2MIbWVqRcDzC3Vwzvb
            id: "954800677073334333",
            token: "Hk8phjuSdhf4ATR9oegmeP6V6k9EEuXl2RojHEXkFh93UoVc5e2MIbWVqRcDzC3Vwzvb"
        })

        const Welcome = new MessageEmbed()
        .setColor("RED")
        .setAuthor(user.tag, user.avatarURL({dynamic: true, size: 512}))  //HERE
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
        ${member} has left **${guild.name}**!\n
        Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:R> \nLatest Member Count: **${guild.memberCount}**`) //HERE: memberCount => member
        .setFooter(`ID: ${user.id}`)

        Logger.send({embeds: [Welcome]})

            
        
    }
}

