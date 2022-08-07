const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const CONFIG = require('../../Structures/config.json');



module.exports = {
  name: "rep",
  description: "make a ban report",
  roleID: `${CONFIG.FSADMINID}`,
  options: [
    {
      name: "server",
      description: "Grain, Silage or Private?",
      type: "STRING",
      required: true,
      choices: [
        {
          name: "Silage",
          value: "Silage"
        },
        {
          name: "Grain",
          value: "Grain"
        },
        {
          name: "Private",
          value: "Private"
        }
      ]


    },
    {
      name: "user",
      description: "What was the username of the person you banned?",
      type: "STRING",
      required: true
    },
    {
      name: "reason",
      description: "Why did you ban that person?",
      type: "STRING",
      required: true
    }
  ],
  /**
   * 
   * @param {CommandInteraction} interaction 
   * @param {Client} client 
   */

  execute(interaction, client) {
    const CHANNEL = client.channels.cache.get(CONFIG.FSBANREPCHID);
    const { options } = interaction;

    const Reason = options.getString("reason");
    const Server = options.getString("server");
    const User = options.getString("user");
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    var today = `${month}/${day}/${year}`;



    const Response = new MessageEmbed()
      .setColor("DARK_RED")
      .setTitle("**Ban** ⛔")
      .addField("**Server**:", `${Server}\n`)
      .addField("**User**:", `${User}`)
      .addField("**Reason**:", `${Reason}`)
      .setFooter(`Admin: ${interaction.user.tag} Date: ${today}`)

    CHANNEL.send({ embeds: [Response] });
    interaction.reply({ content: "The report was sent. ✅", ephemeral: true })

  }
}