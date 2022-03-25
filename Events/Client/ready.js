const { Client } = require("discord.js");
const mongoose = require("mongoose");
const { Database } = require("../../Structures/config.json")

module.exports = {
    name: "ready",
    once: true,

    /**
    * @param {Client} client
    */
    execute(client) {
        console.log(`${client.user.username} ready! 😀`);
        client.user.setActivity("VSCode", { type: "PLAYING" });

        if (!Database) return;
        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log(`${client.user.username} is connected to Database 💽`);
        }).catch((err) => {
            console.log(err)
        });
    }
}