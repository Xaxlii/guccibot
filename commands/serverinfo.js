const Discord =require("discord.js")
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");

module.exports.run = async (bot,  message, args) => {
console.log("run")
    let sEmbed = new Discord.RichEmbed()
    .setColor("#008000")
    .setTitle("Server Info")
    .setThumbnail(message.guild.iconURL)
    .setAuthor(`${message.guild.name} info`, message.guild.iconURL)
    .addField("**Server Name:**", `${message.guild.name}`, true)
    .addField("**Server Owner:**", `${message.guild.owner}`, true)
    .addField("**Member Count:**", `${message.guild.memberCount}`, true)
    .addField("**Role Count:**", `${message.guild.roles.size}`, true)
    .setFooter(`Gaazebot`, bot.user.displayAvatarURL);
    message.channel.send(sEmbed);
console.log("run")
}

module.exports.config = {
    name: "serverinfo",
    aliases: ["si", "serverdesc"]
}