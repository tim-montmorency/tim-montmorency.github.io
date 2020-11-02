/**
 * .babelrc.js
 * ===========
 */

const presets = [
  [
    '@babel/preset-env',
    {
      debug: global.debug,
    },
  ],
];
const plugins = ['@babel/plugin-proposal-optional-chaining'];

module.exports = { presets, plugins };
