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
    name: 'messageCreate',

    async execute(message, client) {
        /**
         * @description The Message Content of the received message seperated by spaces (' ') in an array, this excludes prefix and command/alias itself.
         */

        const args = message.content.split(/ +/);

        // Checks if the trigger author is a bot. Comment this line if you want to reply to bots as well.

        if (message.author.bot) return;

        // Checking ALL triggers using every function and breaking out if a trigger was found.

        /**
         * Checks if the message has a trigger.
         * */

        let triggered = false;

        message.client.triggers.every((trigger) => {
            if (triggered) return false;

            trigger.name.every(async (name) => {
                if (triggered) return false;

                // If validated, it will try to execute the trigger.

                if (message.content.includes(name)) {
                    try {
                        trigger.execute(message, args);
                    } catch (error) {
                        client.out.error(error);
                    }

                    // Set the trigger to be true & return.

                    triggered = true;
                    return false;
                }
            });
        });
    }
};
