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

/**
 * @author LuciferMorningstarDev
 * @since 1.0.0
 */

// Declares constants (destructured) to be used in this file.

const { Collection, ChannelType } = require('discord.js');

// Prefix regex, we will use to match in mention prefix.

const escapeRegex = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

module.exports = {
    name: 'messageCreate',

    async execute(message, client) {
        // Declares const to be used.

        const { guild, channel, content, author } = message;
        const { prefix, owner } = client.configs.general;

        // Checks if the bot is mentioned in the message all alone and triggers onMention trigger.
        // You can change the behavior as per your liking at ./messages/onMention.js
        // TODO: add translation
        if (message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) {
            require('../messages/onMention').execute(message);
            return;
        }

        /**
         * @description Converts prefix to lowercase.
         */

        const checkPrefix = prefix.toLowerCase();

        /**
         * @description Regex expression for mention prefix
         */

        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(checkPrefix)})\\s*`);

        // Checks if message content in lower case starts with bot's mention.

        if (!prefixRegex.test(content.toLowerCase())) return;

        /**
         * @description Checks and returned matched prefix, either mention or prefix in config.
         */

        const [matchedPrefix] = content.toLowerCase().match(prefixRegex);

        /**
         * @description The Message Content of the received message seperated by spaces (' ') in an array, this excludes prefix and command/alias itself.
         */

        const args = content.slice(matchedPrefix.length).trim().split(/ +/);

        /**
         * @description Name of the command received from first argument of the args array.
         */

        const commandName = args.shift().toLowerCase();

        // Check if mesage does not starts with prefix, or message author is bot. If yes, return.

        if (!message.content.startsWith(matchedPrefix) || message.author.bot) return;

        const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

        // It it's not a command, return :)

        if (!command) return;

        // Owner Only Property, add in your command properties if true.

        if (command.ownerOnly && message.author.id !== owner) {
            // TODO: add translation
            return message.reply({ content: 'This is a owner only command!' });
        }

        // Guild Only Property, add in your command properties if true.

        if (command.guildOnly && message.channel.type === ChannelType.DM) {
            // TODO: add translation
            return message.reply({
                content: "I can't execute that command inside DMs!"
            });
        }

        // Author perms property
        // Will skip the permission check if command channel is a DM. Use guildOnly for possible error prone commands!

        if (command.permissions && message.channel.type !== ChannelType.DM) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
                // TODO: add translation
                return message.reply({ content: 'You can not do this!' });
            }
        }

        // Args missing

        if (command.args && !args.length) {
            // TODO: add translation
            let reply = `You didn't provide any arguments, ${message.author}!`;

            if (command.usage) {
                reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }

            return message.channel.send({ content: reply });
        }

        // Cooldowns

        const { cooldowns } = client;

        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                // TODO: add translation and respond wait x seconds
                return;
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        // Rest your creativity is below.

        // execute the final command. Put everything above this.
        try {
            command.execute(message, args);
        } catch (error) {
            client.out.error(error);
        }
    }
};
