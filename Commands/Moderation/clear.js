const { CommandInteraction, MessageEmbed } = require("discord.js");
const CONFIG = require('../../Structures/config.json')

module.exports = {
    name: "clear",
    description: "Deletes a specified amout of messages from the bottom or from a specific user.",
    permission:"MANAGE_MESSAGES",
    roleID:`${CONFIG.DCMODROLEID}`,
    options:[
        {
            name: "amount",
            description: "Select how many messages you want to delete (from the bottom or from a specific member)",
            type: "NUMBER",
            required: true

        },
        {
            name:"target",
            description: "If you only want to delete messages from a specific user, please state that here.",
            type: "USER",
            required: false
        }
    ],

    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction){
    
        const { channel, options } = interaction;

        const Amount = options.getNumber("amount");
        
        const Target = options.getMember("target");

        const Messages = await channel.messages.fetch();
        const Response = new MessageEmbed()
            .setColor("DARK_BUT_NOT_BLACK");
        
        
        if(Amount <= 100){
            

        if(Target){
            let i = 0;
            const filtered = [];
            (await Messages).filter((m)=>{
                if(m.author.id === Target.id && Amount > i){
                    filtered.push(m);
                    i++
                }
            })

            await channel.bulkDelete(filtered, true).then(messages =>{
                Response.setDescription(`✅ Cleared ${messages.size} messages from ${Target}`);
                interaction.reply({embeds: [Response], ephemeral: true});
            })
        } else{
            await channel.bulkDelete(Amount, true).then(messages =>{
                Response.setDescription(`✅ Cleared ${messages.size} messages from this channel.`)
                interaction.reply({embeds: [Response], ephemeral: true});
            })
        }

        } else{
            Response.setDescription(`❌ I could not delete ${Amount} messages for performance reasons. Please try again with less than 100 at a time.`)
            interaction.reply({embeds : [Response], ephemeral: true})
        }

        
    }
}