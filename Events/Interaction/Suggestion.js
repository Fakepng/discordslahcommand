const { ButtonInteraction } = require("discord.js");
const DB = require("../../Structures/Schemas/SuggestDB");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {
        if (!interaction.isButton()) return;
        if (!interaction.member.permissions.has("ADMINISTRATOR"))
        return interaction.reply({ content: "⛔️ You don't have the permission to use this command.", ephemeral: true });

        const { guildId, CustomId, message } = interaction;
        
        DB.findOne({ GuildID: guildId, MessageID: message.id }, async (err, data) => {
            if (err) throw err;
            if (!data) return interaction.reply({ content: "⛔️ An error occur while running the command.", ephemeral: true });

            const Embed = message.embeds[0];
            if (!Embed) return;
            
            switch (CustomId) {
                case "suggest-accept" : {
                    Embed.fields[2].value = { name: "Status:", value: "Accepted", inline: true };
                    message.edit({ embed: [Embed.setColor("GREEN")] });
                    return interaction.reply({ content: "Suggest Accepted.", ephemeral: true });
                }
                case "suggest-decline" : {
                    Embed.fields[2].value = { name: "Status:", value: "Declined", inline: true };
                    message.edit({ embed: [Embed.setColor("RED")] });
                    return interaction.reply({ content: "Suggest Declined.", ephemeral: true });
                }
            }
        })
    }
}