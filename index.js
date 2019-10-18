const botconfig = require("./botconfig.json")
const Discord = require("discord.js");
const colours = require("./colours.json");
const functions = require("./functions")

const bot = new Discord.Client({disableEveryone: true});


const invites = {};

const wait = require('util').promisify(setTimeout);

bot.on('ready', () => {
    bot.user.setActivity(`${bot.users.size} users || +help for help`, {type: "WATCHING"});
    console.log("Im online")
  wait(1000);

  bot.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});


bot.on('guildMemberAdd', member => {
    member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = bot.users.get(invite.inviter.id);
    const logChannel = member.guild.channels.find(channel => channel.name === "【👋】welcome-bye"); 
    logChannel.send(`**${member.user.tag}** joined, using the invite link **${invite.code}** from **${inviter.tag}**. The invite code has been used ${invite.uses} since created`);
        
    const role = member.guild.roles.find("name", "Community")
    member.addRole (role)

    if(!role) return

    });

});


bot.on("message", async message => {
    if (message.guild && message.content.startsWith('+dmall')) {//this command starts if the person says "+dmall", ofc you can change this to whatever you'd like.
 
    let embed = new Discord.RichEmbed()
        .setColor("#ff0000")
        .setTitle(`❌${message.author.username}, error!❌`)
        .setDescription(`Invaild permissions.\n permissions needed: "MANAGE_ROLES", "ADMINISTRATOR"`)
        .setTimestamp()
     
        if (!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send(embed)//this then says you don't have permissions to do this. if they do have these permissions it will work.
     
        let text = message.content.slice('$dmall'.length); // cuts off the +dmall part and create the text var.
        message.guild.members.forEach(member => {
          if (member.id != bot.user.id && !member.user.bot) member.send(text);//gets every member in the server.
        });
    }
})


bot.on("guildMemberRemove", member => {
    const channel = member.guild.channels.find(channel => channel.name === "【👋】welcome-bye");
    if(!channel) return
    channel.send(`**${member.displayName}** left`)
})

const fs =require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();


fs.readdir("./commands/", (err, files) =>{

    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.lenght <= 0) {
        return console.log("[LOGS] Couldn't Find Commands!");
    }
    
    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        });
    })
});


bot.on("message", async message =>{
    if(message.author.bot || message.channel.type === "dm") return;
    if (!message.content.startsWith(botconfig.prefix)) return;
    let prefix = botconfig.prefix;
    let args = message.content.slice(prefix.length).split(/ +/g);
    let cmd = args.shift().toLowerCase();

    
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
    if(commandfile) commandfile.run(bot,message,args)
    
    if(cmd === `${prefix}hello`){
        return message.channel.send("hello")
    }
    console.log(bot.commands);
})


bot.login(botconfig.token);