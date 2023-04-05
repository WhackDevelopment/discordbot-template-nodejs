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

const similarity = require('string-similarity');
const Discord = require('discord.js');
const { EmbedBuilder, ActivityType, PermissionsBitField } = Discord;
const isDomain = require('is-valid-domain');
const { Routes } = require('discord-api-types/v10');

module.exports = () => {};

// TODO adding more discord specific tools

// set a new client status ( let the bot pick a random string of an array )
module.exports.setStatus = async (client, activities_list) => {
    var index = Math.floor(Math.random() * activities_list.length);
    if (index < 0) index = 0;
    if (index >= activities_list.length) index = activities_list.length - 1;
    var txt = activities_list[index][0];
    var amount = 0;
    var type;
    switch (activities_list[index][1]) {
        case 'WATCHING':
            type = ActivityType.Watching;
            break;
        case 'COMPETING':
            type = ActivityType.Competing;
            break;
        case 'LISTENING':
            type = ActivityType.Listening;
            break;
        case 'STREAMING':
            type = ActivityType.Streaming;
            break;
        default:
            type = ActivityType.Playing;
            break;
    }
    if (activities_list[index][1] != 'STREAMING') {
        client.user.setActivity(txt, {
            type: type
        });
    } else {
        client.user.setActivity(txt, {
            type: type,
            url: activities_list[index][2] || 'https://twitch.tv/lucifermorningstar_6660'
        });
    }
};

// set a new client Status
module.exports.setClientStatus = async (client, status, type) => {
    var type;
    switch (type) {
        case 'WATCHING':
            type = ActivityType.Watching;
            break;
        case 'COMPETING':
            type = ActivityType.Competing;
            break;
        case 'LISTENING':
            type = ActivityType.Listening;
            break;
        case 'STREAMING':
            type = ActivityType.Streaming;
            break;
        default:
            type = ActivityType.Playing;
            break;
    }
    client.user.setActivity(status || 'Empty Status Set', {
        type: type || ActivityType.Playing
    });
};

module.exports.updateStatus = async (client) => {
    client.tools.discord.setStatus(client, client.configs.status);
};
