const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");

module.exports = {
  name: "guildMemberRemove",
  /**
   * 
   * @param {GuildMember} member 
   */
  execute(member) {
    const { user, guild } = member;


    const Logger = new WebhookClient({

      id: process.env.byeid,
      token: process.env.byetoken
    })

    const Welcome = new MessageEmbed()
      .setColor("RED")
      .setAuthor(user.tag, user.avatarURL({ dynamic: true, size: 512 }))  //HERE
      .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
      .setDescription(`
        ${member} has left **${guild.name}**!\n
        Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:R> \nLatest Member Count: **${guild.memberCount}**`) //HERE: memberCount => member
      .setFooter(`ID: ${user.id}`)

    Logger.send({ embeds: [Welcome] })



  }
}

