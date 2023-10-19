module.exports = {
  extends: ["next", "turbo", "prettier"],
  settings: {
    next: {
      rootDir: ["packages/*/"],
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};
