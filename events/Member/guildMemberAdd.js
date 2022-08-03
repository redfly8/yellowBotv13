const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");
const CONFIG = require('../../Structures/config.json');

module.exports = {
  name: "guildMemberAdd",
  /**
   * 
   * @param {GuildMember} member 
   */
  execute(member) {
    const { user, guild } = member;

    const memrole = CONFIG.MEMBERROLEID;

    member.roles.add(memrole);

    const Welcomer = new WebhookClient({
      id: process.env.welcomeid,
      token: process.env.welcometoken
    })

    const Welcome = new MessageEmbed()
      .setColor("DARK_AQUA")
      .setAuthor(user.tag, user.avatarURL({ dynamic: true, size: 512 }))  //HERE
      .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
      .setDescription(`
        Welcome ${member} to **${guild.name}**!\n
        Account created: <t:${parseInt(user.createdTimestamp / 1000)}:R> \nLatest Member Count: **${guild.memberCount}**`) //HERE: memberCount => member
      .setFooter(`ID: ${user.id}`)

    Welcomer.send({ embeds: [Welcome] })



  }
}

