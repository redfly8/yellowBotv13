const { MessageEmbed, Message, WebhookClient } = require("discord.js");

module.exports = {
  name: "messageDelete",
  /**
   * 
   * @param {Message} message 
   */

  execute(message) {
    if (message.author.bot) return

    const Log = new MessageEmbed()
      .setColor("NAVY")
      .setDescription(`🪵: A [message](${message.url}) from ${message.author} was **deleted**. \n\n **Deleted Message**: \n ${message.content ? message.content : "None"}`.slice(0, 4096))

    if (message.attachments.size >= 1) {
      Log.addField(`Attatchments:`, `${message.attachments.map(a => a.url)}`, true)
    }

    const logger = new WebhookClient({
      id: process.env.loggerid,
      token: process.env.loggertoken
    });


    logger.send({ embeds: [Log] }).catch((err) => console.log(`FAILED: at           webhook, mesageDelete.js ERR: ${err}`));
  }
}