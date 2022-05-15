const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member){
        const { user, guild } = member;

        member.roles.add("923173796679147550");

        const Welcomer = new WebhookClient({
            id: "954792303476744212",
            token: "ThkFkOTsqfsJ7yjg0tm4161xcJ_E1YrOmMARw2iQJrAkT2LwjFF2siTLgOBpuUpKkoow"
        })

        const Welcome = new MessageEmbed()
        .setColor("DARK_AQUA")
        .setAuthor(user.tag, user.avatarURL({dynamic: true, size: 512}))  //HERE
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
        Welcome ${member} to **${guild.name}**!\n
        Account created: <t:${parseInt(user.createdTimestamp/1000)}:R> \nLatest Member Count: **${guild.memberCount}**`) //HERE: memberCount => member
        .setFooter(`ID: ${user.id}`)

        Welcomer.send({embeds: [Welcome]})

            
        
    }
}

