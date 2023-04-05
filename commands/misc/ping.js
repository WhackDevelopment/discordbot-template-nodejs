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

module.exports = {
    name: 'ping',
    category: __dirname,
    description: async function (prefix, name) {
        return prefix + name;
    },
    async execute(message, args) {
        const { client, guild, channel, content, author } = message;
        const { prefix, owner } = client.configs.general;

        return new Promise(async (resolve, reject) => {
            try {
                message.reply({ content: 'Pong.' });
                resolve(true);
            } catch (error) {
                client.out.error('&fError in &6' + __dirname + '&f/&9' + this.name + ' &fCommand &c', error);
                reject(error);
            }
        });
    }
};
