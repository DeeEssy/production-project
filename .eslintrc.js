module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:i18next/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'i18next'],
  rules: {
    'react/jsx-indent': [2, 2],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx', '.ts'] }],
    'import/no-unresolved': 0,
    'linebreak-style': [2, 'windows'],
    'import/prefer-default-export': 0,
    'no-unused-vars': 1,
    'react/require-default-props': 0,
    'react/react-in-jsx-scope': 0,
    'react/button-has-type': 0,
    'react/function-component-definition': 0,
    'react/jsx-props-no-spreading': 1,
    'no-shadow': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'no-underscore-dangle': 0,
    'i18next/no-literal-string': [2, { markupOnly: true, ignoreAttribute: ['data-testid'] }],
    'max-len': [2, { ignoreComments: true, code: 100 }],
  },
  globals: {
    __IS_DEV__: true,
  },
  overrides: [
    {
      files: ['**/src/**/*.test.{ts,tsx}'],
      rules: {
        'i18next/no-literal-string': 0,
      },
    },
  ],
};
