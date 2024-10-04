const { Client, Collection, Partials, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.User,
    Partials.ThreadMember
  ],
  shards: "auto",
  allowedMentions: { repliedUser: true },
});

client.commands = new Collection();

require("dotenv").config();

const { ActivityType, EmbedBuilder, Events } = require("discord.js");
const moment = require('moment-timezone');
client.once(Events.ClientReady, async (client) => {
  client.user.setPresence({
    activities: [{
      name: `hacer la tarea`,
      type: ActivityType.Listening
    }],
    status: 'online',
  });

});

const Errores = require("./inicializacion_eventos/errores.js");
const Eventos = require("./inicializacion_eventos/eventos.js");
const Slash = require("./inicializacion_eventos/slashCommands.js");
const Mongo = require("./inicializacion_eventos/mongo.js");
const KeepAlive = require("./inicializacion_eventos/server.js")

async function main() {
  await client.login(process.env.BOT_TOKEN).then(console.log(`Se ha iniciado sesión correctamente`));
  //await Errores();
  await Mongo();
  await Slash(client);
  await Eventos(client);
  await KeepAlive();
}

main();
