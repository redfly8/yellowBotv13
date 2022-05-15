const { MessageEmbed, Message, WebhookClient } = require("discord.js");

module.exports = {
    name: "messageDelete",
/**
 * 
 * @param {Message} message 
 */

    execute(message){
        if(message.author.bot) return

        const Log = new MessageEmbed()
        .setColor("NAVY")
        .setDescription(`🪵: A [message](${message.url}) from ${message.author} was **deleted**. \n\n **Deleted Message**: \n ${message.content ? message.content : "None"}`.slice(0, 4096))

        if(message.attachments.size >= 1){
            Log.addField(`Attatchments:` , `${message.attachments.map(a => a.url)}`, true)
        }

        new WebhookClient({url: "https://discord.com/api/webhooks/955044872837025832/Nhvzf2j57QVquQ1HtlIaU1PrwntAFjOzckqVZ-2yWxPkZVLOTOhNyK4AghHxHXdjMCmm"}
        ).send({embeds: [Log]}).catch((err)=>console.log(`FAILED: at webhook, mesageDelete.js ERR: ${err}`));
    }
}