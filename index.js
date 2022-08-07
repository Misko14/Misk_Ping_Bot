const { Client, Intents } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Settings
// -----------------------------------
var PingRoleID = "1000150853367373845"
var PingChannelPrefix = "pings"
var PingInterval = 2000 // Milliseconds (1 Second = 1000 Milliseconds)
// -----------------------------------

client.once("ready", () => {
  setInterval(function() {
    client.channels.cache.forEach(
      function(channel) {
        if (channel.name.startsWith(PingChannelPrefix)) {
          channel.send("<@&" + PingRoleID + ">")
        }
      })
  }, PingInterval);
  console.log("Misk Ping Bot enabled!");
});

client.login(process.env["Bot_Token"])
