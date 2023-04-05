<h1 align="center">NodeJS Discord Bot Template 👋</h1>

<div align="center">
    <a target="_blank" href="https://whackdevelopment.com/">
        <img target="_blank" style="border-radius:50%;" width="200" height="200" src="https://avatars.githubusercontent.com/u/110769913"/>
    </a>
</div>
<div align="center">
      <img alt="Version" src="https://img.shields.io/badge/version-v1.0.0--SNAPSHOT-blue.svg?cacheSeconds=2592000" />
    <a target="_blank" href="https://discord.gg/WhackDevelopment">
        <img src="https://img.shields.io/discord/1075538521340776489?style=for-the-badge&logo=discord">
    </a>
    <a target="_blank" href="https://paypal.me/WhackDevelopment">
        <img src="https://img.shields.io/badge/Donate-PayPal-blue?style=for-the-badge&logo=paypal" alt="PayPal">
    </a>
    <a target="_blank" href="https://github.com/WhackDevelopment/discordbot-template-nodejs/issues">
        <img src="https://img.shields.io/github/issues/WhackDevelopment/discordbot-template-nodejs.svg?style=for-the-badge&logo=github">
    </a>
    <br>
</div>
---

> An **open source** `discord.js` bot template which is based on official [discord.js guide](https://discordjs.guide/) to get started on making your very personal discord bot!

This template comes in with many in-built useful and flexible features, such as

#### • **Dynamic Command Handler:**

-   My template comes in with a dynamic command handler! Using the command handler, you don't need to indulge in main bot files to create your very own command!
-   You can simply make command groups (categorized as folders) in the [commands](https://github.com/WhackDevelopment/discordbot-template-nodejs/tree/master/commands/) folder.
-   Your JavaScript commands goes inside respective category folders. A sample command is provided as [ping](https://github.com/WhackDevelopment/discordbot-template-nodejs/blob/master/commands/misc/ping.js) command. You can use the same skeleton for all commands you want!

#### • **Dynamic Event Handler:**

-   All events goes inside the [events](https://github.com/WhackDevelopment/discordbot-template-nodejs/blob/master/events/) folder. You don't need to use `client.on()` in the main `bot.js` file to handle events.
-   Using simple skeleton code for events, you can make any amount of events in the events folder using the event handler.

#### • **Dynamic Trigger Handler:**

-   Triggers occur when a specific "phrase" is said in a message content. For example, if you want your bot to react with :heart: when someone say `welcome` in their message, you can do that with this trigger handler!
-   Trigger Handler also has the same skeleton structure as of command handler. The trigger handler is associated with the [triggers](https://github.com/WhackDevelopment/discordbot-template-nodejs/tree/master/triggers/) folder. There are trigger categories, like [reactions](https://github.com/WhackDevelopment/discordbot-template-nodejs/tree/master/triggers/reactions) folder, in the trigger folder.
-   A sample trigger command is given in the [`hello.js`](https://github.com/WhackDevelopment/discordbot-template-nodejs/tree/master/triggers/reactions/hello.js) trigger file.

#### • **Dynamic Slash Command Handler:**

-   My template comes with a dynamic slash command handler with very easy to customize and make slash commands.
-   The commands, in the slashCommands folder, receive an [`CommandInteraction`](https://discord.js.org/#/docs/main/stable/class/CommandInteraction) object. You can see the [documentation of discord.js](https://discord.js.org/#/docs/main/stable/class/CommandInteraction) for all the properties and methods available.
-   **IMPORTANT:** In the template, we are sending the slash commands to discord to be registered only to 1 guild. That is because their are 2 types of slash commands, guild and global. Guild commands are restricted to 1 guild but whenever you update them, they take effect immediately, whereas global commands take upto 1 hour to take effect. So use guild commands in development and global commands for production.

#### • **Dynamic Buttons Interaction Handler:**

-   This template comes with a dynamic button interaction handler to receive and process button interactions.
-   Buttons can be classified in two category folders.

#### • **Dynamic Modals Interaction Handler:**

-   Easily handle incoming modal submittions using the template handler!
-   Modals can be categorized in different folders.

#### • **Dynamic Context Menu Handler:**

-   All new addition to discord API is context menus! You can right click a user or message -> Apps to find these options!
-   This template will register all your context menu options and dynamically interact with them! Worth a try.

#### • **[NEW] Dynamic Autocomplete Interaction Request Handler:**

-   Easily handle incoming autocomplete requests using the template handler!
-   Perfectly dynamic for all your needs!

#### • **Highly Customizable:**

Using the template is so easy and fun, you would know. As the template does not rely on any external dependencies and written in javascript, it is highly customizable to any extend. There's no end to your creativity!

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/WhackDevelopment/discordbot-template-nodejs/issues). You can also take a look at the [contributing guide](https://github.com/WhackDevelopment/.github/blob/master/CONTRIBUTING.md).
