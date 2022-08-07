const { CommandInteraction, Client, MessageEmbed, MessageActionRow, MessageSelectMenu, Message } = require("discord.js")


const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const CONFIG = require('../../Structures/config.json')



module.exports = {
    name: "help",
    description: "see how you use which commands.",

    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        //console.log(client.commands)
        const response = new MessageEmbed()
            .setTitle("Test")
        client.commands.forEach(command => {
            if (command.roleID && interaction.member.roles.cache.has(command.roleID)) {
                response.addField(`${command.name}`, `${command.description}`, false)
                console.log("it did the thing");
            } else if (!command.roleID) {
                response.addField(`${command.name}`, `${command.description}`, false)
            } else console.log(`${command.name}wasnt posted. command.roleID: ${command.roleID}`)
        });
        interaction.reply({ embeds: [response] })
    }
}

