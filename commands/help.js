const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");


module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
    .setColor("#008000")
    .addField("+ban", "Bans the givin user. Aliases `b`, `remove` and `banish`")
    .addField("+fortnitestats", "Shows the stats of the givin player. Aliases `fs`")
    .addField("+mute", "Mutes the givin user for x amount of time. Aliases `m` and `mu`")
    .addField("+poll", "Makes a poll with the givin question. Aliases `p` and `po`")
    .addField("+serverinfo", "Shows info of the server. Aliases `si` and `serverdesc`")
    .addField("+userinfo", "Shows the info of the user givin or yourself. Aliases `ui` and `us`")
    message.channel.send(embed)
}
module.exports.config = {
    name: "help",
    description: "says hello",
    usage: "+help",
    accessableby: "Members",
    aliases: ["h"]
}