var EventEmitter = require('events');

module.exports = {
  stdout: null,
  current: "",
  prompt: '» ',
  replPlugin: function(bot, options) {

    if (!bot.repl) bot.repl = new EventEmitter();

    let defaults = {
      prompt: '» ',
      encoding: 'utf8',
      allowEmpty: true // If the input field is empty, don't allow submission
    };

    options = Object.assign({}, defaults, options);

    // Solve "Overlapping on console input" -> https://stackoverflow.com/a/66296592

    let stdin = process.stdin;
    let stdout = process.stdout;
    this.prompt = options.prompt;
    this.current = "";

    let override = this;

    stdin.setRawMode(true);
    stdin.setEncoding(options.encoding);
    stdout.write(options.prompt);

    stdin.on('data', function(key) {

      switch (key) {
        case '\u001B\u005B\u0041': // up
        case '\u001B\u005B\u0043': // right
        case '\u001B\u005B\u0042': // down
        case '\u001B\u005B\u0044': // left
          break;
        case '\u0003': // end of text
          process.exit();
          break;
        case '\u000d': // newline character
          // Execute Command
          if (override.current.trim().length === 0 && !options.allowEmpty) return;
          bot.repl.emit('enter', override.current);
          override.current = "";
          console.log("\b");
          stdout.write(options.prompt);
          break;
        case '\u007f': // delete
          stdout.write("\r\x1b[K");
          override.current = override.current.slice(0, -1);
          stdout.write(options.prompt + override.current);
          break;
        default:
          stdout.write(key);
          override.current += key;
          break;
      }
    });

  },
  log: function(...args) {
    let stdout = process.stdout;
    let {
      current,
      prompt
    } = this;
    let totalCurrentLength = current.length + prompt.length;
    let lines = Math.ceil(totalCurrentLength / stdout.columns);
    for (i = 0; i < lines; i++) {
      stdout.clearLine();
      stdout.write('\u001B\u005B\u0041');
    }
    stdout.write('\u001B\u005B\u0042');
    stdout.cursorTo(0)
    console.log(...args);
    stdout.write(prompt + current);
  }
}