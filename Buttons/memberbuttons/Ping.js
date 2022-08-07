const { Client, CommandInteraction } = require("discord.js")
const CONFIG = require('../../Structures/config.json')



module.exports = {
  id: "Ping",
  /**
   * 
   * @param {CommandInteraction} interaction 
   * @param {Client} client 
   */

  execute(interaction, client) {
    const pingroleid = CONFIG.PINGROLEID;
    const pingrole = interaction.guild.roles.cache.get(pingroleid);

    if (interaction.member.roles.cache.has(pingroleid)) {
      interaction.reply({ content: "You now wont be notified if someone needs help in game anymore.", ephemeral: true })
      interaction.member.roles.remove(pingrole);
    } else {
      interaction.member.roles.add(pingrole);
      interaction.reply({ content: "You will now receive a ping if someone needs help in game. if you don't want that anymore, just click the button again.", ephemeral: true })

    }

  }
}