

const keepAlive = require(`./server`)
const { Client, Collection } = require("discord.js")
const client = new Client({ intents: 32767 })




const botConfig = require('./config.json');


const { promisify } = require("util")
const Ascii = require("ascii-table");
const { glob } = require("glob");
const PG = promisify(glob);



client.commands = new Collection();
client.buttons = new Collection();


require("./handlers/Events")(client);
require("./handlers/Commands")(client);
require("./handlers/Buttons")(client, PG);
const token = process.env.token;

require("replit-dis-uniter")(client);

client.login(`${token}`)




keepAlive();