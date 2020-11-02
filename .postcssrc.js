/**
 * .postcssrc.js
 * =============
 */

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano')({
  preset: ['default', {
    discardComments: { removeAll: true },
  }],
});

if (global.debug) {
  console.log(autoprefixer().info());
}

module.exports = {
  plugins: [
    autoprefixer,
    cssnano,
  ],
};
