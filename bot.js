/**
 * Copyright (c) 2023 - present | LuciferMorningstarDev <contact@lucifer-morningstar.xyz>
 * Copyright (c) 2023 - present | whackdevelopment.com <contact@whackdevelopment.com>
 * Copyright (c) 2023 - present | whackdevelopment.com team and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

'use strict'; // https://www.w3schools.com/js/js_strict.asp

/**********************************************************************/
// append environment variables
require('dotenv').config();

/**********************************************************************/
// create logger
const { Logger } = require('./modules/Logger');
const logger = new Logger('BOT');
logger.setDebugging(0 + process.env.DEBUG_MODE);
logger.debug('Loading DiscordBot Template');

/**********************************************************************/
// require node-fetch module for general requests
global.fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const fs = require('node:fs');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

const mongoose = require('mongoose');

/**********************************************************************/

const client = new Client({
    // Please remove all intents and partials you don't need
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
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
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution
    ],
    partials: [
        Partials.User,
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.GuildScheduledEvent,
        Partials.ThreadMember
    ]
});

client.out = logger;

/**********************************************************************/
// commands
client.commands = new Collection();
client.commandCategories = new Collection();
client.triggers = new Collection();

// interactions
client.slashCommands = new Collection();
client.buttonCommands = new Collection();
client.selectCommands = new Collection();
client.contextCommands = new Collection();
client.modalCommands = new Collection();
client.autocompleteInteractions = new Collection();

// cooldowns
client.cooldowns = new Collection();

/**********************************************************************/
client.configs = {};
const configFiles = fs.readdirSync('./configurations');
for (const configFile of configFiles) {
    let config = require(`./configurations/${configFile}`);
    if (typeof config === 'function') config = config(client);
    client.configs[configFile.split('.')[0]] = config;
    client.out.debug(`&7[&aLOADED CONFIG&7] &8» &9configurations.${configFile}.`);
}

/**********************************************************************/
client.tools = require('./tools');

/**********************************************************************/
// one time require mongoose models
const modelFolders = fs.readdirSync('./models');
// Loop through all folders in the models directory.
for (const folder of modelFolders) {
    // skip sample folders
    if (folder === 'sample') continue;
    // Read all the .js files in the folder that don't start with an underscore.
    const modelFiles = fs.readdirSync(`./models/${folder}`).filter((file) => file.endsWith('.js') && !file.startsWith('_'));

    // Loop through all the files in the folder and require them to load the Mongoose models.
    for (const file of modelFiles) {
        require(`./models/${folder}/${file}`);
        // Log a message indicating that the model has been loaded.
        client.out.debug(`&7[&aLOADED MODEL&7] &8» &9models.${folder}.${file}.`);
    }
}

/**********************************************************************/
client.translations = {};

// Read all the directories within the "translations" folder and store them in the "languageFolders" array.
const languageFolders = fs.readdirSync('./translations');
for (const folder of languageFolders) {
    // skip sample folders
    if (folder === 'sample') continue;
    // Load the contents of the file into the "language" variable.
    let language = require(`./translations/${folder}`);
    // If the loaded language is a function, execute it with the client object as an argument and store the result in the "language" variable.
    if (typeof language === 'function') language = language(client);
    // Add the language object to the "translations" collection with the folder name as the key.
    client.translations[folder] = language;
    // Log a message to indicate that the language has been loaded.
    client.out.debug(`&7[&aLOADED LANGUAGE&7] &8» &9translations.${folder}.`);
}

/**********************************************************************/
// This code loads all the command files for the Discord bot.
// Read all the directories within the "commands" folder and store them in the "commandFolders" array.
const commandFolders = fs.readdirSync('./commands');
// Iterate through each folder in the "commandFolders" array.
for (const folder of commandFolders) {
    // skip sample folders
    if (folder === 'sample') continue;
    // Read all the files within the current folder that end with ".js" and don't start with an underscore.
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js') && !file.startsWith('_'));
    // Iterate through each command file and load its contents into the "command" variable.
    for (const file of commandFiles) {
        // Check if the file is the "index.js" file for the current folder.
        // If so, load its contents into the "category" variable and add it to the "commandCategories" map.
        if (file === 'index.js') {
            let category = require(`./commands/${folder}/${file}`);
            client.commandCategories.set(folder, category);
            client.out.debug(`&7[&aLOADED COMMAND CATEGORY&7] &8» &9commands.${folder}.`);
        } else {
            // Otherwise, load the contents of the file into the "command" variable and add it to the "commands" map.
            let command = require(`./commands/${folder}/${file}`);
            client.commands.set(command.name, command);
            client.out.debug(`&7[&aLOADED COMMAND&7] &8» &9commands.${folder}.${file}.`);
        }
    }
}

