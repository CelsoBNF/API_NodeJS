' use strict ';

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'linebreak-style': 0,
    'no-console': 0,
    'no-unused-vars': 0,
    'no-use-before-define': 0,
    'no-shadow': 0,
    'import/order': 0,
  },
};
