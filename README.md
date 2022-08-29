<h1 align="center">mineflayer-repl</h1>
<p align="center"><i>A plugin that allows command input via the console.</i></p>

---

### Notes

This project was rushed to a quick release, and is in no way stable.

### Getting Started

This plugin is built using Node and can be installed using:
```bash
npm install --save mineflayer-repl
```

### Simple Bot

The brief description goes here.

```js

const mineflayer = require('mineflayer')
const { log, replPlugin } = require('./replPlugin.js');

const bot = mineflayer.createBot({ })
replPlugin(bot);

bot.repl.on('enter', function(command) {
    if(command.length === 0) return;
    if(command === 'quit') return bot.quit();
});


```

### Documentation

[API](https://github.com/Pix3lPirat3/mineflayer-repl/blob/master/docs/api.md)

[Examples](https://github.com/Pix3lPirat3/mineflayer-repl/tree/master/examples)

### License

This project uses the [MIT](https://github.com/Pix3lPirat3/mineflayer-repl/blob/master/LICENSE) license.

### Contributions

This project is accepting PRs and Issues. See something you think can be improved? Go for it! Any and all help is highly appreciated!

For larger changes, it is recommended to discuss these changes in the issues tab before writing any code. It's also preferred to make many smaller PRs than one large one, where applicable.
