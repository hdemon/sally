module.exports = {
  root: true,
  // The order of extends affects behaviour.
  extends: [
    'airbnb-typescript/base',
    'prettier/@typescript-eslint',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'prettier/prettier': 'error',
  },
}
