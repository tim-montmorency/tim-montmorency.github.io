const chalk = require('chalk');
const gzipSize = require('gzip-size');
const log = require('fancy-log');
const prettyBytes = require('pretty-bytes');
const Table = require('cli-table');

class DonePlugin {
  // eslint-disable-next-line class-methods-use-this
  apply(compiler) {
    compiler.hooks.done.tap('DonePlugin', (stats) => {
      const table = new Table({ head: ['File', 'Original', 'Gzipped'], style: { head: ['cyan'] } });
      const time = (stats.endTime - stats.startTime) / 1000;
      const { assets } = stats.compilation;
      const { watchMode } = stats.compilation.compiler;

      Object.keys(assets).forEach((assetName) => {
        table.push([
          assetName,
          prettyBytes(assets[assetName].size()),
          prettyBytes(gzipSize.sync(assets[assetName].source())),
        ]);
      });

      console.log(table.toString());
      log(`Finished '${chalk.cyan('build')}' after ${chalk.magenta(`${time} s`)}`);
      if (watchMode) log(`Watching '${chalk.blue('scripts')}' and '${chalk.blue('styles')}' files...`);
    });
  }
}

module.exports = DonePlugin;
