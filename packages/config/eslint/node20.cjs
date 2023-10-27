module.exports = {
  extends: ['turbo', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: false,
    node: true,
    es2023: true,
  },
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
  },
  plugins: ['@typescript-eslint'],
}
