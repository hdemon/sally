module.exports = {
  root: true,
  extends: ['prettier/@typescript-eslint', 'airbnb-typescript/base', ''],
  plugins: ['@typescript-eslint', 'prettier'],
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
    browser: true,
    commonjs: true,
    node: true,
    jquery: true,
    jest: true,
  },
  rules: {
    'prettier/prettier': 'error',
  },
  globals: {
    shallow: true,
    render: true,
    mount: true,
    LCS: true,
  },
}
