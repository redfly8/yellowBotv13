const { CommandInteraction, Client } = require("discord.js");
const asciiTable = require("ascii-table");
const CONFIG = require('../../Structures/config.json')

module.exports = {
    name: "test",
    description: "Only for devs. Test a piece of code.",
    roleID:`${CONFIG.DEVROLEID}`,
    options: [
        {
            name: "senderror",
            description: "Select if you want to send any error messages into chat.",
            type: "BOOLEAN",
            required: true
        }
    ],

    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
     execute(interaction, client){
            
                const { options } = interaction;
                const senderr = options.getBoolean("senderror");
        try{
            const repchannel = client.channels.cache.get("957360683924742204")

            repchannel.send("TEST");

            interaction.reply("SUCCESSSSS!!! =)")

            

            
        }catch(err){
            if(senderr == true){
                return interaction.reply({content: `${err}`, ephemeral: true});
            }else{
                const { ascii } = require("ascii-table")
                const AsciiTable = require("ascii-table/ascii-table")
                const Table = new AsciiTable(`An error occured [test.js] ERR:`)
                Table.addRow(err)
                console.log(Table.toString())
                return interaction.reply({content: "An error occured. Check the console.", ephemeral: true})}

        }
        
    }
}