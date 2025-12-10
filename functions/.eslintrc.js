/* eslint-env node */
/* eslint-disable no-undef */

module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    es2022: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  parserOptions: {
    ecmaVersion: 2022,
  },
  rules: {
    // You can tweak rules here if needed
  },
};