const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const translate = require("@vitalets/google-translate-api");


module.exports.run = async (bot, message, args) => {
    let translating = args.slice(0).join(" ");
    translate(`${translating}`, {to: `${args[0]}`}).then(res => {
        message.channel.send(res.text)
    }).catch(err => {
        console.error(err)
    });
}
module.exports.config = {
    name: "translate",
    description: "says hello",
    usage: "+translate",
    accessableby: "Members",
    aliases: ["t", "tl"]
}