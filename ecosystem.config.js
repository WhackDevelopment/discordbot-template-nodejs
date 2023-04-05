'use strict'; // https://www.w3schools.com/js/js_strict.asp

module.exports = {
    apps: [
        {
            name: 'NodeJS-Discordbot-Template',
            script: 'bot.js',
            instances: 1,
            exec_mode: 'fork',
            watch: true,
            autorestart: true,
            ignore_watch: ['./node_modules/*', './.ignored/*', './.ignore_watch/*']
        }
    ]
};
