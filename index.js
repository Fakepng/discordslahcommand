const { Client, Collection } = require("discord.js");
const { Token } = require("./config.json")
const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "DIRECT_MESSAGES"
    ], allowedMentions: {
        repliedUser: true
    }
});

client.commands = new Collection();

require("./Handlers/Events")(client);
require("./Handlers/Commands")(client);

client.login(Token)