/**
 * .eslintrc.js
 * ============
 *
 * Configuring Rules
 * - 'off' or 0 - turn the rule off
 * - 'warn' or 1 - turn the rule on as a warning (doesn’t affect exit code)
 * - 'error' or 2 - turn the rule on as an error (exit code is 1 when triggered)
 */

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:vue/strongly-recommended',
  ],
  globals: {
    FB: true, // Facebook
    google: true, // Google
    YT: true, // YouTube
  },
  parserOptions: {
    ecmaVersion: 2018,
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': 'off', // Vanilla JS
    'import/no-unresolved': 'off',
    'max-len': ['error', { code: 120, ignoreUrls: true, tabWidth: 2 }],
    'no-console': 'off',
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'acc', // for reduce accumulators
        'accumulator', // for reduce accumulators
        'e', // for e.returnvalue
        'state', // for Vuex
      ],
    }],
    'vue/component-tags-order': 'error',
  },
};
