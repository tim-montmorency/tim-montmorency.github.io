const chalk = require('chalk');
const log = require('fancy-log');
const path = require('path');

class WatchRunPlugin {
  // eslint-disable-next-line class-methods-use-this
  apply(compiler) {
    compiler.hooks.watchRun.tap('WatchRunPlugin', (comp) => {
      const changedTimes = comp.watchFileSystem.watcher.mtimes;
      const changedFiles = Object.keys(changedTimes)
        .map((file) => path.relative(process.cwd(), file))
        .join(', ');
      if (changedFiles) log(`File '${chalk.blue(changedFiles)}' was changed`);
    });
  }
}

module.exports = WatchRunPlugin;
