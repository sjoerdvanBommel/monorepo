module.exports = {
  extends: ['next', 'turbo', 'prettier'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
}
