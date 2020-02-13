module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    node: true,
    mocha: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // 'prettier/@typescript-eslint',           // Best terug aanzetten zodra linting OK
    // 'plugin:prettier/recommended'
  ],
  rules: {
    // Allow snake_case for properties, enforce camelCase for variables
    "@typescript-eslint/camelcase": [2, {"properties": "never"}],
    "@typescript-eslint/no-unused-vars": [1, { "argsIgnorePattern": "^_" }]
  }
};
