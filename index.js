const { Client, Intents } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once("ready", () => {
  console.log("Misk Ping Bot enabled!");
});

// To start pinging, say the Start Ping Command in any channel.
// To stop pinging, say the Stop Ping Command in any channel.
// Only Administrators can start pings. Will not work if the bot is already pinging.

var Pinging = false
var PingRoleID = "992675099629072387"
var StartPingCommand = "!StartPings"
var StopPingCommand = "!StopPings"
var PingInterval = 100 // Milliseconds

function StartPing(Channel, Message) {
  if (Channel.name.startsWith("pings")) {
    Pinging = true
    PingInterval = setInterval(function() {
      Channel.send("<@&" + PingRoleID + ">")
    }, PingInterval);
  }
}

function StopPing() {
  Pinging = false
  if (PingInterval) {
    clearInterval(PingInterval)
  }
}

function IsAdministrator(Message) {
  if (Message.member.permissionsIn(Message.channel).has("ADMINISTRATOR")) {
    return true
  }
}

// Start Ping
client.on("messageCreate", (message) => {
  if (message.content === StartPingCommand && IsAdministrator(message) &&
    Pinging === false) {
    message.channel.send("Started pinging!")
    message.guild.channels.cache.forEach(channel =>
      StartPing(channel, message))
  }
      if (message.content === StopPingCommand && IsAdministrator(message) &&
    Pinging === true) {
    message.channel.send("Stopped pinging!")
      StopPing()
  }
})

client.login(process.env["Bot_Token"])