/**********************************************************************/
// This code loads all the event files for the Discord bot.
// Read all the files within the "events" folder that end with ".js" and store them in the "eventFiles" array.
const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));
// Iterate through each file in the "eventFiles" array and execute its corresponding event when it is emitted.
for (const file of eventFiles) {
    // Load the contents of the file into the "event" variable.
    const event = require(`./events/${file}`);
    // Check if the event should only be executed once. If so, use the client's "once" method to execute the event.
    // Otherwise, use the client's "on" method to execute the event whenever it is emitted.
    if (event.once) {
        client.once(event.name, async (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, async (...args) => await event.execute(...args, client));
    }
    // Log a message to indicate that the event has been loaded.
    client.out.debug(`&7[&aLOADED EVENT&7] &8» &9events.${file}.`);
}

/**********************************************************************/

/**********************************************************************/
// This code is used to load all the slash commands for the Discord bot.
// Read all the directories within the "slash" folder and store them in the "slashCommands" array.
const slashCommands = fs.readdirSync('./interactions/slash');
// Iterate through each interaction module in the "slashCommands" array.
for (const interactionModule of slashCommands) {
    // skip sample folders
    if (interactionModule === 'sample') continue;
    // Read all the files within each interaction module's directory that end with ".js" and don't start with an underscore.
    const commandFiles = fs
        .readdirSync(`./interactions/slash/${interactionModule}`)
        .filter((file) => file.endsWith('.js') && !file.startsWith('_'));
    // Iterate through each command file and load its contents into the "command" variable.
    for (const commandFile of commandFiles) {
        const command = require(`./interactions/slash/${interactionModule}/${commandFile}`);
        // Add the command to the "slashCommands" collection using its name as the key.
        client.slashCommands.set(command.data.name, command);
    }
}

/**********************************************************************/
// This code reads all of the autocomplete command files in the ./interactions/autocomplete directory
const autocompleteInteractions = fs.readdirSync('./interactions/autocomplete');
for (const interactionModule of autocompleteInteractions) {
    // skip sample folders
    if (interactionModule === 'sample') continue;
    // Filters for JavaScript files that don't start with an underscore and end with '.js'
    const files = fs
        .readdirSync(`./interactions/autocomplete/${interactionModule}`)
        .filter((file) => file.endsWith('.js') && !file.startsWith('_'));
    // Loops over the filtered files
    for (const interactionFile of files) {
        // Requires each autocomplete command file and adds it to the client's autocompleteInteractions collection
        const interaction = require(`./interactions/autocomplete/${interactionModule}/${interactionFile}`);
        client.autocompleteInteractions.set(interaction.name, interaction);
    }
}

/**********************************************************************/
// This code reads all of the context menu command files in the ./interactions/context-menus directory
const contextMenus = fs.readdirSync('./interactions/context-menus');
for (const folder of contextMenus) {
    // skip sample folders
    if (folder === 'sample') continue;
    // Filters for JavaScript files that don't start with an underscore and end with '.js'
    const files = fs.readdirSync(`./interactions/context-menus/${folder}`).filter((file) => file.endsWith('.js') && !file.startsWith('_'));
    // Loops over the filtered files
    for (const file of files) {
        // Requires each context menu command file and adds it to the client's contextCommands collection
        const menu = require(`./interactions/context-menus/${folder}/${file}`);
        // Creates a key name for the command by combining the folder name and the command name
        const keyName = `${folder.toUpperCase()} ${menu.data.name}`;
        client.contextCommands.set(keyName, menu);
    }
}

/**********************************************************************/
// This code reads all of the button command files in the ./interactions/buttons directory
const buttonCommands = fs.readdirSync('./interactions/buttons');
for (const interactionModule of buttonCommands) {
    // skip sample folders
    if (interactionModule === 'sample') continue;
    // Filters for JavaScript files that don't start with an underscore
    const commandFiles = fs
        .readdirSync(`./interactions/buttons/${interactionModule}`)
        .filter((file) => file.endsWith('.js') && !file.startsWith('_'));
    // Loops over the filtered files
    for (const commandFile of commandFiles) {
        // Requires each button command file and adds it to the client's buttonCommands collection
        const command = require(`./interactions/buttons/${interactionModule}/${commandFile}`);
        client.buttonCommands.set(command.id, command);
    }
}

/**********************************************************************/
// This code reads all of the modal command files in the ./interactions/modals directory
const modalCommands = fs.readdirSync('./interactions/modals');
for (const interactionModule of modalCommands) {
    // skip sample folders
    if (interactionModule === 'sample') continue;
    // Filters for JavaScript files that don't start with an underscore
    const commandFiles = fs
        .readdirSync(`./interactions/modals/${interactionModule}`)
        .filter((file) => file.endsWith('.js') && !file.startsWith('_'));
    // Loops over the filtered files
    for (const commandFile of commandFiles) {
        // Requires each modal command file and adds it to the client's modalCommands collection
        const command = require(`./interactions/modals/${interactionModule}/${commandFile}`);
        client.modalCommands.set(command.id, command);
    }
}

/**********************************************************************/
// This code reads all of the select menu files in the ./interactions/select-menus directory
const selectMenus = fs.readdirSync('./interactions/select-menus');
for (const interactionModule of selectMenus) {
    // Filters for JavaScript files that don't start with an underscore
    const commandFiles = fs
        .readdirSync(`./interactions/select-menus/${interactionModule}`)
        .filter((file) => file.endsWith('.js') && !file.startsWith('_'));
    // Loops over the filtered files
    for (const commandFile of commandFiles) {
        // Requires each select menu file and adds it to the client's selectCommands collection
        const command = require(`./interactions/select-menus/${interactionModule}/${commandFile}`);
        client.selectCommands.set(command.id, command);
    }
}

/**********************************************************************/
// This code reads all of the trigger files in the ./triggers directory
const triggerFolders = fs.readdirSync('./triggers');
for (const folder of triggerFolders) {
    // skip sample folders
    if (folder === 'sample') continue;
    // Filters for JavaScript files that don't start with an underscore
    const triggerFiles = fs.readdirSync(`./triggers/${folder}`).filter((file) => file.endsWith('.js') && !file.startsWith('_'));
    // Loops over the filtered files
    for (const file of triggerFiles) {
        // Requires each trigger file and adds it to the client's triggers collection
        const trigger = require(`./triggers/${folder}/${file}`);
        client.triggers.set(trigger.name, trigger);
        // Debug message for logging purposes
        client.out.debug(`&7[&aLOADED TRIGGER&7] &8» &9triggers.${folder}.${file}.`);
    }
}

/**********************************************************************/
// Output a debug message indicating that the bot is starting up.
client.out.debug(client.translations[client.configs.general.defaultLanguage].logging.bot_starting);

// Create a new REST object and set the token to the bot's token.
const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

// Combine the JSON data for all the slash and context commands into a single array.
const commandJsonData = [
    ...Array.from(client.slashCommands.values()).map((c) => c.data.toJSON()),
    ...Array.from(client.contextCommands.values()).map((c) => c.data)
];

(async () => {
    try {
        client.out.debug(client.translations[client.configs.general.defaultLanguage].logging.start_refresh_application_commands);

        // If the environment is in development mode, update the guild-specific commands for the testGuildId
        if (process.env.MODE === 'development') {
            await rest.put(Routes.applicationGuildCommands(client.configs.general.clientId, client.configs.general.testGuildId), {
                body: commandJsonData
            });
        } else {
            // Otherwise, update the global application commands
            await rest.put(Routes.applicationCommands(client.configs.general.clientId), { body: commandJsonData });
        }

        client.out.debug(client.translations[client.configs.general.defaultLanguage].logging.success_refresh_application_commands);
    } catch (error) {
        client.out.error(error);
    }
})();

// finally login the client
client.login(process.env.BOT_TOKEN);
