/* eslint-disable linebreak-style */
const { platform } = require('os');

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    node: true,
    jasmine: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
  },
  plugins: [
    'react',
  ],
  rules: {
    'linebreak-style': ['error', platform() === 'win32' ? 'windows' : 'unix'],
  },
};
