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
module.exports = () => {};

// This function takes an object as input and returns a copy of that object
module.exports.copyObject = (mainObject) => {
    let objectCopy = {};
    let key;
    for (key in mainObject) {
        objectCopy[key] = mainObject[key];
    }
    return objectCopy;
};

// This function checks if the input is an array
module.exports.isArray = (toCheckVar) => toCheckVar !== null && Array.isArray(toCheckVar);

/**
 * Check if a given string is an URL
 * @param {String} str - The input string to check
 */
module.exports.isUrl = (str) => {
    try {
        let url = new URL(str);
    } catch (err) {
        return false;
    }
    return true;
};

// This function generates a random color as a hex string
// It takes an optional brightness parameter to ensure minimum brightness
module.exports.randomColor = (brightness = 0) => {
    function randomChannel(brightness) {
        var r = 255 - brightness;
        var n = 0 | (Math.random() * r + brightness);
        var s = n.toString(16);
        return s.length == 1 ? '0' + s : s;
    }
    return '#' + randomChannel(brightness) + randomChannel(brightness) + randomChannel(brightness);
};

// This function formats a number as a US dollar currency string
module.exports.niceNumber = (number = 0) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
};

/**
 * Pads a number with leading zeros if it has less digits than a specified number of digits.
 * @param {number} n - The number to pad.
 * @param {number} z - The number of digits to pad with leading zeros. Defaults to 2.
 * @returns {string} - The padded number as a string.
 */
function timePad(n, z = 2) {
    const digits = n.toString().length;
    if (digits >= z) {
        return n.toString();
    }
    const zeros = '0'.repeat(z - digits);
    return zeros + n.toString();
}

// This function takes an input number of milliseconds and returns a human-readable time string
module.exports.msToTimeString = (milliseconds) => {
    let seconds = Math.floor(milliseconds / 1000),
        minutes = Math.floor(seconds / 60),
        hours = Math.floor(minutes / 60),
        days = Math.floor(hours / 24),
        months = Math.floor(days / 30),
        years = Math.floor(days / 365);
    seconds %= 60;
    minutes %= 60;
    hours %= 24;
    days %= 30;
    months %= 12;

    if (years > 0) return [timePad(years) + ' year(s)', timePad(months) + ' month(s)', timePad(days) + ' day(s)'];
    if (months > 0) return [timePad(months) + ' month(s)', timePad(days) + ' day(s)', timePad(hours) + ' hour(s)'];
    if (days > 0) return [timePad(days) + ' day(s)', timePad(hours) + ' hour(s)', timePad(minutes) + ' minute(s)'];
    if (hours > 0) return [timePad(hours) + ' hour(s)', timePad(minutes) + ' minute(s)', timePad(seconds) + ' second(s)'];
    if (minutes > 0) return [timePad(minutes) + ' minute(s)', timePad(seconds) + ' second(s)'];
    if (seconds > 0) return [timePad(seconds) + ' second(s)'];
};

// This function takes an input number of milliseconds and returns the number of days
module.exports.msToDays = (milliseconds) => {
    return milliseconds / 1000 / 60 / 60 / 24;
};

// This function generates a random integer within a specified range
module.exports.randomMinMax = (min, max) => {
    if (min >= max) throw new Error('Max must be greater then min.');
    return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Converts a hexadecimal string to a decimal number.
 * @param {string} hex - The hexadecimal string to convert.
 * @returns {number} - The decimal representation of the hexadecimal string.
 */
module.exports.hexToDecimal = (hex) => parseInt(hex, 16);

/**
 * Runs a given function at a random interval between a minimum and maximum delay.
 * @param {number} minDelay - The minimum delay (in milliseconds) between function calls.
 * @param {number} maxDelay - The maximum delay (in milliseconds) between function calls.
 * @param {function} intervalFunction - The function to be run at each interval.
 * @returns {function} - The interval function that can be used to stop the interval.
 */
module.exports.randomInterval = async (minDelay, maxDelay, intervalFunction) => {
    // Helper function to generate a random number between two given values
    var getRandomNumberBetween = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    // Function to run the interval function and create a new random interval
    var runFunction = () => {
        intervalFunction();
        createRandomInterval();
    };

    // Function to create a new random interval using setTimeout
    var createRandomInterval = () => {
        setTimeout(runFunction, getRandomNumberBetween(minDelay, maxDelay));
    };

    // Start the interval by creating the first random interval
    return createRandomInterval();
};
