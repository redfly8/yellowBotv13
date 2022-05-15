const { CommandInteraction, Client, MessageEmbed } = require("discord.js")



module.exports = {
    name: "help",
    description: "see how you use which commands.",
    options: [
        {
            name: "permission",
            description: "permission",
            type: "STRING",
            required: true,
            choices: [
                { name: "developer", value: "developer" },
                { name: "member", value: "member" },
                { name: "admin", value: "admin" }
            ]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        const group = interaction.options.getString("permission")
        switch (group) {
            case "developer":
                if (!interaction.member.permissions.has("KICK_MEMBERS")) return interaction.reply({ content: "You do not have developer permissions.", ephemeral: true })
                //
                //DEVELOPER
                //
                const replembed = new MessageEmbed()
                    .addFields(
                        { name: "/emitt [event]", value: "emitts a certain event" },
                        { name: "/test", value: "does nothing but everything (code related)" }
                    )
                    .setTitle("Your commands:")
                interaction.reply({ embeds: [replembed], ephemeral: true });

                break;
            case "member":
                const replembedmem = new MessageEmbed()
                    .addFields(
                        { name: "/help [group]", value: "brings this and other menus up" },
                        { name: "/status", value: "tells you the status of the bot and other parameters." },
                        { name: "/suggest [type] [name] [description]", value: "lets you make a nicely formatted suggestion that people can easily vote on" }
                    )
                    .setTitle("Your commands:")
                interaction.reply({ embeds: [replembedmem], ephemeral: true });

                break;
            case "admin":
                const modrole = interaction.guild.roles.cache.find((role) => role.name === "Moderator");//CHANGE ROLENAME HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                if (!interaction.member.roles.cache.has(modrole.id)) return interaction.reply({ content: "You do not have admin permissions.", ephemeral: true });
                const replembedadm = new MessageEmbed()
                    .addFields(
                        { name: "/rep [server][user][reason]", value: "makes a ban report into the ban reports channel (you can execute this in any channel you want though)" },
                        { name: "/ban [user] [reason] [how old of messages do you want to be deleted]", value: "bans a member, sends a message to that member, makes a report and optionally deletes their messages" },
                        { name: "/kick [user] [reason]", value: "kicks a member, sends a message to that member and makes a report" },
                        { name: "userinfo", value: "This is not a command, its a context menu: right click any user => apps => userinfo. It tells you some information about the user (what a surprise, right? 😄 )" }
                    )
                    .setTitle("Your commands:")

                interaction.reply({ embeds: [replembedadm], ephemeral: true });

                break
        }
    }
}