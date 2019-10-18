const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");


module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send("You dont have permissions to use this command")
    if (!args) return message.reply("You must have something to vote for!")
      const pollTopic = await message.channel.send(args.join(" "));
      pollTopic.react(`✅`);
      pollTopic.react(`⛔`);
}
module.exports.config = {
    name: "poll",
    description: "says hello",
    usage: "+poll",
    accessableby: "Members",
    aliases: ["p", "po"]
}