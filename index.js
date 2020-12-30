// eslint-disable-next-line import/no-extraneous-dependencies
require('regenerator-runtime/runtime');
// eslint-disable-next-line import/no-extraneous-dependencies
require('babel-register')({
  presets: ['env'],
});
// eslint-disable-next-line import/no-extraneous-dependencies
require('babel-core').transform('code', {
  plugins: ['transform-object-rest-spread'],
});

module.exports = require('./src/DiceRoller');
