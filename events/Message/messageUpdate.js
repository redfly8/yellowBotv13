const { MessageEmbed, Message, WebhookClient } = require("discord.js");
 module.exports = {
     name: "messageUpdate",

     /**
      * 
      * @param {Message} oldMessage 
      * @param {Message} newMessage 
      */
     execute(oldMessage,newMessage){
        if(oldMessage.author.bot) return;

        if(oldMessage.content === newMessage.content) return;

        const Count = 1950;

        const Original = oldMessage.content.slice(0, Count) + (oldMessage.content.length > Count ? " ..." : "");
        const Edited = newMessage.content.slice(0, Count) + (newMessage.content.lenght > Count ? " ..." : "");

        const Log = new MessageEmbed()
        .setColor("DARK_NAVY")
        .setDescription(`🪵 A [message](${newMessage.url}) by ${newMessage.author} was **edited** in ${newMessage.channel}\n
        **Original**: \n ${Original} \n **Edited**:\n${Edited} `)
        .setFooter(`Member: ${newMessage.author.tag} | ID: ${newMessage.author.id}`);

        new WebhookClient({url: "https://discord.com/api/webhooks/955044872837025832/Nhvzf2j57QVquQ1HtlIaU1PrwntAFjOzckqVZ-2yWxPkZVLOTOhNyK4AghHxHXdjMCmm"}
        ).send({embeds: [Log]}).catch((err)=>console.log(`FAILED: at webhook, mesageUpdate.js ERR: ${err}`));
     }
 }