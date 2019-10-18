const Discord = require("discord.js")


module.exports.run = async (bot, message, args) => {

    message.channel.send("Pinging...").then(m => {
        let ping = m.createdTimestamp - message.createdTimestamp
        let choices = ["Wow is this my ping", "Hope its not that bad", "Do you like it?"]
        let response = choices[Math.floor(Math.random() * choices.length)]

        m.edit(`${response}: Bot Latency: \`${ping}\`, API Latency: \`${Math.round(bot.ping)}\``)
    })

}


module.exports.config = {
    name: "ping",
    description: "PONG! Displays the api & bot latency",
    usage: "!ping",
    accessableby: "Members",
    aliases: ["latency", "pi"]
}