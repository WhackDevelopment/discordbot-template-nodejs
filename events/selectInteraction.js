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
    name: 'interactionCreate',

    async execute(interaction, client) {
        // Checks if the interaction is a select menu interaction (to prevent weird bugs)

        if (!interaction.isAnySelectMenu()) return;

        const command = client.selectCommands.get(interaction.customId);

        // If the interaction is not a command in cache, return error message.
        // You can modify the error message at ./messages/defaultSelectError.js file!

        if (!command) {
            return;
        }

        // A try to execute the interaction.

        try {
            await command.execute(interaction, client);
            return;
        } catch (err) {
            client.out.error(err);
            return;
        }
    }
};
