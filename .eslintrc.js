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
  plugins: ['react', '@typescript-eslint', 'i18next', 'react-hooks', 'kenshimoral-fsd-path-checker'],
  rules: {
    'react/jsx-indent': [2, 2],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx', '.ts'] }],
    'import/no-unresolved': 0,
    'linebreak-style': ['error', 'windows'],
    'import/prefer-default-export': 0,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 1,
    'react/require-default-props': 0,
    'react/react-in-jsx-scope': 0,
    'react/button-has-type': 0,
    'react/function-component-definition': 0,
    'react/jsx-props-no-spreading': 0,
    'no-shadow': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'no-underscore-dangle': 0,
    'i18next/no-literal-string': [2, {
      markupOnly: true,
      ignoreAttribute: ['data-testid', 'target', 'direction', 'justify', 'gap', 'align', 'role', 'as', 'border', 'wrap', 'variant', 'size', 'color'],
    }],
    'max-len': [2, { ignoreComments: true, code: 150 }],
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-tabindex': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-param-reassign': 0,
    'no-undef': 'off',
    'react/no-array-index-key': 0,
    'kenshimoral-fsd-path-checker/path-checker': ['error', { alias: '@' }],
    'kenshimoral-fsd-path-checker/public-api-imports': ['error', { alias: '@' }],
    'kenshimoral-fsd-path-checker/layer-imports': ['error', { alias: '@', ignoreImportPatterns: ['**/StoreProvider'] }],
  },
  globals: {
    __IS_DEV__: true,
    __API__: true,
    __PROJECT__: true,
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
