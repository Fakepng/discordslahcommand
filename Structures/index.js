const { Client, Collection } = require("discord.js");
const { Token } = require("./config.json")
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");
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

["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii);
});

client.login(Token)