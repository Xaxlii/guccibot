const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");


module.exports.run = async (bot, message, args) => {
    
    if(!message.member.hasPermission(["BAN_MEMBERS", "MANAGE_ROLES"])) return message.channel.send("You don't have permissions to ban a member")

    let banMember = message.mentions.members.first() || message.guild.members.get(args[0])
    let RichEmbed = new Discord.RichEmbed()
    .setColor(colours.red)
    .addField("Please selcect a user to be banned", "Else i can't ban anyone")
    if (!banMember) return message.channel.send(RichEmbed).then(m => m.delete(5000))

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason given!"

    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I don't have permissions to ban people")

    message.delete()
    banMember.send(`Hello, you have been banned from ${message.guild.name} for: ${reason}`).then(() => 
    message.guild.ban(banMember, {days: 1, reason: reason})).catch(err => console.log(err))
    
    message.channel.send(`**${banMember.user.tag}** has been banned`).then(m => m.delete(5000))

}

module.exports.config = {
    name: "ban",
    description: "bans a user from the server",
    usage: ".ban",
    accessableby: "Admins",
    aliases: ["b", "banish", "remove"]
}